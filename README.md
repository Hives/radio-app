# Paul's radio app

[Front end](front-end) in React

[Back end](back-end) in Node/Express

## Automatic startup

This is a somewhat idiosyncratic way to do this, but there's a script which
creates a [tmux](https://github.com/tmux/tmux/wiki) session and starts up the
front and back ends in separate windows. Run it like this:

```
$ /path/to/radio-app/startup-radio-tmux.sh
```

(You'll need to have installed both and built the front end first, obvs.)

You can run the script on startup by editing your crontab with `crontab -e`
(root privileges not required), and adding this line:

```
@reboot /path/to/radio-app/startup-radio-tmux.sh
```

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
