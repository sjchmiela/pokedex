// @flow

const key = "token";

export default {
  getToken: () => localStorage.getItem(key),
  setToken: (value: string) => localStorage.setItem(key, value),
  clearToken: () => localStorage.removeItem(key),
};
