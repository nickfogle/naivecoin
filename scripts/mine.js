const request = require('superagent');

function mine()
{
    mineContinuouslyWithParameters('4d9f711490af4580be23be122c62c0ae3ec2f838b087200bc2e0983c2248bd23')
}

function mineWithParameters(rewardAddress) {
    console.log('------ MINING ------')
    request.post('http://localhost.com:3001/miner/mine')
        .send({
            rewardAddress: rewardAddress
        })
        .then(() => {
            console.log('------ MINING SUCCESSFUL ------')
        })
        .catch(e => {
            console.error(e);
        });
}


function mineContinuouslyWithParameters(rewardAddress) {
    console.log('------ MINING ------')
    request.post('http://localhost.com:3001/miner/mine')
        .send({
            rewardAddress: rewardAddress
        })
        .then(() => {
            console.log('------ MINING SUCCESSFUL ------')
            return mineContinuouslyWithParameters(rewardAddress)
        })
        .catch(e => {
            console.error(e);
            return mineContinuouslyWithParameters(rewardAddress)
        });
}


var address = process.argv[2];
mineContinuouslyWithParameters(address);

module.exports = mine;