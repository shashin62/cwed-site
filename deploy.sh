#!/bin/bash

DATE=$(date)
REV=$(git rev-parse HEAD)
MESSAGE="Deployed on $DATE by $USER at commit $REV"

echo "BUILDING"
grunt build
echo "UPDATING SERVERS TO PRODUCTION"
echo "SYNCING"
rsync -zr dist/ ubuntu@52.36.190.27:~/web/
echo $MESSAGE | ssh ubuntu@52.36.190.27 'cat >> deploy.log'

