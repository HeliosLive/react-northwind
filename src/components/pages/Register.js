import React from "react";
import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators,
} from "react-reactive-form";
import { Button } from "antd";

export const Register = () => {
  const registerForm = FormBuilder.group({});

  const handleReset = (e) => {
    registerForm.reset();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form values", registerForm.value);
  };

  return (
    <div className="container-fluid d-flex justify-content-center">
      <FieldGroup
        control={registerForm}
        render={({ get, invalid, reset, value }) => (
          <form onSubmit={handleSubmit}>
            <FieldControl
              name="username"
              options={{ validators: Validators.required }}
              render={({ handler, touched, hasError }) => (
                <div>
                  <input {...handler()} />
                  <span>
                    {touched && hasError("required") && "Username is required"}
                  </span>
                </div>
              )}
            />
            <FieldControl
              name="password"
              options={{ validators: Validators.required }}
              render={({ handler, touched, hasError }) => (
                <div>
                  <input {...handler()} />
                  <span>
                    {touched && hasError("required") && "Password is required"}
                  </span>
                </div>
              )}
            />
            <FieldControl
              name="repassword"
              options={{ validators: Validators.required }}
              render={({ handler, touched, hasError }) => (
                <div>
                  <input {...handler()} />
                  <span>
                    {touched &&
                      hasError("required") &&
                      "Password Confirm is required"}
                  </span>
                </div>
              )}
            />
            <button type="button" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" disabled={invalid}>
              Submit
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default Register;
