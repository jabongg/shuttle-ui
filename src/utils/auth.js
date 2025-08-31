// src/utils/auth.js

// Dummy credentials (hardcoded for now)
const DUMMY_USER = {
    username: "admin",
    password: "admin",
  };
  
  const TOKEN_KEY = "authToken";
  const USER_KEY = "authUser";
  const DUMMY_TOKEN = "dummy-jwt-token";
  
  // ✅ Login: store token + username
  export function login(username, password) {
    if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
      localStorage.setItem(TOKEN_KEY, DUMMY_TOKEN);
      localStorage.setItem(USER_KEY, username);
      return true;
    }
    return false;
  }
  
  // ✅ Logout (remove token + user)
  export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
  
  // ✅ Check if logged in
  export function isLoggedIn() {
    return !!localStorage.getItem(TOKEN_KEY);
  }
  
  // ✅ Get current token
  export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  
  // ✅ Get logged-in user
  export function getUser() {
    const username = localStorage.getItem(USER_KEY);
    return username ? { username } : null;
  }
  