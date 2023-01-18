import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

import Logo from './../../../Assets/Images/G.png';

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const authentication = getAuth()
    signInWithEmailAndPassword(authentication, this.state.email, this.state.password)
        .then((response) => {
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          sessionStorage.setItem('userEmail', response.user.email)
          window.location.href = '/'
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
          }
        })
  };
  render() {
    return (
      <section id="authentication-page">
        <form onSubmit={this.handleSubmit}>
          <div className="d-flex j-center"><img src={Logo} className="logo"/></div>
          <h2>Welcome Back!</h2>
          <fieldset>
            <legend>Log In</legend>
            <ul>
              <li>
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  required
                  onChange={this.handleChange}
                />
              </li>
              <li>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  required
                  onChange={this.handleChange}
                />
              </li>
              <li>
                <i />
                <Link to="/reset-password">Forgot Password?</Link>
              </li>
            </ul>
          </fieldset>
          <button>Login</button>
          <Link to="/register" type="button">
            Create an Account
          </Link>
        </form>
      </section>
    );
  }
}
export default SignIn;
