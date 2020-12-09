#!/bin/bash
docker stop faktatfrombaghdad

docker rm faktatfrombaghdad

docker build -t mxr/faktatfrombaghdad .

docker run -d --name faktatfrombaghdad --restart unless-stopped mxr/faktatfrombaghdad

docker ps

