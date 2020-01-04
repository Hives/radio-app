# Paul's radio app

[Front end](front-end) in React

[Back end](back-end) in Node/Express

## Raspberry Pi firewall setup

Need to set up and configure a firewall on the RPi to allow the two apps to be
accessed over the network. I did it using [Uncomplicated
Firewall](https://help.ubuntu.com/community/UFW) which may not be the most
secure option. But it works like this:

To install:

```bash
sudo apt install ufw
```

To activate:

```bash
sudo ufw enable
```

To check the status:

```bash
sudo ufw status verbose
```

To allow incoming tcp and udp packets on a port (do this for the ports used by
both apps):

```bash
sudo ufw allow 1234
```

This will block ssh connections, so do this to enable ssh on the default port
(22):

```bash
sudo ufw allow ssh
```

If you want to disable again:

```bash
sudo ufw disable
```
