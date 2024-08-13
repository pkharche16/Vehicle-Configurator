import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Alert } from 'react-st-modal';

function SignInForm() {
  const [state, setState] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const { setIsLogged } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    fetch("http://localhost:8081/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((loginSuccess) => {
        console.log("Login success==>:", loginSuccess);

        loginSuccess && setIsLogged(true);
        if(loginSuccess) Alert(`Welcome ${state.username}`); 
        else Alert(`INVALID ENTRY`);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });

    const { username, password } = state;
    
    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
    fetch("http://localhost:8081/api/" + username, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("userId", data);
        console.log("data==>", data);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const handleForgotPassword = async () => {
    const email = prompt("Please enter your email:");
    if (email) {
      await sendPasswordResetRequest(email);
    }
  };

  const sendPasswordResetRequest = async (email) => {
    try {
      const response = await fetch(`http://localhost:8081/api/forgot-password?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        Alert("Password reset email sent!");
      } else {
        Alert("Failed to send password reset email.");
      }
    } catch (error) {
      console.error("Password reset request failed:", error);
      Alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <br />
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />
        <a href="#" onClick={handleForgotPassword}>Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
