#!/bin/bash

rm -rfd logs
mkdir logs
rm -rfd data
git pull
npm install
node bin/naivecoin.js -a 0.0.0.0 --peers http://54.85.162.52:3001 > logs/naivecoin.logs &

sleep 10
counter=0
while true
do
	echo "------ POLLING ------"
    echo "------ POLLING ------" >> logs/naivecoin.logs
    scripts/poll_data.sh >> logs/naivecoin.logs &

    if [[ $(( $counter % 2 )) == 0 ]];
        then
        echo "------ MINING ------"
        echo "------ MINING ------" >> logs/naivecoin.logs
        node scripts/mine.js >> logs/naivecoin.logs &
    fi

    if [[ $(( $counter % 10 )) == 0 ]];
        then
        echo "------ HEARTBEAT ------"
        echo "------ HEARTBEAT ------" >> logs/naivecoin.logs
        node scripts/heartbeat.js >> logs/naivecoin.logs &
    fi

    sleep 5

    counter=$((counter+1))
done
