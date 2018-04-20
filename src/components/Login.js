import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { API_URL } from '../App';

class Login extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      login: this.loginInput.getValue(),
      password: this.passwordInput.getValue(),
    };
    fetch(`${API_URL}/login`, {
      method: 'post',
      body: JSON.stringify(credentials),
      headers: new Headers({
        'Content-Type': 'application/json',
    	})
    }).then(response => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response.text();
    }).then(data => {
      console.log(data);
      localStorage.setItem('token', data);
      this.props.changeRoute('list')();
    });
  };

  render() {
    return (
      <div className="login-form">
        <h2>Connexion</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField
            ref={e => {this.loginInput = e;}}
            name="login"
            required={true}
            type="text"
            floatingLabelText="Identifiant"
            floatingLabelFixed={true}
          />
          <br/>
          <TextField
            ref={e => {this.passwordInput = e;}}
            name="password"
            required={true}
            type="password"
            floatingLabelText="Mot de passe"
            floatingLabelFixed={true}
          />
          <br/>
          <RaisedButton
            primary
            label="Connexion"
            type="submit"
          />
        </form>
      </div>
    )
  }
}

export default Login;
