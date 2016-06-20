import React from 'react';

class ChatInput extends React.Component {
  constructor() {
    super();
    this.state = {
      canSend: true
    }
  }

  componentDidMount() {
    const DELAY = 300;
    this.antiFlood = setInterval(() => this.setState({ canSend: true }), DELAY);
  }

  componentWillUnmount() {
    clearInterval(this.antiFlood);
  }

  _preventLong() {
    const MAX_CHARS = 150;

    let msg = this._msg.value,
        msgLength = msg.length

    if(msgLength > MAX_CHARS) {
      alert('Your message is too long, please do not spam');
      this._msg.value = msg.slice(0, MAX_CHARS);
      return false;
    } else {
      return true;
    }
  }

  render() {
    return(
      <form className="msg-form" onSubmit={this._handleSubmit.bind(this)}>
        <input className="msg-btn" type="submit" value="Send" />
        <input className="msg-input" onPaste={ this._preventLong.bind(this) } onKeyUp={ this._preventLong.bind(this) } placeholder="Enter your message..." ref={(input) => this._msg = input} />
      </form>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();
    // AntiFlood
    if(!this.state.canSend) { alert('Not so quickly, boy!'); return false;}
    this._preventLong();
    let msg = this._msg.value,
        user = this.props.user;

    // Reset chat input
    this._msg.value = '';

    if(msg !== '') {
      this.setState({ canSend: false });
      socket.emit('new message', { msg, user });
    }
  }
}

export default ChatInput;
