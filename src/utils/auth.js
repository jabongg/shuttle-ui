// src/utils/auth.js

const USER_KEY = "loggedInUser";

/**
 * ✅ Get logged-in user from localStorage
 */
export function getUser() {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

/**
 * ✅ Check if user is logged in
 */
export function isLoggedIn() {
  return !!localStorage.getItem(USER_KEY);
}

/**
 * ✅ Logout user
 */
export function logout() {
  localStorage.removeItem(USER_KEY);
}
