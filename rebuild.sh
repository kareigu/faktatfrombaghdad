#!/bin/bash
docker stop faktatfrombaghdad

docker rm faktatfrombaghdad

dckdir=/usr/src/faktatfrombaghdad

docker build -t mxr/faktatfrombaghdad .

docker run -d --name faktatfrombaghdad --restart unless-stopped -v $PWD/volume:$dckdir/volume mxr/faktatfrombaghdad

docker ps

