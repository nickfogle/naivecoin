const request = require('superagent');

function mine()
{
    mineWithParameters('4d9f711490af4580be23be122c62c0ae3ec2f838b087200bc2e0983c2248bd23')
}

function mineContinuouslyWithParameters(rewardAddress) {
    console.log('------ MINING ------')
    request.post('http://localhost.com:3001/miner/mine')
        .send({
            rewardAddress: rewardAddress
        })
        .then(() => {
            console.log('------ MINING SUCCESSFUL ------')
            mineWithParameters(rewardAddress)
        })
        .catch(e => {
            console.error(e);
            mineWithParameters(rewardAddress)
        });
}


var address = process.argv[2];
mineContinuouslyWithParameters(address);

module.exports = mine;