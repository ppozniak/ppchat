import React from 'react';

class ChatUsers extends React.Component {
  render() {
    return(
      <aside className="users-list">
        <h3>Users online: { this.props.userCount }</h3>
      </aside>
    );
  }
}

export default ChatUsers;
