# EZO-web-v2
This repo includes `EZO-web-v2-api` and `EZO-web-v2-front` as submodules, adds additional docker images(only mysql for now) so we can spin up a fully running service locally with `docker-compose`.

__TL;DR:__ Jump to __Dev localy__ section

### Why git submodules?
Currently we deploy services by `git pull` of each package, having git repos separately preserves this workflow. We do want a central repo(like this one) to make life easier for dev and deployment in the future.

### How exactly submodule will work?
`EZO-web-v2` tracks commits of all submodules, so each working build of `EZO-web-v2` is a snapshot/combination of all submodules. This guarantees that only compatible changes of all modules together are taken in.

### Future deployment workflow?
TBD

### What DB service does it come with?
To simplify local dev work, it comes with a `mysql5.7` image and dump.sql for example data. It maps data directory to docker volume(see https://docs.docker.com/storage/volumes/) so data will be persisted even if containers are removed. You can remove volume as you wish so it populate default data again when start.

### Can I only use a subset of the serivces?
Yes. If you prefer to run only partial services(i.e use your local mysql), you can stop others and change the config to listen to ports from your local host(see https://docs.docker.com/desktop/mac/networking/). TODO: add script to make it easier.

## Dev localy
### How to start containers:
1. Clone repositories, run: `git clone --recurse-submodules git@github.com:suit-n-tie/EZO-web-v2.git`
2. Install docker: see https://docs.docker.com/get-docker/
3. Go to repo root directory(EZO-web-v2) and start docker images, run: `docker-compose  -f docker-compose.dev.yml up -V -d --build`
4. Open browser and check out at: http://localhost

### How to stop containers:
I suggest using docker desktop to stop containers and remove mapped volumes(optional).

### How to check servicestatus/logs:
Go to docker desktop's correspoding container and inspect.

### How to make changes:
Just make changes in dorresponding submodule repo: `EZO-web-v2/web-api` or `EZO-web-v2/web-front`, changes should be reflected immediately. If not, try restart containers.

### How to check DB data:
When start docker containers, it preload datas to DB volume if volume is new. Any changes made to DB will be persisted to volumes. You can also remove docker volumes in docker desktop, so next time it will create new volume.

## Testing:

TBD

To directly conneect to DB service, just run `mysql` command as normally you would, but use port `3307` here.


## Further reads:
 - Docker 101: https://docs.docker.com/get-started/

## TODOs

- TBD
