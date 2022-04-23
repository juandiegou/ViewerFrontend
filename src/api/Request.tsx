import axios from "axios";
//import { API_ADMIN } from "../env";

export const requestAdmin = axios.create({
  //baseURL: API_ADMIN,
});

export const requestAdminAuth = axios.create({
  //baseURL: API_ADMIN,
  // headers: {
  //   "Content-type": "application/json; charset=UTF-8",
  // },
});
