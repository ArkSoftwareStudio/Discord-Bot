# Discord-Bot

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/ArkSoftwareStudio/Discord-Bot)

A multifunctional Discord bot, made to be expanded.

# Config.JSON
This bot uses a json file named Config.json. For obvious reasons it is not included in the git since it contains the bot tokens and other APIs tokens.
| Property | Description |
| ------ | ------ |
| token | Token provided by Discord for  your Application |
| clientId | Equally provided by Discord, this client ID can be found on your application under the developer portal |
| guildID | The server you want to use to develop the Bot, "Copy ID" |
| aniApi | A secret Token provided by AniAPI once you log in (JWT) |

# Getting Started
- Make sure to have Node.JS V 16+ Installed + NPM
- Clone the git repository and create a config.json with the properties mentioned above.

run:
```sh
npm install
```

This will install all dependencies. Finally to run the bot you can type on the terminal any of the following:

```sh
node .
npm start
```