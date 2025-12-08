import { getToken, setToken, setUserSession } from "./storage";

const URI = "http://localhost";

async function callEndpoint(endpoint, method, body = null) {
  return await fetch(URI + endpoint, {
    method: method,
    body: body != null ? JSON.stringify(body) : null,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function callAuthorizedEndpoint(endpoint, method, body = null) {
  const requestBody = body != null ? JSON.stringify(body) : null;
  const request = () =>
    fetch(URI + endpoint, {
      method: method,
      body: requestBody,
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

  let response = await request();
  if (response.status == 401) {
    await refreshUser();
    response = await request();
  }
  return response;
}

async function handleEndpointError(errorCode, response) {
  if (response.status == errorCode) {
    console.error(`Une erreur ${errorCode} a eu lieu : ${response.error}`);
    throw {
      status: errorCode,
      error: (await response.json()).error,
    };
  } else {
    handleError(response);
  }
}

function handleError(response) {
  if (!response.ok) {
    console.error(`Une erreur ${response.status} a eu lieu !`);
    throw {
      status: response.status,
      error: `Une erreur ${response.status} a eu lieu !`,
    };
  }
}

export async function loginUser(body) {
  const response = await callEndpoint("/auth/login/", "POST", body);
  handleEndpointError(400, response);

  const data = await response.json();
  setUserSession(data.token, data.role);
  return data;
}

export async function refreshUser() {
  const response = await callEndpoint("/auth/refresh/", "POST");
  handleEndpointError(400, response);

  const data = await response.json();
  setToken(data.token);
  return data;
}
