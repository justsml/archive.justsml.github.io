
### Update CLI Libs

Installs: `docker`, `docker-compose`, `rancher-compose`

> You'll need to setup the rancher-compose cli.
> Run script here: [@justsml/system-setup-tools/devops-tools.sh](https://raw.githubusercontent.com/justsml/system-setup-tools/master/modules/devops-tools.sh)


### Security

https://github.com/docker/docker-bench-security

https://nodesecurity.io/ (not docker - but important for node apps)


### Remove Old/Unused Images

```sh
docker system prune
# AND/OR
docker image prune

# OLD: 
docker rmi $(docker images -q -f dangling=true)

```

### Debugging Routing Issues

On the docker host, use something like this:

```sh
# Install tcpdump, if needed
[ "$(which tcpdump)" == "" ] && $(apt-get update && apt-get install tcpdump) || echo "[tcpdump found]"
# Streams output to console & a file in $HOME - it may get enormous, limit run time or add to query specificity!
tcpdump -i docker0 'tcp port 80 or 443 or 3001 or 3000 or 8888' | tee $HOME/http_$(date +%F).pcap
```

### Lookup Docker/Rancher Container IDs

```sh
# add to your .bash_aliases file:

function docker_id() {
  docker ps -a | grep $1 | awk '{print $1}'
}
```
