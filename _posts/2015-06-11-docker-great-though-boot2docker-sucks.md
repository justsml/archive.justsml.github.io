---
layout: post
title:  "Docker rocks. Boot2docker just sucks."
date:   2015-06-11 05:00:12
modified:   2015-06-15 10:00:01
categories: docker
tags: [docker, boot2docker, devops]
image:
  feature: abstract-10.jpg
  credit:
---

# Overview

## Updates November 2015
> Boot2Docker

#### To everyone on OSX or Windows: Don't let Boot2docker leave you with the impression that Docker sucks! It's really just your antique OS.

1. Docker is amazing, period.
1. However it's rough-around-the-edges, hackey utility, boot2docker - for OS X, Windows and old Linux Kernels - leaves a **lot** to be desired.

# Issues

> Boot2docker causes 99/100 headaches compared with using a native docker install locally.
> I should concede that it wraps several other complicated/flakey technologies:
> VirtualBox, x-platform Folder Sharing, and also the docker cli command runs in a network-client mode so,
> file copying, builds etc take a long time  vs. running a native docker server.
> =============
> Docker can currently only run natively on a Linux Kernel 3.4+ - and the current boot2docker vm actually runs v4.
> Bottom Line: Install the Latest Debian (w/ xfce or MATE) on your Mac/Windows box,
> ... c'mon those games aren't helping your code...

# Boot2docker Key Commands

## When you get error: 'FATA[0000]'

- Full error message:
	- FATA[0000] Get http:///var/run/docker.sock/v1.18/info: dial unix /var/run/docker.sock: no such file or directory. Are you trying to connect to a TLS-enabled daemon without TLS?
- Solution: You need some info from boot2docker
	- Run this to get the 3 needed shell environment variables:

~~~sh
boot2docker shellinit
# Copy & paste the exports into the current shell, & retry $(docker info)
~~~


## Get Docker Server IP Address
~~~sh
boot2docker ip
~~~
> Now your app on port 3000 is available at something like: http://$(boot2docker ip):3000/


# Boot2Docker Quick Start for OS X

1. In a terminal on your ```brew``` able Mac:

~~~sh
brew install boot2docker
boot2docker init
boot2docker up
~~~



