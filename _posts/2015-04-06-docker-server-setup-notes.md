---
layout: post
title:  "Docker server Setup"
date:   2015-04-06 01:00:59
categories: devops
tags: [devops, docker, server, setup, shell script]
---

Docker **Host Server** Setup, w/ Basic Monitoring Tools
=========

~~~sh
# Updates
apt-get update && apt-get install -y vim-nox git-core ufw curl atop htop build-essential libssl-dev linux-image-amd64 linux-headers-amd64

# Host OS Tuning
sysctl -w vm.max_map_count=262144

# Updates Profile init scripts
cd ~/
mkdir ~/backups
cp ~/.bash* ~/backups/

curl -sSL https://gist.githubusercontent.com/justsml/882f6c7cee46aa71625f/raw/a4f0d1ed006080d5fe7f40b6e07b8eb9d6838a5f/.bashrc > .bashrc
curl -sSL https://gist.githubusercontent.com/justsml/b667f158731fd054cd38/raw/5778dbb5d3d138ccf99ae1bf973457ce89661362/.bash_aliases > .bash_aliases
# Read into current shell (login steps already missed the aliases file)
source ~/.bashrc

# Install Docker
curl -sSL https://get.docker.com/ | sh

# Create Shared Folder On HOST for the Docker DB Instances
mkdir -p /mongodb/db
mkdir -p /elastic
~~~


> Only for SELinux Enabled Systems

~~~sh
# SELinux fixes (optional)
# chcon -Rt svirt_sandbox_file_t /mongodb
# chcon -Rt svirt_sandbox_file_t /elastic
~~~



Setup Database Services
-----------------------


#### MongoDB v3 Server

~~~sh
mkdir -p /mongodb/db
docker run --name mongo -p 27017:27017 -v /mongodb:/data -d mongo:latest bash -c 'mongod --logpath /data/mongodb.log --logappend --dbpath /data/db --storageEngine=wiredTiger'
~~~

#### Elastic Search

~~~sh
mkdir -p /elastic
docker run --name elastic -d -p 9200:9200 -p 9300:9300 -v /elastic:/data elasticsearch bash -c 'elasticsearch -Xmx 8g -Xms 2g --cluster.name elastic_cluster --node.name elastic01 --path.data /data/elastic-data --path.logs /data/elastic-logs '
~~~


# Package up your NodeJS/Ruby/Python/Etc App
--------------------------------------------

1. Add a blank file named `Dockerfile` in your project root.
1. _(Optional)_ Add a `.dockerignore` using .gitignore rules to exclude large non-essential paths. By default all project files are included.

#### `Dockerfile`

~~~dockerfile
# Example for NodeJS
FROM node:0.12
EXPOSE [3000]
COPY . /app/
WORKDIR /app
RUN apt-get update \
	&& apt-get dist-upgrade -y
RUN ["npm", "install"]
# Overridable Command
CMD ["npm", "start"]
~~~

It's easier to show how to start using the dockerfile and inspect the result via console.

In terminal, `cd` to your project folder and run the following `docker build` command _**everytime**_ you make a change or want to include OS upgrades)

#### Build Docker Image Every Deploy/Change
~~~sh
docker build -t app-name-here .
~~~

#### Create/Run Web App w/ Links to DB Servers

~~~sh
docker run -d --name webapp01 -p 3000:3000 --link mongo:mongo --link elastic:elastic app-name-here
~~~

#### OR - Run Interactively (in terminal)

~~~sh
docker run -it --name webapp01 -p 3000:3000 --link mongo:mongo --link elastic:elastic app-name-here
~~~


#### IMPORTANT: To delete webapp01
~~~sh
docker rm -f webapp01
# rerun `docker run...` from ^^^
~~~

#### To Re-Create the DB 'Container' Instances

> Note: Data is mounted to host server at /mongodb

~~~sh
docker rm -f mongo elastic
# OR
docker rm -f elastic
docker rm -f mongo
~~~

