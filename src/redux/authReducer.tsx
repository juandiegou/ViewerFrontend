import { AxiosRequestConfig } from "axios";
import { requestAdmin, requestAdminAuth } from "../api/Request";
import { Account } from "../interfaces/userAccount";

// constantes
const dataInit = {
  token: localStorage.getItem("tokenAdmin"),
  user: {},
};

// types

type AuthAction = {
  type: "LOGIN" | "LOGOUT" | "PROFILE";
  payload: Account;
};

// reducer
export const authReducer = (state = dataInit, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, token: action.payload.token };
    case "PROFILE":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// actions
export const loginAction =
  (email: string, password: string, callback: Function) =>
  async (dispatch: Function, getState: Function) => {
    const body = { email, password };

    const req = await requestAdmin
      .post<Account>("/login", body)
      .catch((error) => {
        callback({
          ok: false,
          message: error.response ? error.response.data.message : "",
        });
      });

    if (req) {
      localStorage.tokenAdmin = req.data.token;
      dispatch({
        type: "LOGIN",
        payload: req.data,
      });
      callback({ ok: true });
    }
  };

export const accountInformation =
  (callback: Function) => async (dispatch: Function, getState: Function) => {
    const { token } = getState().auth;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const req = await requestAdminAuth
      .get<Account>("/system_users/profile", config)
      .catch((error?) => {
        callback({
          ok: false,
          message: error.response ? error.response.data.message : "",
        });
      });

    if (req) {
      dispatch({
        type: "PROFILE",
        payload: req.data,
      });
      callback({ ok: true });
    }
  };
