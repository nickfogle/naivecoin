const request = require('superagent');

function mine()
{
    mineWithParameters('4d9f711490af4580be23be122c62c0ae3ec2f838b087200bc2e0983c2248bd23')
}

function mineWithParameters(rewardAddress) {
    request.post('http://localhost.com:3001/miner/mine')
        .send({
            rewardAddress: rewardAddress
        })
        .then(() => {
            console.log('Mining successful');
        })
        .catch(e => {
            console.error(e);
        });
}

module.exports = mine;