# Tips & Tricks: Docker, Rancher
## Featuring Admin & Management  Cloud-flavoured Tech

### Contents:

1. [Shortcut to retreive Docker/Rancher instance ID(s).](#retreive-container-instance-id)
1. Load Rancher Cluster Metadata



### Retreive Container Instance ID

As an executable file:

```bash
#!/bin/bash
docker ps -a | grep $1 | awk '{print $1}'
```

As a function - use in `.bash_aliases`

```bash
# Or as a function:
function docker_id () {
  docker ps -a | grep $1 | awk '{print $1}'
}
```

