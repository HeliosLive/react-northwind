import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../../context/auth/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !user ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
