import React from "react";
import "./Input.css";

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
  maxLength,
  children,
}) => (
  <div className="form-group">
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className={error ? "error" : ""}
    />
    {error && <p>{error.message}</p>}
    {children}
  </div>
);

Input.defaultProps = {
  maxLength: null,
  error: null,
};

export default Input;
