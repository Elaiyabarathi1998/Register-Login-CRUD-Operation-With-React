import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Retrieve stored email and password from local storage
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // Check if entered credentials match stored values
    if (email === storedEmail && password === storedPassword) {
      setLoading(false);
      navigate("/dashboard"); // Navigate to the dashboard page if credentials match
    } else {
      setLoading(false);
      setError(true); // Set error state if credentials do not match
    }
  };

  return (
    <section className="register-block">
      <div className="container">
        <div className="row ">
          <div className="col register-sec">
            <h2 className="text-center">Login</h2>
            <form className="register-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="form-control"
                />
                {email === "" && (
                  <span className="text-danger">Email is required.</span>
                )}
              </div>

              <div className="form-group">
                <label>Password</label>
                <div
                  className="password-input"
                  style={{
                    position: "relative",
                  }}
                >
                  <input
                    className="form-control"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"} 
                  />
                  <span
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                    />
                  </span>
                </div>
                {password === "" && (
                  <span className="text-danger">Password is required.</span>
                )}
              </div>
              <div className="form-group">
                <button className="btn btn-login float-right" type="submit">
                  {loading ? "Loading..." : "Login"}
                </button>
                {error && (
                  <span className="text-danger">
                    *Email or password is incorrect
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
