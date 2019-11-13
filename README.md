# vbulletin-discord-bot
A simple nodejs Discord bot to query your vbulletin rss feed for a new forum post. It simply checks every 5 seconds for the latests new reply on a topic via the rss feed. You vbulleting rss feed cache should be set to your desired value but an hour is way to long for this bot, try to set it to a minute.

# Installation

## Clone this repository
``` git clone git@github.com:Appelpitje/vbulletin-discord-bot.git```

## Install packages
```run npm install```

## Configure variables/configs
In config.ini edit your bot token.

In index.js edit **channel-id** and the **rss-url**, the url should look like this: domain.com/external.php?type=rss2&lastpost=1

## Start the server
```npm start```
