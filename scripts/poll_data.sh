#!/bin/bash

curl -sS -X GET --header 'Accept: application/json' 'http://0.0.0.0:3001/node/peers/refresh' >> logs/naivecoin.logs
