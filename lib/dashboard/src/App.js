import React, { Component } from 'react';
import * as request from 'superagent'
import './App.css';
import config from './config';

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
                <div className="csa-total">
                    <h2 className="App-intro">
                        Your CSA Total:
                    </h2>
                    <h3>{this.state.balance}</h3>
                </div>
                <div className="heartbeats">
                    <h2>Heartbeats</h2>
                    <p>5/21</p>
                    <p>Last heartbeat: Aug 31st 3:12:21pm</p>
                    <p>Next scheduled heartbeat: Aug 31st 3:42:21pm</p>
                    <p>Next estimated reward: Aug 31, 5:12:21pm</p>
                </div>
                <ul>
                    {this.state.heartbeats.map(b => {
                        return <li>{JSON.stringify(b)}</li>
                    })}
                </ul>
            </div>
        );
    }

    async componentDidMount() {
        await Promise.all([
            this.getBalance(),
            this.getHeartbeats()
        ]);
    }
    
    async getBalance() {
        let resp = await request.get(`http://localhost:3001/operator/wallets/${config.walletId}/addresses/${config.addressId}/balance`)
        this.setState({
            balance: resp.body.balance / 100000000
        });
    }

    async getHeartbeats() {
        let resp = await request.get(`http://localhost:3001/operator/wallets/${config.walletId}/addresses/${config.addressId}/heartbeat`)
        this.setState({
            heartbeats: resp.body
        });
    }
}


export default App;
