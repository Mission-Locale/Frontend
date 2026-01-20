import {
  getToken,
  updateToken,
  setUserSession,
  clearUserSession,
} from "./storage";

const URI = import.meta.env.VITE_API_URL;
const PORT = import.meta.env.VITE_API_PORT;

async function callEndpoint(endpoint, method, body = null) {
  return await fetch(URI + endpoint, {
    method: method,
    body: body != null ? JSON.stringify(body) : null,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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
      credentials: "include",
    });

  let response = await request();
  if (response.status == 401) {
    const refreshed = await refreshUser();
    if (refreshed) {
      response = await request();
    } else {
      clearUserSession();
      window.location.href = "/login";
      throw { status: 401, error: "Session expirée" };
    }
  }
  return response;
}

async function handleEndpointError(errorCode, response) {
  if (response.status == errorCode) {
    const errorData = await response.json();
    console.error(`Une erreur ${errorCode} a eu lieu : ${errorData.error}`);
    throw {
      status: errorCode,
      error: errorData.error,
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
  const response = await callEndpoint(`:${PORT}/auth/login`, "POST", body);

  if (!response.ok) {
    return handleEndpointError(400, response);
  }

  const data = await response.json();

  // Stocker uniquement token et role dans le localStorage
  setUserSession(data.token, data.role);

  // Récupérer les informations du user connecté pour le context
  try {
    const userProfile = await getUserProfile();

    return {
      email: userProfile.email,
      firstName: userProfile.first_name,
      lastName: userProfile.last_name,
      role: data.role,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
  }
}

export async function logoutUser() {
  const response = await callAuthorizedEndpoint(`:${PORT}/auth/logout`, "GET");
  handleError(response);
  clearUserSession();
}

export async function refreshUser() {
  try {
    const response = await callEndpoint(`:${PORT}/auth/refresh`, "POST");
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    updateToken(data.token);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function registerUser(body) {
  const response = await callEndpoint(`:${PORT}/auth/register`, "POST", body);

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      status: response.status,
      error: errorData.error,
      code: errorData.error?.code,
    };
  }

  return await response.json();
}

export async function getUserProfile() {
  const response = await callAuthorizedEndpoint(`:${PORT}/profile`, "GET");

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

//TODO: Implement backend route (and data model)
export async function getAdvisorPlanning(advisorId) {
  const response = await callAuthorizedEndpoint(
    "/planning/advisor/" + advisorId,
    "GET",
  );
  //handleEndpointError(400, response);

  return await response.json();
}

export async function createAppointment(request) {
  const response = await callAuthorizedEndpoint(
    "/appointments",
    "POST",
    request,
  );
  handleEndpointError(403, response);

  return await response.json();
}

export async function getAppointments() {
  const response = await callAuthorizedEndpoint("/appointments", "GET");
  handleEndpointError(403, response);

  return await response.json();
}

export async function getRegistrationAppointments() {
  const response = await callAuthorizedEndpoint(
    "/appointments/registration",
    "GET",
  );
  handleEndpointError(403, response);

  return await response.json();
}

export async function createRegistrationAppointment(request) {
  const response = await callEndpoint(
    "/appointments/registration",
    "POST",
    request,
  );
  handleEndpointError(400, response);

  return await response.json();
}

export async function getAppointment(id) {
  const response = await callAuthorizedEndpoint("/appointments/" + id, "GET");
  handleEndpointError(403, response);

  return await response.json();
}

export async function updateAppointment(id, body) {
  const response = await callAuthorizedEndpoint(
    "/appointments/" + id,
    "PATCH",
    body,
  );
  handleEndpointError(403, response);

  return await response.json();
}

export async function deleteAppointment(id) {
  const response = await callAuthorizedEndpoint(
    "/appointments/" + id,
    "DELETE",
  );
  handleEndpointError(403, response);

  return await response.json();
}