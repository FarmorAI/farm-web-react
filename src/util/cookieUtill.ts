import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setCookie = (key: string, value: string, days: number = 1) => {
  // days 기본값 1
  const expires = new Date();
  expires.setUTCDate(expires.getDate() + days); //보관기한
  return cookie.set(key, value, { expires: expires, path: "/", secure: false });
};

export const getCookie = (key: string) => {
  return cookie.get(key);
};

export const removeCookie = (key: string, path: string = "/") => {
  // path 기본값 "/"
  return cookie.remove(key, { path: path });
};
