#!/bin/bash

wallet_id=`cat device_data/wallet_id.dat`
wallet_pw=`cat device_data/wallet_pw.dat`
wallet_address=`cat device_data/wallet_address.dat`
if [ -z "$wallet_id" ] | [ -z "$wallet_pw" ] | [ -z "$wallet_address" ];
then
    echo "You must set up wallet_id.dat, wallet_pw.dat and wallet_address.dat in device_data/"
    exit 1
fi

rm -rfd logs
mkdir logs
rm -rfd data
git pull
npm install
node bin/naivecoin.js -a 0.0.0.0 --peers http://54.85.162.52:3001 >> logs/naivecoin.logs &


sleep 10
counter=0
while true
do
	echo "------ POLLING ------"
    echo "------ POLLING ------" >> logs/naivecoin.logs
    scripts/poll_data.sh >> logs/naivecoin.logs &

    if [[ $(( $counter % 3 )) == 0 ]];
        then
        echo "------ MINING ------"
        echo "------ MINING ------" >> logs/naivecoin.logs
        node scripts/mine.js $wallet_address >> logs/naivecoin.logs &
    fi

    if [[ $(( $counter % 10 )) == 0 ]];
        then
        echo "------ HEARTBEAT ------"
        echo "------ HEARTBEAT ------" >> logs/naivecoin.logs
        node scripts/heartbeat.js "$wallet_pw" $wallet_id $wallet_address >> logs/naivecoin.logs &
    fi

    sleep 10

    counter=$((counter+1))
done
