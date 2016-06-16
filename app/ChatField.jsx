import React from 'react';
import ChatMsg from './ChatMsg';
import Linkify from 'react-linkify'

class ChatField extends React.Component {
  render() {
    return (
      <ul className="msg-field">
            { this.props.msgs.map((msg, i) => {return <ChatMsg
              key={ i }
              user={ msg.user }
              body={ msg.body
                    .split('\n')
                    .map((body, i) => {
                      return <span key={i}><Linkify>{body}</Linkify><br /></span>
                    }) }
              date={ msg.date } />}
            )}
        <li id="scroll-anchor"></li>
      </ul>
    );
  }
}

export default ChatField;
