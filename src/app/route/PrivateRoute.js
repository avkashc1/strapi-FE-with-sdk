import React from "react";
import { Route, Redirect } from "react-router-dom";

import { LOGIN } from "../constant";
import getCurrentUser from "../utils/getCurrentUser";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = getCurrentUser()
        .then((res) => true)
        .catch((err) => false);
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect to={{ pathname: LOGIN, state: { from: props.location } }} />
        );
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
