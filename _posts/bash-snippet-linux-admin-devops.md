# Bash Snippets: System Setup

> For Linux Admins, DevOps, and misc IT folks


## Storage Scripts

### Partition & Attach NVMe Volume

> If you are like me, you just started your Amazon EC2 `i3.*large` server (or a Packet.net Type2 box) and can't remember `parted` params to save your life. Run scripts below.
You're welcome, future self.

#### Create ext4 NVMe Partition

```sh
# Try this first
mkfs.ext4 /dev/nvme0n1
# If it fails, try the following destructive cmds
parted --script -a optimal /dev/nvme0n1 mklabel gpt
parted --script -a optimal /dev/nvme0n1 mkpart primary ext4 0% 100%

mkdir -p /data
mount /dev/nvme0n1 /data
## Persist between reboots: for nvme0n1 device/volume
echo '/dev/nvme0n1 /data ext4 defaults,nofail,discard 0 0' | sudo tee -a /etc/fstab
```

### Persist md RAID between reboots
```sh
sudo mdadm --detail --scan | sudo tee -a /etc/mdadm/mdadm.conf
sudo update-initramfs -u
```




## HTTP/S & Reverse Proxy Scripts


### Free SSL/TLS Certificate
#### (DNS CNAME or A records required)

```sh
docker run -it --rm -p 443:443 -p 80:80 -e ENV_DOMAIN --name certbot -v /etc/letsencrypt:/etc/letsencrypt -v /var/lib/letsencrypt:/var/lib/letsencrypt quay.io/letsencrypt/letsencrypt:latest \
  certonly --standalone --noninteractive --expand --allow-subset-of-names --agree-tos \
  --rsa-key-size 2048 \
  --email postmaster@<EXAMPLE.COM> --domains <EXAMPLE.COM>,<BLOG.EXAMPLE.COM>
```




## Amazon Web Services CLI

### To Remove an S3 Bucket (Careful now)

```sh
# Add to your .bashrc / .bash_aliases
function rmS3 () {
  aws s3 rm --recursive --include "*" s3://$1
  aws s3 rb s3://$1
}
```
