export function getUserSession() {
  const session = localStorage.getItem("userSession");
  return session ? JSON.parse(session) : null;
}

// Stocke uniquement token et role
export function setUserSession(token, role) {
  if (token && role) {
    const userSession = {
      token,
      role,
    };
    localStorage.setItem("userSession", JSON.stringify(userSession));
  }
}

export function clearUserSession() {
  localStorage.removeItem("userSession");
}

export function getUserRole() {
  const session = getUserSession();
  return session?.role || null;
}

export function getToken() {
  const session = getUserSession();
  return session?.token || null;
}

export function updateToken(token) {
  const session = getUserSession();
  if (session) {
    session.token = token;
    localStorage.setItem("userSession", JSON.stringify(session));
  }
}

