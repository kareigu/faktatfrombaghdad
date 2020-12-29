#!/bin/bash
docker stop faktatfrombaghdad

docker rm faktatfrombaghdad

docker build -t mxr/faktatfrombaghdad .

docker run -d --name faktatfrombaghdad --restart unless-stopped -v $PWD/sound:/usr/src/faktatfrombaghdad/sound  mxr/faktatfrombaghdad

docker ps

