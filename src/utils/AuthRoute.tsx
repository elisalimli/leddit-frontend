import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state: RootState) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
