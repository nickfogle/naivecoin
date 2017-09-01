#!/bin/bash

rm -rfd logs
mkdir logs
rm -rfd data
git pull
npm install
node bin/naivecoin.js -a 0.0.0.0 --peers http://54.85.162.52:3001 & #> logs/naivecoin.logs

sleep 10
counter=0
while true
do
	echo "polling"
    scripts/poll_data.sh

    if [[ $(( $counter % 2 )) == 0 ]];
        then
        echo "mining"
        node scripts/mine.js
    fi

    if [[ $(( $counter % 10 )) == 0 ]];
        then
        echo "heartbeat"
        node scripts/heartbeat.js
    fi

    sleep 5

    counter=$((counter+1))
done
