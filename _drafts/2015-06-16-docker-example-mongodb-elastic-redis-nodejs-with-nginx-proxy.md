---
layout: post
title:  "Docker Cluster Walkthrough"
date:   2015-06-16
modified:   2015-06-17
categories: docker
tags: [docker, boot2docker, docker cli]
image:
  feature: abstract-12.jpg
  credit:
---

# Overview


# Setup Database Servers

## MongoDB
```
docker run --hostname mongo2 -d --name mongo2 -p 47017:27017 -v /mongodb2:/data mongo:latest bash -c 'mongod --logpath /data/logs/mongodb.log --logappend --dbpath /data/collections --storageEngine=wiredTiger --replSet "rs0"'


cd /etc/ssl/
openssl req -newkey rsa:4096 -new -x509 -days 1095 -nodes -out / mongodb-cert.crt -keyout mongodb-cert.key

openssl req -newkey rsa:4096 -new -x509 -days 1095 -nodes -out /mongodb-cert.crt -keyout mongodb-cert.key


