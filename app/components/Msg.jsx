import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Linkify from 'react-linkify';

const Msg = ({ username, body, date, clientUsername }) => {
  let msgClass = clientUsername === username ? 'msg__row msg__row--self' : 'msg__row';
  return(
    <li className={ msgClass }>
      <img className="msg__avatar" src="https://s3.amazonaws.com/uifaces/faces/twitter/idiot/128.jpg" />
      <div className="msg__inner">
        <div className="msg__user">
          { username }
          <span className="msg__date">{ date }</span>
        </div>
        <div className="overflow">
          <ReactCSSTransitionGroup
            component="div"
            transitionName="slide-left"
            transitionEnterTimeout={350}
            transitionLeaveTimeout={350}
            transitionAppear={true}
            transitionAppearTimeout={350}>
              { body.map((row, i) => <div key={i}><Linkify properties={{target: '_blank'}} >{ row }</Linkify></div>) }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    </li>
  );
}

Msg.propTypes = {
  username: React.PropTypes.string.isRequired,
  date: React.PropTypes.string,
  body: React.PropTypes.array.isRequired,
}

export default Msg;
