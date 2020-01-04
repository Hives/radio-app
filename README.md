# Paul's radio app

[Front end](front-end) in React

[Back end](back-end) in Node/Express

Need to set up and configure a firewall on the RPi to allow the two apps to be
accessed over the network. I did it using
[`UncomplicatedFirewall`](https://help.ubuntu.com/community/UFW) which may not
be the most secure option. But it works like this:

```
# to install:
> sudo apt install ufw
# to activate:
> sudo ufw enable
# to check the status:
> sudo ufw status verbose
# to allow incoming tcp and udp packets on a port (do this for the ports used by
both apps):
> sudo ufw allow 1234
# this will block ssh connections, so do this to enable ssh on the default port
(22):
> sudo ufw allow ssh
# if you want to disable again:
> sudo ufw disable
```
