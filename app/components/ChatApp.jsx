import React from 'react';

import Field from './Field';
import Input from './Input';
import RHS from './RHS';

class ChatApp extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      users: [],
      messages: []
    }
    this._newMessage = this._newMessage.bind(this);
    this._checkAuth = this._checkAuth.bind(this);
  }

  componentDidMount() {
    socket.on('MSG', this._newMessage);
    socket.on('AUTH', this._checkAuth);
    socket.emit('AUTH');
  }

  componentWillUnmount() {
    socket.removeAllListeners('MSG');
    socket.removeAllListeners('AUTH');
  }

  render() {
    return(
      <div className="chat-wrapper">
        <Field clientUsername={ this.state.username } msgs={ this.state.messages } />
        <RHS clientUsername={ this.state.username } users={ this.state.users } />
        <Input />
      </div>
    );
  }

  _checkAuth(response) {
    if(!response.auth) {
      this.props.history.push('/');
    } else {
      this.setState({
        username: response.username,
        users: response.users
      });
    }
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
          thisStateMsgs[thisStateMsgs.length - 1].body.push(data.msg);
          this.setState({ comments: thisStateMsgs });
          scrollAnchor.scrollIntoView();
          return false;
        }
      }

      // If not, just add a new message
      let newMsg = {
        user: data.user,
        body: [data.msg],
        date: `${h}:${min}:${sec}`
      };

      this.setState({ messages: this.state.messages.concat([newMsg]) });
      scrollAnchor.scrollIntoView();
  }
}

ChatApp.contextTypes = {
  router: React.PropTypes.object
}

export default ChatApp;
