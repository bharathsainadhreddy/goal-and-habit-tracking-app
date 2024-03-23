import React from "react";
import "./Form.css";

const Form = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} noValidate>
    {children}
  </form>
);

export default Form;
