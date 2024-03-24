import React from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { Button } from "../Button/Button";
import Popup from "../ComingSoonPopup/Popup";
import bcrypt from "bcryptjs";
import { makeHttpCallToRestApi } from "../router";
import "./Register.css";

const Register = ({ onRegister }) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: { message: "Passwords do not match." } });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const user = { ...formData, password: hashedPassword };

      const response = await makeHttpCallToRestApi("/api/register", {
        ...user,
        action: "register",
      });
      const data = await response.json();
      handleSuccessfulRegistration(data);
    } catch (error) {
      console.error("Error in API request:", error);
      setErrors({
        global: { message: "An error occurred during registration." },
      });
    }
  };

  const handleSuccessfulRegistration = (response) => {
    console.log("Registered", response);

    localStorage.setItem("token", response.token);
    localStorage.setItem("userName", formData.userName);

    onRegister();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Input
            type="text"
            placeholder="User Name"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            maxLength={50}
            error={errors.userName}
          />
          <Input
            type="tel"
            placeholder="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            maxLength={10}
            error={errors.mobileNumber}
          />
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
          />
          <Button type="submit">Register</Button>
          <p>
            Already have an account?
            <a href="#" onClick={() => setShowPopup(true)}>
              Login here
            </a>
          </p>
        </Form>
      </div>
      {showPopup && (
        <Popup message="Coming Soon!" onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

const PasswordInput = ({ name, value, onChange, error }) => (
  <div className="password-instructions-container">
    <Input
      type="password"
      placeholder="Password"
      name={name}
      value={value}
      onChange={onChange}
      error={error}
    >
      <div className="password-instructions">
        Password should be at least 8 characters long and contain at least one
        uppercase letter, one lowercase letter, one number, and one special
        character.
      </div>
    </Input>
  </div>
);

export default Register;
