export function setUserSession(token, userRole) {
  localStorage.setItem("token", token);
  localStorage.setItem("user-role", userRole);
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserRole() {
  return localStorage.getItem("user-role");
}

export function clearUserSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user-role");
}
