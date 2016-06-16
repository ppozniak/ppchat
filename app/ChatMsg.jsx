import React from 'react';

class ChatMsg extends React.Component {
  render() {
    return(
      <li>
        <div className="msg-user">{this.props.user} at {this.props.date}</div>
        {this.props.body}
      </li>
    );
  }
}

export default ChatMsg;
