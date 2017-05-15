# Bash Snippets: Network Diagnostics

```sh
# Install tcpdump, if needed
[ "$(which tcpdump)" == "" ] && $(apt-get update && apt-get install tcpdump) || echo "[tcpdump found]"

# Streams output to console & a file in $HOME - it may get enormous, limit run time or add to query specificity!
tcpdump -A -s0 -nn -i docker0 'tcp port 80 or 443 or 3001 or 3000 or 8888' | tee $HOME/http_$(date +%F).pcap
# Or watch dns requests too w/ extra details:
tcpdump -Anni docker0 'udp port 53 or tcp port 53 or 80 or 443 or 3001 or 3000 or 8888' | tee $HOME/http_$(date +%F).pcap
```


