---
layout: post
title:  "Security Notes: RegEx"
date:   2015-02-24 05:42:21
categories: security
tags: [security]
image:
  feature: abstract-2.jpg
  credit:
---

# Denial-of-Service Regex Vulnerability

One of the most common, and yet hard-to-spot vulnerabilities I encounter relate to regular expressions.
Either poorly written or poorly implemented.

## Warning Signs

1. You have multiple capture groups
2. Global matching
3. Expression is used with un-checked user input

## Mitigation / Resolution

1. RegEx is hard
    1.  For example, here is how the really smart folks at [OWASP recommend handling IP validation][owasp]: ```^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$```
    2.  That's longer than a tweet, for a 4-byte IP Address!!!
2. Make sure user input isn't unduly long, when I know input data is reliably less than 40 chars, I'll make sure I prevent anything over 64 - otherwise, an attacker could overwhelm my system with a flood of 4Kb requests.
3. This affects almost every language and platform .NET/Node/Python/PERL/Java


## Reference

[Regular Expression DoS and Node.js](https://blog.liftsecurity.io/2014/11/03/regular-expression-dos-and-node.js?utm_source=nodeweekly&utm_medium=email)

[owasp]: https://www.owasp.org/index.php/OWASP_Validation_Regex_Repository

