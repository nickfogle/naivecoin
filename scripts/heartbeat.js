const request = require('superagent');

function heartbeat() {
    request.post('http://localhost.com:3001/operator/wallets/784e702b88f84523a621db4c4939127aeac0c8e80485c9a8cf4b433adb280edf/heartbeat')
        .set('password', 'm m m m m')
        .send({
            fromAddress: '4d9f711490af4580be23be122c62c0ae3ec2f838b087200bc2e0983c2248bd23',
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