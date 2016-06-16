#Pp{Chat}


##Description
Small chat app using React, Socket.io, Express.
Still in development.

##Features
* LogIn with username
* Prevent bad names
* Cookie with your username
* Links in chat
* Appending messages
* LogOut
* Anti-spam
* Client-side timestamps
* Auto-scroll

##Known issues:
* User count is not set properly after refreshing
* Your username can be blank
* No handling of unique usernames
* Logout doesn't work immediately

##TODO:
* Server-side usernames handling
* Better anti-spam system
* Fix user count
* Server-side timestamps
* Better gulpfile (to handle server changes and hot-reload)
* Improve Auto-scroll
* Emoticons
* Private messages


###To begin:
```
npm install
gulp build
npm node server.js
```
