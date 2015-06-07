---
layout: post
title:  "Development: Docker === Love"
date:   2015-02-26 11:07:59
categories: development
tags: [development, design, resource, ideas, patterns]
---

# Docker Can Do Everything!*

Improve your process for:

1. Testing Dev Tools & Servers WITH VIRTUALLY ZERO risk of messing up dependencies on your PC
1. Testing your software
1. Makes you write more idempotent, modular code... (I'll write how to actually realize this in a follow up)

There may seem like a huge volume of new stuff to learn, **don't let that stop you** from getting started.

#### Notes

* If you see a `docker run` command with either options `-d` or `-it`:
	* `-it` or `-i -t` will run the configured command interactively
	* `-d` will start the docker container as a 'daemon' aka background service.

-------


### EXAMPLES

#### nginx


~~~bash

	# Note: using host-based, shared folders
	#(shared folders are not possible with the VOLUME Dockerfile cmd)
	sudo docker run --name web01 -d -p 8181:80 \
		-v ${SITES_ENABLED_DIR}:/etc/nginx/sites-enabled \
		-v ${CERTS_DIR}:/etc/nginx/certs \
		-v ${LOG_DIR}:/var/log/nginx \
		-v ${HTML_DIR}:/var/www/html \
		dockerfile/nginx:latest

	# Local data, isolated within instance
	sudo docker run --name web01 -d -p 8181:80 dockerfile/nginx:latest

	# nodejs
	sudo docker run --name nodejs01 -d -p 3300:3300 -p 4433:4433 dockerfile/nodejs:latest

~~~





> Credits: [https://dockerfile.github.io/#/nginx](https://dockerfile.github.io/#/nginx)
Docker will make your life easier throughout the *entire* SDLC.



 > * Pretty close

