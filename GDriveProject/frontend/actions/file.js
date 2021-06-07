import fetch from "isomorphic-fetch";
import {removeCookie} from "./auth";
import jwt_decode from "jwt-decode";

export const getAllFiles = (token) => {
    if (jwt_decode(token).exp < Date.now() / 1000) {
      removeCookie("token");
      window.location.replace("http://localhost:3000/login");
    }
    return fetch(`${process.env.API}/files`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

export const deleteFile = (filename, token) => {
  if (jwt_decode(token).exp < Date.now() / 1000) {
    removeCookie("token");
    window.location.replace("http://localhost:3000/login");
  }
  return fetch(`${process.env.API}/file/${filename}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}

export const uploadFile = (data, token) => {
  if (jwt_decode(token).exp < Date.now() / 1000) {
    removeCookie("token");
    window.location.replace("http://localhost:3000/login");
  }
  return fetch(`${process.env.API}/file`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}


export const downloadFile = (filename, username) => {
  return fetch(`http://localhost:8000/${username}/${filename}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.blob();
    })
    .catch((err) => console.log(err));
}