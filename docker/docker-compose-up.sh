#! /bin/bash

sh docker-build.sh
docker-compose -f docker-compose.yml up -d
