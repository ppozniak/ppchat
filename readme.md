# Pp{Chat}


## Description
Small chat app using React, Socket.io, Express.
Still in development.

### Features
* LogIn with username
* Prevent bad names
* Cookie with your username
* Links in chat ([react-linkify](https://www.npmjs.com/package/react-linkify))
* Appending messages
* LogOut
* Anti-spam
* Client-side timestamps
* Auto-scroll

## Known issues:
* User count is not set properly after refreshing or joining in
* No handling of unique usernames
* ~~Your username can be blank~~
* ~~Logout doesn't work immediately~~

## TODO:
* Server-side usernames handling
* Better anti-spam system
* Server-side timestamps
* Better gulpfile (to handle server changes and hot-reload)
* Improve Auto-scroll
* Emoticons
* Private messages
* Some database
* Get BAD WORDS from external file
* 'instant message' for writer


### To begin:
```
npm install
gulp build
npm node server.js
```
