import React, { useState } from "react";
import { signin, signup, authenticate } from "../actions/auth";
import { notification } from 'antd';
import Router from "next/router";

const Login = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = values;

  const handleLogin = (e) => {
    e.preventDefault();
    signin({email, password}).then((data) => {
        if (data.error) {
          openNotification(data.error)
        } else {
          openNotification("Logged in successfully");
          authenticate(data, () => {
            Router.push(`/`);
          });
        }
      });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    signup({name, email, password}).then((data) => {
        if (data.error) {
          openNotification(data.error)
        } else {
            openNotification(data.message);
        }
      });
  };

  const handleChange = (e, type) => {
    setValues({ ...values, [type]: e.target.value });
  };

  const openNotification = (data) => {
    const args = {
      message: data,
      duration: 4.5,
    };
    notification.open(args);
  };

  return (
    <div className="mainContainer">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={(e) => handleSignup(e)}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => handleChange(e, "name")}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleChange(e, "email")}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleChange(e, "password")}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={(e) => handleLogin(e)}>
            <h1>Sign in</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleChange(e, "email")}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleChange(e, "password")}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Drive</h1>
              <p>Easy and secure storage for all your content.</p>
              <button
                className="ghost"
                id="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
              `,
        }}
      />
    </div>
  );
};

export default Login;
