import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";

let baseURL = "http://localhost:5000/";

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

// REQUEST INTERCEPTORS
axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

// RESPONSE INTERCEPTORS
axiosClient.interceptors.response.use(async (response) => {
  const data = response.data;
  if (data.status === "ok") {
    return data;
  }

  const originalRequest = response.config;
  const statusCode = data.statusCode;
  const error = data.message;
  console.log(
    "originaRequest: ",
    originalRequest,
    "statusCode: ",
    statusCode,
    "error: ",
    error
  );

  //means the access token expired
  if (statusCode === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const response = await axios
      .create({
        withCredentials: true,
      })
      .get(`${baseURL}auth/refresh`);

    console.log("Response from backend", response);

    if (response.data.status === "ok") {
      setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.result.accessToken}`;

      return axios(originalRequest);
    } else {
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "_self");
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
});
