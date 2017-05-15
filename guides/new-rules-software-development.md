
# TOC

1. Loops
1. Functions
1. Logic / Control Flow
1. Promises
1. Async/Await




### Loops

**RED FLAG:** Any `for`, `while` loops are a sign of non-async friendly code.
**SOLVED:** With [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reduce)


### Functions

**RED FLAG** More than 1 logical thing in a function.
Are 2+ things cobbled together? Probably in a hard-to-change entanglement?

Is this really a big problem? (tldr: not fatal, just terribly costly if your code lasts.)

Example:

```js
class LoginController {
  onSubmit() {
    // Prevent re-login if already logged in 
    if (this.user && this.user.id >= 1) {
      alert('Nuh uh, user! Logout first.');
      return;
    }
    // Now do ajax
    return fetch(`/api/login?username=${this.username}&password=${this.password}`)
      .then(res => res.json())
  }
}
class LoginController {
  onSubmit() {
    return this
      .failOnUser(this.user)
      .then(this.send)
  }  
  failOnUser(user) {
    if (user && user.id > 0) {
      return Promise.reject(new Error('User logged in. Log out and try again.'));
    }
    return Promise.resolve(user);
  }
  send(username, password) {
    return fetch(`/api/login?username=${this.username}&password=${this.password}`)
      .then(res => res.json())
  }
}

```



