#!/bin/bash

rm -rfd logs
mkdir logs
rm -rfd data
git pull
npm install
node bin/naivecoin.js -a 0.0.0.0 --peers http://54.85.162.52:3001 &> logs/naivecoin.logs

watch -n 30 scripts/poll_data.sh
watch -n 1800 node scripts/heartbeat.js
watch -n 60 node scripts/mine.js