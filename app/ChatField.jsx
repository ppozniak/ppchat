import React from 'react';
import ChatMsg from './ChatMsg';

class ChatField extends React.Component {
  render() {
    return (
      <ul className="msg-field">
            { this.props.msgs.map((msg, i) => {return <ChatMsg
              key={ i }
              user={ msg.user }
              body={ msg.body }
              date={ msg.date } />}
            )}
            <li id="scroll-anchor"></li>
      </ul>
    );
  }
}

export default ChatField;
