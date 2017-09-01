const request = require('superagent');

function heartbeat()
{
    heartbeatWithParameters('m m m m m', 
        '784e702b88f84523a621db4c4939127aeac0c8e80485c9a8cf4b433adb280edf', 
        '4d9f711490af4580be23be122c62c0ae3ec2f838b087200bc2e0983c2248bd23')
}

function heartbeatWithParameters(password, walletId, fromAddress) {
    request.post('http://localhost.com:3001/operator/wallets/' + walletId + '/heartbeat')
        .set('password', password)
        .send({
            fromAddress: fromAddress,
            data: { alive: 1 }  
        })
        .then(() => {
            console.log('Heartbeat successful');
        })
        .catch(e => {
            console.error(e);
        });
}

module.exports = heartbeat;