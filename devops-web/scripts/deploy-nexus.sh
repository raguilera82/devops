#!/bin/bash

# $1 --> version
# $2 --> NPM_USER
# $3 --> NPM_PASS
# $4 --> NPM_URL
# $5 --> DR_USER
# $6 --> DR_PASS
# $7 --> DR_URL
# $8 --> $CI_PROJECT_PATH
# $9 --> $CI_PROJECT_PATH_SLUG

if [ -d "doc" ]; then
    mv doc dist/
fi

zip -r $9-$1.zip dist/

curl -v --user $2:$3 --upload-file $9-$1.zip http://$4/repository/raw-internal/$8-$1.zip

rm $9-$1.zip

docker login -u $5 -p $6 $7 
docker build -t $7/$8:$1 .
docker tag $7/$8:$1 $7/$8:$1
docker push $7/$8:$1