import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistration = () => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    navigate("/login");
  };

  return (
    <section className="register-block">
      <div className="container">
        <div className="row ">
          <div className="col register-sec">
            <h2 className="text-center">Registration</h2>
            <form className="register-form" onSubmit={handleRegistration}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                  required // This attribute makes the field required
                />
                {/* Display a custom validation message */}
                {!email.match(
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                ) && (
                  <span className="text-danger">Enter a valid email.</span>
                )}
              </div>
              <div className="form-group">
                <label>Password:</label>
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
                    type={showPassword ? "text" : "password"} // Toggle password visibility
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
              </div>
              <div className="form-group">
                <button
                  type="button"
                  onClick={handleRegistration}
                  className="btn btn-login float-right"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
