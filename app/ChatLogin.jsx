import React from 'react';

class ChatLogin extends React.Component {

  componentWillMount() {
    this._checkIfLogged();
  }

  _checkIfLogged() {
    let cookies = document.cookie;
    if(cookies.length > 0) {
      this.props.logIn(cookies.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
    }
  }

  render() {
    return (
      <div className="login-box">
      <div>Login to {'Pp{Chat}'}</div>
        <form onSubmit={this._handleSubmit.bind(this)}>
          <input placeholder="Enter your username..." ref={ (input) => this._username = input } />
          <input type="submit" value="Log in" />
        </form>
      </div>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();

    // List of bad words
    const BLACKLIST = ['shit', 'fuck', 'pussy', 'kurwa', 'dupa', 'chuj', ],
          BLACKPATTERN = new RegExp('(' + BLACKLIST.join('|') + ')', 'i');

        let username = this._username.value.trim(),
            isOffensive = BLACKPATTERN.test(username);

        if(isOffensive) alert('Your name contains bad words! You naughty boy!');
        if(username == '') alert('Anonymous much?');

    if(username !== '' && !isOffensive ) {
      document.cookie = `username=${username};max-age=${1*60*60}`;
      this.props.logIn(username);
    }
  }
}

export default ChatLogin;
