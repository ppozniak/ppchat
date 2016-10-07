import React from 'react';

const RHS = ({ clientUsername, users }) => {
  return (
    <div className="rhs">
      <a className="rhs__logout" href="#">Logout</a>
      <div className="rhs__username">Logged as: <span className="orange">{ clientUsername }</span></div>
      <div className="rhs__usercount">Users online: { users.length }</div>
      <div>
        <ul className="rhs__list">
          { users.map((user, i) => <li key={ i }>{ user }</li>) }
        </ul>
      </div>
    </div>
  );
}

RHS.propTypes = {
  clientUsername: React.PropTypes.string.isRequired,
  users: React.PropTypes.array.isRequired
}

export default RHS;
