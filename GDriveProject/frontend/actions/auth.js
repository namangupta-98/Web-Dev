import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import jwt_decode from "jwt-decode";

export const signup = (user) => {
  return fetch(`${process.env.API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${process.env.API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signout = (next) => {
  removeCookie("token"), removeLocalStorage("user"), next();
  return fetch(`${process.env.API}/signout`, {
    method: "GET",
  })
    .then((response) => {})
    .catch((err) => console.log(err));
};

//set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

//remove cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

//get cookie
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

//localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key, JSON.stringify(key));
  }
};

//authenticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

//check if user is loggedin or not
export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (jwt_decode(cookieChecked).exp < Date.now() / 1000) {
        removeCookie("token");
        window.location.replace("http://localhost:3000/login");
      } else {
        if (localStorage.getItem("user")) {
          return JSON.parse(localStorage.getItem("user"));
        } else {
          return false;
        }
      }
    }
  }
};

//get authorization token

export const getToken = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      return cookieChecked;
    }
  }
};
