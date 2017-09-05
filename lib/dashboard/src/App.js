import React, { Component } from 'react';
import * as request from 'superagent'
import './App.css';
// import config from './config';

class App extends Component {
    constructor() {
        super();
        this.state = {
            balance: 0,
            heartbeats: []
        };
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>Casa</h1>
                </div>

                <form onSubmit={this.submitForm.bind(this)}>
                    <h3>Check your balance By entering your wallet address below</h3>
                    <input type="text" placeholder="Address Id" value={this.state.address} onChange={e => { this.setState({ address: e.target.value })}} />
                    <button>Submit</button>
                </form>

                <div className="csa-total">
                    <h2 className="App-intro">
                        Your Casa Balance: 
                          {"\t" + this.state.balance}
                    </h2>

                </div>
                <div className="heartbeats">
                    <h2>Heartbeats:</h2>
                </div>
                <p>
                    {this.state.heartbeats.map(b => {
                        return <li>{JSON.stringify(b)}</li>
                    })}
                </p>
            </div>
        );
    }

    async submitForm(e) {
        e.preventDefault();
        await Promise.all([
            this.getBalance(),
            this.getHeartbeats()
        ]);
    }
    
    async getBalance() {
        let resp = await request.get(`http://localhost:3001/operator/wallets/111/addresses/${this.state.address}/balance`)
        this.setState({
            balance: resp.body.balance / 100000000
        });
    }

    async getHeartbeats() {
        let resp = await request.get(`http://localhost:3001/blockchain/${this.state.address}/heartbeat`)
        this.setState({
            heartbeats: resp.body
        });
    }
}


export default App;
