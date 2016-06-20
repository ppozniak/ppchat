import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Linkify from 'react-linkify';

class ChatMsg extends React.Component {
  render() {
    return(
      <li>
        <div className="msg-user">
          {this.props.user} at {this.props.date}
        </div>
        <ReactCSSTransitionGroup
          component="div" transitionName="slide-left"
          transitionEnterTimeout={350} transitionLeaveTimeout={350}
          transitionAppear={true} transitionAppearTimeout={350} >
            {this.props.body.map((body, i) => <div key={i}><Linkify properties={{target: '_blank'}} >{body}</Linkify></div>)}
        </ReactCSSTransitionGroup>
      </li>
    );
  }
}

export default ChatMsg;
