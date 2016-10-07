import React from 'react';
import h from '../helpers';
import ChatApp from './ChatApp';

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      error: false,
      username: '',
      motd: h.rand(["Hello.", "Hello there.", "Hey.", "How are you?", "Ohayo!"])
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleResponse = this._handleResponse.bind(this);
  }

  componentDidMount() {
    socket.on('LOGIN_CHECK', this._handleResponse);
  }

  componentWillUnmount() {
    socket.removeAllListeners('LOGIN_CHECK');
  }

  render() {
    let errorMessage = this.state.error ? <div className="login__error">{ this.state.error }</div> : null;
    return (
      <div className="login-wrapper">
        <div className="login__motd">{ this.state.motd }</div>
        <div className="login__box">
          <div className="container">
            <div>Login to {'Pp{ Chat }'}</div>
            <form onSubmit={ this._handleSubmit }>
              <input required
                    className="login__field"
                    type="text"
                    defaultValue={ this._getFunName() }
                    placeholder="Enter your username..."
                    ref="username"
              />
              <input className="login__btn" type="submit" value="Log in" />
            </form>
            { errorMessage }

            <div className="login__sub-box">
            <h3>About Pp {'{ Chat }'}</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate ullam atque ipsa, sed saepe ducimus veritatis deleniti obcaecati eaque, explicabo iure neque libero nulla possimus molestiae laborum excepturi fuga doloremque. Eum iste sint similique. Possimus rerum sapiente, eos natus. Quibusdam expedita totam veniam, minima accusamus, quasi excepturi, ea est hic nam ab omnis? Officia, doloribus, veniam. Velit nesciunt soluta modi, culpa sit possimus, vero a! Corporis pariatur recusandae impedit, explicabo omnis minima quam amet nostrum, placeat, aspernatur cumque sunt. Illum maiores magnam ab aliquid debitis aut, voluptate fuga nisi, delectus suscipit, iure tempore! Voluptatum aut vitae, dignissimos hic dolore debitis.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Returns default fun username
  _getFunName() {
    const NOUNS = ['Pancake', 'Train', 'Goblin', 'Nerd', 'Programmer', 'Tester', 'Bot'],
          ADJECTIVES = ['Amazing', 'Great', 'Helpful', 'Important', 'Bugged'],
          PREADJECTIVES = ['Pretty', 'Very', 'Really', 'Amazingly', 'Awesomely', 'Definietely'];

    return `${h.rand(PREADJECTIVES)}${h.rand(ADJECTIVES)}${h.rand(NOUNS)}${h.rand(1, 99)}`;
  }

  // Handle data received from the server
  _handleResponse(response) {
    // If there's no error - go to the chat
    if(!response.error) {
      this.setState({
        error: false,
        username: response.username
      });
      socket.emit('LOGIN', response.username);
      this.context.router.transitionTo('/chat');
      //@TODO: Add to local storage
      //@TODO: Dispatch new user
    } else {
      // Error flag to error message
      // 1 - username offensive
      // 2 - username taken
      // 3 - username too short/blank
      let errorMessage = '';

      switch(response.error) {
        case 1:
          errorMessage = "Your username contains bad words.";
          break;
        case 2:
          errorMessage = "Username is already taken.";
          break;
        case 3:
          errorMessage = "Username must be at least 3 characters long";
          break;
      }

      this.setState({
        error: errorMessage
      });
    }
  }

  // Handle 'log in' button press
  _handleSubmit(e) {
    e.preventDefault();
      let username = this.refs.username.value.trim();
      socket.emit('LOGIN_CHECK', username);
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
}

export default Login;
