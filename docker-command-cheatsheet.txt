************************************************************************
*** This document contains the URLs and commands used in this course ***
************************************************************************

*** 01_02 ***
https://www.docker.com/products/docker-desktop/

https://code.visualstudio.com/download

*** 01_03 ***
https://github.com/LinkedInLearning/docker-your-first-project-4485003

https://git-scm.com/downloads

cd c:\projects\docker-your-first-project-4485003

git clone https://github.com/LinkedInLearning/docker-your-first-project-4485003.git

git checkout CHAPTER#_MOVIE#

git branch

*** 02_01 ***
Code for this video is in the dockerfile

*** 02_02 ***
docker build [OPTIONS] PATH | URL | -

https://docs.docker.com/engine/reference/commandline/build/

docker build .

docker build -f [dockerfile] .

docker build --force-rm=true .

docker build --rm=true .

docker build --no-cache .

docker build --help

*** 03_01 ***
docker search python

docker search --filter is-official=true python

docker search --filter stars=100 python

docker search --filter is-automated=true python

docker search --filter is-official=true --filter stars=10 --filter is-automated=false python

docker search --limit 4 python

docker search --no-trunc python

docker search --format "{{.Name}}: {{.Description}}" --no-trunc python

docker search --format "table {{.Name}}\t{{.IsAutomated}}\t{{.IsOfficial}}\t{{.Description}}\t{{.StarCount}}" python

docker search --format "table {{.Name}}\t{{.IsOfficial}}\t{{.Description}}\t{{.StarCount}}" --filter is-official=true --filter stars=10 --no-trunc python

docker search --help

docker image pull python

https://hub.docker.com/_/python

docker image pull python:3.12-rc-bookworm

docker image pull --help

*** 03_02 ***
docker image ls [OPTIONS] [REPOSITORY[:TAG]]

docker image ls --all

docker image ls --no-trunc

docker image ls --quiet

docker image ls --digests

docker image ls --filter reference=python*

docker image ls --filter before=python

docker image ls --filter since=python

docker image ls --filter dangling=true

docker image ls --filter label=python*

docker image ls --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedSince}}\t{{.CreatedAt}}\t{{.Digest}}"

docker image ls --help

https://docs.docker.com/engine/reference/commandline/image_ls/

*** 03_03 ***
docker build -t SOURCE_IMAGE[:TAG] .

docker build -t big-star-collectibles .

docker build --no-cache -t big-star-collectibles:v1 -t big-star-collectibles .

docker image ls

docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]

docker tag big-star-collectibles:v1 big-star-collectibles:v1-python

docker build --no-cache -t big-star-collectibles:v2 .

docker tag SOURCE_IMAGE_ID TARGET_IMAGE[:TAG]

LABEL <key>=<value> <key>=<value> <key>=<value> ...

docker image ls --filter label="com.example.vendor"="Big Star Collectibles"

*** 03_04 ***
https://hub.docker.com/

docker login

docker tag big-star-collectibles:v2 sbenhoff/big-star-collectibles-repo:big-star-collectibles

docker push sbenhoff/big-star-collectibles-repo:big-star-collectibles

docker pull sbenhoff/big-star-collectibles-repo:big-star-collectibles

*** 03_05 ***
docker image ls

docker image inspect IMAGE_ID

docker image inspect --format='{{json .Config.Labels}}' big-star-collectibles:v2

*** 03_06 ***
docker image ls

docker rmi [OPTIONS] IMAGE [IMAGE...]

docker rmi -f big-star-collectibles:v2

docker rmi -f IMAGE_ID

docker images --digests

docker rmi -f sbenhoff/big-star-collectibles@[DIGEST]

*** 04_01 ***
https://docs.docker.com/engine/reference/commandline/run/

docker start [OPTIONS] CONTAINER [CONTAINER...]

docker start big-star-collectibles:v2

docker run [OPTIONS] IMAGE[:TAG] [COMMAND] [ARG...]

docker run -it -d -p 5000:5000 -v ${PWD}:/app/code big-star-collectibles

http://localhost:5000

docker stop [OPTIONS] CONTAINER [CONTAINER...]

docker stop big-star-collectibles:v2

docker kill [OPTIONS] CONTAINER [CONTAINER...]

docker kill big-star-collectibles:v2

*** 04_02 ***
https://docs.docker.com/engine/reference/commandline/ps/

docker ps [OPTIONS]

docker ps

docker ps -a

docker ps -n 1

docker ps -q

docker ps -s

docker ps -l

docker ps --no-trunc

docker ps --filter label="com.example.vendor"="Big Star Collectibles"

docker ps -a --filter 'exited=0'

docker ps --filter ancestor=big-star-collectibles

docker ps --filter label="com.example.vendor"="Big Star Collectibles" --format json

docker ps --filter label="com.example.vendor"="Big Star Collectibles" --format "table {{.ID}}\t{{.Names}}"

* COMMON DOCKER CONTAINER EXIT CODES *
Exit Code 0	    Purposely stopped
Exit Code 1	    Application error
Exit Code 125	Container failed to run error
Exit Code 126	Command invoke error
Exit Code 127	File or directory not found
Exit Code 128	Invalid argument used on exit
Exit Code 134	Abnormal termination (SIGABRT)
Exit Code 137	Immediate termination (SIGKILL)
Exit Code 139	Segmentation fault (SIGSEGV)
Exit Code 143	Graceful termination (SIGTERM)
Exit Code 255	Exit Status Out Of Range

*** 04_03 ***
https://docs.docker.com/engine/reference/commandline/inspect/

docker inspect [OPTIONS] NAME|ID [NAME|ID...]

docker ps

docker inspect [ID]

docker inspect --format='{{.Config.Image}}' [NAME|ID]

docker inspect --format='{{.Id}}' [NAME|ID]

docker inspect --format='{{.LogPath}}' [NAME|ID]

docker inspect --format='{{json .Config}}' [NAME|ID]

*** 04_04 ***
https://docs.docker.com/engine/reference/commandline/logs/

docker logs [OPTIONS] CONTAINER

docker logs --tail 1000 -f [NAME|ID]

docker logs --tail 1000 -f --details [NAME|ID]

* UTC Format
docker logs --tail 1000 -f --since 2023-12-01T01:00:00Z [NAME|ID]

docker logs --tail 1000 -f --until 2023-12-01T01:00:00Z [NAME|ID]

* Relative Format
docker logs --tail 1000 -f --since 60 [NAME|ID]

docker logs --tail 1000 -f --until 60 [NAME|ID]

docker logs --tail 1000 -f --timestamps [NAME|ID]

*** 04_05 ***
docker volume create big-star-collectibles-vol

docker volume ls

docker volume inspect big-star-collectibles-vol

docker run -it -d -p 5000:5000 -v big-star-collectibles-vol:/app/data sbenhoff/big-star-collectibles-repo:big-star-collectibles

docker volume rm big-star-collectibles-vol

docker run -it -d -p 5000:5000 -v "$(PWD)/test"/target:/app/test sbenhoff/big-star-collectibles-repo:big-star-collectibles

docker run -it -d -p 5000:5000 --mount type=bind,source="$(PWD)/test",target=/app/test sbenhoff/big-star-collectibles-repo:big-star-collectibles

*** 04_06 ***
docker image prune

docker image prune -a -f

docker image prune -a -f --filter label="com.example.vendor"="Big Star Collectibles"

docker container prune

docker volume prune -f --filter label="com.example.vendor"="Big Star Collectibles"

docker system prune --volumes -f