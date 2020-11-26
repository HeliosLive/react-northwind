import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (message, type, timeout = 5000, position = "top-right") => {
    dispatch({
      type: SET_ALERT,
      payload: { message, type, timeout, position },
    });
  };

  // Remove Alert
  const removeAlert = () => {
    dispatch({
      type: REMOVE_ALERT,
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state.item,
        setAlert,
        removeAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
