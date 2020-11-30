import React, { useReducer, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SET_LOADING,
} from "../types";
import jwt_decode from "jwt-decode";
import AlertContext from "../alert/AlertContext";
import { createBrowserHistory } from "history";

const api_url = "https://udemy-nestjs-course.herokuapp.com/api";

const AuthState = (props) => {
  const history = createBrowserHistory({ forceRefresh: true });

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const callAlerts = (message, type) => {
    setAlert(message, type);
  };
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("isAuthenticated"),
    loading: false,
    user: localStorage.getItem("user"),
    error: null,
  };

  const goToHome = (event) => {
    history.push("/");
  };
  const goToLogin = (event) => {
    history.push("/login");
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async (userId) => {
    if (!userId && state.token) {
      const decodedToken = jwt_decode(state.token);
      loadUser(decodedToken.user._id);
    }
    try {
      const res = await axios.get(api_url + `/user/${userId}`);
      dispatch({
        type: USER_LOADED,
        payload: res.data[0],
      });
      callAlerts(
        `Welcome back ${res.data[0].name} ${res.data[0].surname} !`,
        "success"
      );
      goToHome();
    } catch (err) {
      console.log("err", err);
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    try {
      const res = await axios.post(api_url + "/user", formData);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      goToLogin();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    setLoading();
    try {
      const res = await axios.post(api_url + "/login", formData);
      if (!res.data.success) {
        dispatch({
          type: LOGIN_FAIL,
          payload: res.data.response,
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.value,
        });
        const decodedToken = jwt_decode(res.data.value);
        loadUser(decodedToken.user._id);
        callAlerts(`Logged in successfully !`, "success");
      }
    } catch (err) {
      // alert("adsdsad1a");
      // dispatch({
      //   type: LOGIN_FAIL,
      //   payload: err,
      // });
    }
  };

  // Logout
  const logout = () => {
    callAlerts(`Logged out successfully !`, "error");
    dispatch({ type: LOGOUT });
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        callAlerts,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
