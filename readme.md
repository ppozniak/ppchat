# Pp{Chat}
Chat app using React, React-router, Socket.io, Express and Redux.
Made only for training purposes.
Still in development.

Redux at the moment serves no purpose, but will get to that in a while.

## Features
* New design
* Login with username
* Links in chat ([react-linkify](https://www.npmjs.com/package/react-linkify))
* Appending messages
* Anti-spam
* Client-side timestamps
* Auto-scroll
* Some random names as default
* Users list

## Known issues:
* No integration with localStorage/cookies/session (You'll have to log in every time)
* Logout not implemented
* Users list won't update
* RHS for mobile not yet implemented
* Autoscroll works even when you scroll up 😡

## TODO:
* Better anti-spam system (Server-side too)
* Server-side timestamps
* Avatars
* Improve Auto-scroll
* Emoticons
* Private messages
* Rooms
* Some database
* Get BAD WORDS from external file
* 'instant message' for writer


_Node version: 6.2.1_
### To begin:
```
npm install
gulp build
npm start  // Starts both gulp and node server.js
```

Gulp tasks
```
gulp // Defaults to gulp watch
gulp build
gulp sass
gulp build
gulp watch
gulp files
gulp clean
```
