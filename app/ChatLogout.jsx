import React from 'react';

class ChatLogout extends React.Component {
  render() {
    return(
    <a className="logout-btn" onClick={this._handleClick.bind(this)} >LOGOUT</a>
    );
  }

  _handleClick(e) {
    e.preventDefault();
    this.props.logOut();
  }
}

export default ChatLogout;
