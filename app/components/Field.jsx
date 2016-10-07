import React from 'react';
import Msg from './Msg';

const Field = ({ clientUsername, msgs }) => (
    <ul className="msg-field">
          <li className="msg__row msg__row--server">Welcome to the Pp Chat</li>
          { msgs.map((msg, i) => { return <Msg
            key={ i }
            clientUsername={ clientUsername }
            username={ msg.user }
            body={ msg.body }
            date={ msg.date } />}
          )}
          <li id="scroll-anchor"></li>
    </ul>
)

Field.propTypes = {
  clientUsername: React.PropTypes.string.isRequired,
  msgs: React.PropTypes.array.isRequired
}

export default Field;
