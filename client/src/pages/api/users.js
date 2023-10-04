import axios from "axios";
import localforage from "localforage";
import jwt_decode from "jwt-decode";

// gets the registered user
export function register(userData) {
  return axios
    .post("http://localhost:9000/users/register", userData)
    .then((res) => res.data);
}

// gets the logged in user
export async function login(userData) {
  let res = await axios.post("http://localhost:9000/users/login", userData);
  if (res.data) localStorage.setItem("token", res.data);
  return res.data;
}

// logs out user
export async function logout() {
  await localStorage.removeItem("token");
}

// gets logged in user information
export async function getLoggedUser() {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    return null;
  }
  let res = await axios.get("http://localhost:9000/users/profile", {
    headers: {
      "x-auth-token": token,
    },
  });

  return res.data;
}
