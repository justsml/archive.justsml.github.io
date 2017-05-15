# Bash Toolbelt

> Note: Work in progress.

### Misc Helpers


```sh
function requireField () {
  if [ $(printf "$1" | wc --bytes) -lt 1 ]; then
    printf >&2 "${red}${2}\n\n\n${reset}"
  fi
}

# Usage: 
requireField     $PASSWORD   "ERROR: PASSWORD is required environment var."
# 2 Parameter:   ^Variable^   ^Err Message^
```

![image](https://cloud.githubusercontent.com/assets/397632/24480679/e51db4bc-14a2-11e7-9aad-3b02eb813df5.png)

