import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CREATE_USER_ERROR,
  CREATE_USER,
} from "./types/actionTypes";
import client from "../../feathers/feathersClient";
import { setAlert } from "./alertAction";

export const login = (email, password) => async (dispatch) => {
  try {
    const result = await client.authenticate({
      email,
      password,
      strategy: "local",
    });
    dispatch({ type: LOGIN_SUCCESS, payload: result });
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await client.logout();
    dispatch({ type: LOGOUT });
  } catch (err) {
    console.error(err);
  }
};

export const registerUser = ({
  name,
  email,
  usertag,
  password,
  role,
}) => async (dispatch) => {
  try {
    const userService = client.service("users");
    // const result = JSON.stringify({
    //   name: name,
    //   email: email,
    //   usertag: usertag,
    //   password: password,
    //   role: role,
    // });
    // console.log(result);
    const res = await userService.create(
      { name, email, usertag, password, role },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    // dispatch({ type: CREATE_USER, payload: res });
    dispatch(setAlert("registration successfully done", "success"));
    // dispatch({tyep: LOGIN_SUCCESS })
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
    dispatch({ type: CREATE_USER_ERROR });
    console.error(err);
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await client.reAuthenticate();
    dispatch({
      type: USER_LOADED,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
