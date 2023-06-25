import React, { useState } from "react";
import "./newLogin.css";
import { useNavigate } from "react-router-dom";

function NewLogin({ setAuth }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Check if username and password are filled
    if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    // Disable the submit button while the API request is being made
    setIsLoading(true);

    // Prepare the request payload
    const payload = {
      username: username,
      password: password,
    };

    // Send a POST request to the login API endpoint
    fetch("https://demo.credy.in/api/v1/usermodule/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.is_success) {
          // Login successful
          const accessToken = data.data.token;

          // Store the access token securely (e.g., in localStorage)
          localStorage.setItem("accessToken", accessToken);
          //   setAccessToken(accessToken1);
          console.log("accessToken", accessToken);

          // Redirect to the movies page or perform any other action
          // For React Router, you can use: history.push('/movies');
          setAuth(true);
          navigate("/movies");
        } else {
          // Login failed, display error message
          const errorMessage = data.error.message;
          setErrorMessage(errorMessage);
        }
      })
      .catch((error) => {
        console.error("An error occurred during login:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <header className="showcase">
        <div className="logo">
          {/* <img src="https://i.ibb.co/r5krrdz/logo.png" alt="Netflix Logo" /> */}
        </div>
        <div className="showcase-content">
          <div className="formm">
            <form onSubmit={handleFormSubmit}>
              <h1>Sign In</h1>
              <div className="info">
                <input
                  className="email"
                  type="text"
                  placeholder="UserName"
                  //   type="text"
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
                <br />
                <input
                  className="email"
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="btn">
                <button
                  className="btn-primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Sign In
                </button>
              </div>
              <div className="help">
                <div>
                  <input value="true" type="checkbox" />
                  <label>Remember me</label>
                </div>
                <a href="https://www.netflix.com/dz-en/LoginHelp">
                  Need Help ?
                </a>
              </div>
            </form>
          </div>
          <div className="fcbk">
            <a href="https://facebook.com">
              <img
                src="https://i.ibb.co/LrVMXNR/social-fb.png"
                alt="Facebook"
              />
            </a>
            <p>Login with Facebook</p>
          </div>
          <div className="signup">
            <p>New to Netflix ?</p>
            <a href="https://www.netflix.com/dz-en/">Sign up now</a>
          </div>
          <div className="more">
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <a href="#">Learn more.</a>
            </p>
          </div>
        </div>
        {/* <footer>
          <div className="ftr-content">
            <div className="contact">
              <a href="#">Questions? Contact us.</a>
            </div>
            <div className="ftr">
              <a href="#">Gift Card Terms</a>
              <a href="#">Terms of Use</a>
              <a href="#">Privacy Statement</a>
            </div>
          </div>
        </footer> */}
      </header>
    </>
  );
}

export default NewLogin;
