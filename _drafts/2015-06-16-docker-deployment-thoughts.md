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

# Docker Images - Storage & Updating

Store on S3?
	- Pros?
		1. AWS/S3
		2. Tool:	https://github.com/dogestry/dogestry
	- Cons: Tool, HTTPS,
Store on SSH Image Server
	- Pro:
		1. Standard, ubiquitous CLI tools, ssh or scp
		2. Any Existing CA/KI (Key Infrastructure) could be used



# Setup Database Servers

## MongoDB
```
docker run --hostname mongo2 -d --name mongo2 -p 47017:27017 -v /mongodb2:/data mongo:latest bash -c 'mongod --logpath /data/logs/mongodb.log --logappend --dbpath /data/collections --storageEngine=wiredTiger --replSet "rs0"'


