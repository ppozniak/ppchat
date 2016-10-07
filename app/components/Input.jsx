import React from 'react';

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      canSend: true
    }
    this._preventLong = this._preventLong.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    const DELAY = 300;
    this.antiFlood = setInterval(() => { this.setState({ canSend: true }) }, DELAY);
  }

  componentWillUnmount() {
    clearInterval(this.antiFlood);
  }

  render() {
    return(
      <form className="send__form" onSubmit={this._handleSubmit}>
        <input className="send__field"
        onPaste={ this._preventLong }
        onKeyPress={ this._preventLong }
        placeholder="Enter your message..."
        ref={ (input) => this.msgInput = input } />
        <input className="send__btn" type="submit" value="Send" />
      </form>
    );
  }

  // Prevent too long messages
  _preventLong() {
    const MAX_CHARS = 180;

    if(this.msgInput.value.length > MAX_CHARS) {
      //@TODO Warning for user
      this.msgInput.value = this.msgInput.value.slice(0, MAX_CHARS);
      return false;
    } else return true;
  }

  // Send message
  _handleSubmit(e) {
    e.preventDefault();
    // AntiFlood
    if(!this.state.canSend) {
      //@TODO Warning for user
      return false;
    }
    this._preventLong();
    const msg = this.msgInput.value

    // Clear chat input
    this.msgInput.value = '';

    if(msg !== '') {
      this.setState({ canSend: false });
      socket.emit('MSG', msg);
    }
  }
}

export default Input;
