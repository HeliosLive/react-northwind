import React, { useContext } from "react";
import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators,
} from "react-reactive-form";
import { Button, Input, Tooltip, Image, Checkbox } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  InfoCircleOutlined,
  UserOutlined,
  LockOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import logo from "../../style/images/login.svg";
import AuthContext from "../../context/auth/AuthContext";
import { useHistory } from "react-router-dom";

export const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { login, loading, isAuthenticated, user } = authContext;

  const history = useHistory();
  const loginForm = FormBuilder.group({});

  const handleReset = (e) => {
    loginForm.reset();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginForm.value);
  };

  const goToHome = (event) => {
    history.push("/");
  };

  if (user && isAuthenticated) {
    goToHome();
  }

  return (
    <div className="container-fluid d-flex justify-content-center row">
      <Image className="col-md-5 offset-md-3" src={logo} alt="login" />
      <FieldGroup
        strict={false}
        control={loginForm}
        render={({ get, invalid, reset, value, dirty }) => (
          <form onSubmit={handleSubmit} className="col-md-6">
            <FieldControl
              name="email"
              options={{ validators: Validators.required }}
              render={({ handler, touched, hasError }) => (
                <div>
                  <span className="form-error">
                    {touched && hasError("required") && "Email is required"}
                  </span>
                  <Input
                    {...handler()}
                    placeholder="Enter your email"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    suffix={
                      <Tooltip title="Unique Information">
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                        />
                      </Tooltip>
                    }
                  />
                </div>
              )}
            />
            <FieldControl
              name="password"
              options={{ validators: Validators.required }}
              render={({ handler, touched, hasError }) => (
                <div>
                  <span className="form-error">
                    {touched && hasError("required") && "Password is required"}
                  </span>
                  <Input.Password
                    {...handler()}
                    placeholder="input password"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </div>
              )}
            />
            <FieldControl
              name="rememberMe"
              render={({ handler, value }) => (
                <div className="m-t-1 container-fluid row">
                  <Checkbox {...handler()} checked={value}>
                    Remember Me!
                  </Checkbox>
                  <div style={{ marginTop: "-.3rem" }}>
                    <Tooltip title="No expire token!">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  </div>
                </div>
              )}
            />
            <div className="m-t-2">
              <Button
                block
                type="primary"
                disabled={!dirty || invalid}
                onClick={handleSubmit}
              >
                Submit
                {loading ? <LoadingOutlined /> : null}
              </Button>
            </div>
            {/* <Button block onClick={handleReset} type="dashed">
              Reset
            </Button> */}
          </form>
        )}
      />
    </div>
  );
};

export default Login;
