import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import Logo from './../../../Assets/Images/G.png';

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    username: "",
  };

  componentDidMount(){
      console.log(this.props)
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const authentication = getAuth()
    createUserWithEmailAndPassword(authentication, this.state.email, this.state.password)
      .then((response) => {
        
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
        window.location.href = '/login'
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email Already in Use");
        }
      });
  };
  render() {
    return (
      <section id="authentication-page">
        <form onSubmit={this.handleSubmit}>
        <div className="d-flex j-center"><img src={Logo} className="logo"/></div>
          <h2>Sign Up!</h2>
          <fieldset>
            <legend>Create Account</legend>
            <ul>
              <li>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  required
                  onChange={this.handleChange}
                />
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
              <li>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  required
                  onChange={this.handleChange}
                />
              </li>
            </ul>
          </fieldset>
          <button>Submit</button>
          <Link to="/login" type="button">
            Have an Account?
          </Link>
        </form>
      </section>
    );
  }
}
export default SignUp;
