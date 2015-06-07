---
layout: post
title:  "Docker Firewall Setup"
date:   2015-06-06 22:22:22
categories: docker
tags: [docker,firewall,iptables, ultimate firewall, ufw]
---

# Setup Docker Host Firewall

1. Debian/Ubuntu Server is assumed
1. Designed to run on Docker Host Server



### Install Requirements

~~~sh

# Ultimate Firewall Needed
apt-get update && apt-get install -y ufw nmap curl

~~~



### Get your Internal & External IP Addresses

~~~sh

# Get your IP Addresses, simple output:
hostname --all-ip-addresses

# OR use ip tool, example:
ip addr

~~~


### UFW Config & Command Examples

~~~sh

export EXTERNAL_IP=123.123.123.123
export DOCKER_IP=172.17.42.1

# Allow and log all new ssh connections,
ufw allow log proto tcp from any to any port 22
ufw limit tcp/22 # Rate limit - basic SSH brute force mitigation

# Forward tcp 8080 traffic to  Dockerized App
ufw allow proto tcp from $EXTERNAL_IP port 8080 to $DOCKER_IP port 3000

~~~


### Enable / Start Firewall

> Be Careful, Don't Lock out your SSH port (defaults to 22)

~~~sh
ufw enable
ufw reset
~~~

-----------------


### Test Firewall

> Important: USE A REMOTE IP ADDR/LOCATION

~~~sh
# Verify dependency
apt-get update && apt-get install -y nmap

# Set scan target
export TARGET_HOST=123.123.123.123

# Example Scan Commands:
# Fast open port check
nmap -p 1-10240,27017 -T5 $TARGET_HOST
# Thorough scan
nmap -p 1-10240,27017 --open -v -APN $TARGET_HOST
# Svc Inspection
nmap -p 1-10240,27017 -O --osscan-guess $TARGET_HOST
~~~

# DONE! Now you should see ONLY the ports you configured!

