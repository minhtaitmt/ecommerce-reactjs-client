import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL + "api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;				// Dùng persist để lấy user ra

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

