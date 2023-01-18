import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify';

import Logo from './../../../Assets/Images/G.png';

class ResetPassword extends Component {
  state = {
    email: ""
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const authentication = getAuth()
    sendPasswordResetEmail(authentication,  this.state.email).then((response) => {
      window.location.href = '/'
    })
    .catch((error) => {
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
          <h2>Reset Password</h2>
          <fieldset>
            <legend>Password Reset</legend>
            <ul>
              <li>
                <em>A reset link will be sent to your inbox!</em>
              </li>
              <li>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  required
                  onChange={this.handleChange}
                />
              </li>
            </ul>
          </fieldset>
          <button>Send Reset Link</button>
          <Link to="/login">Go Back</Link>
        </form>
      </section>
    );
  }
}
export default ResetPassword;
