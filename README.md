# curator
playing with curator API

When in production change client.js url as indicated in comments.

Autostart
crontab -u <username> -e

@reboot /usr/bin/forever start -c /usr/local/bin/node /root/curator/server.js