import React from 'react';
import ChatLogin from './ChatLogin';
import ChatField from './ChatField';
import ChatInput from './ChatInput';
import ChatLogout from './ChatLogout';
import ChatUsers from './ChatUsers';

class ChatApp extends React.Component {

  constructor() {
    super();
    this.state = {
      isLogged: false,
      username: '',
      userCount: 0,
      messages: []
    }
  }

  componentDidMount() {
    socket.on('update', this._update.bind(this))
    socket.emit('update');
    socket.on('new message', this._newMessage.bind(this));
  }

  _update(data) {
    console.log('UserCount:', data);
    this.setState({ userCount: data });
  }

  _logIn(username) {
    this.setState({ isLogged: true, username: username });
    socket.emit('user:login', username);
  }

  _newMessage(data) {
      const scrollAnchor = document.getElementById('scroll-anchor');

      // Construct the date
      let thisDate = new Date(),
          h = thisDate.getHours(),
          min = thisDate.getMinutes(),
          sec = thisDate.getSeconds();

          if(h < 10) h = '0' + h;
          if(min < 10) min = '0' + min;
          if(sec < 10) sec = '0' + sec;

      // Append message if it's the same user
      if(this.state.messages.length > 0) {
        let prevMsgUser = this.state.messages[this.state.messages.length - 1].user;

        if(prevMsgUser === data.user) {
          let thisStateMsgs = this.state.messages;
          thisStateMsgs[thisStateMsgs.length - 1].body += ( '\n' + data.msg);
          this.setState({ comments: thisStateMsgs });
          scrollAnchor.scrollIntoView();
          return false;
        }
      }
      // If not, just add a new message
      let newMsg = {
        user: data.user,
        body: data.msg,
        date: `${h}:${min}:${sec}`
      };

      this.setState({ messages: this.state.messages.concat([newMsg]) });
      scrollAnchor.scrollIntoView();
  }

  _logOut() {
    document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    this.setState({ isLogged: false, username: '' });
  }

  render() {
    let chatField = this.state.isLogged ? (
      <div className="chat-wrapper">
        <ChatField msgs={this.state.messages} />
        <ChatInput user={this.state.username} />
        <ChatUsers userCount={this.state.userCount} />
        <ChatLogout logOut={this._logOut.bind(this)} />
      </div>
    ) : <ChatLogin logIn={ this._logIn.bind(this) }/>

    return chatField;
  }
}

export default ChatApp;
