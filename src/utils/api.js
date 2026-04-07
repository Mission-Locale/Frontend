import {
  getToken,
  updateToken,
  setUserSession,
  clearUserSession,
} from "./storage";

const URI = import.meta.env.VITE_API_URL;
const PORT = import.meta.env.VITE_API_PORT;

async function callEndpoint(endpoint, method, body = null) {
  return await fetch(`${URI}:${PORT}${endpoint}`, {
    method: method,
    body: body != null ? JSON.stringify(body) : null,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

async function callPublicEndpoint(endpoint, method, body = null) {
  return await fetch(`${URI}:${PORT}${endpoint}`, {
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
    fetch(`${URI}:${PORT}${endpoint}`, {
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

async function handleError(response) {
  if (!response.ok) {
    if (response.headers.get("Content-Type").includes("application/json")) {
      const errorData = await response.json();
      console.error(
        `Une erreur ${response.status} a eu lieu : ${errorData.error}`,
      );
      throw {
        status: response.status,
        error: errorData.error,
      };
    } else {
      console.error(`Une erreur ${response.status} a eu lieu !`);
      throw {
        status: response.status,
        error: `Une erreur ${response.status} a eu lieu !`,
      };
    }
  }
}

export async function loginUser(body) {
  const response = await callEndpoint("/auth/login", "POST", body);
  await handleError(response);
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
  const response = await callAuthorizedEndpoint("/auth/logout", "GET");
  await handleError(response);
  clearUserSession();
}

export async function refreshUser() {
  try {
    const response = await callEndpoint("/auth/refresh", "POST");
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
  const response = await callEndpoint("/auth/register", "POST", body);
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
  const response = await callAuthorizedEndpoint("/profile", "GET");
  if (!response.ok) {
    return null;
  }

  return await response.json();
}

export async function getJobSeeker(id) {
  const response = await callAuthorizedEndpoint(
    "/users/job-seeker/" + id,
    "GET",
  );
  await handleError(response);

  return await response.json();
}

export async function getAdvisor(id) {
  const response = await callAuthorizedEndpoint("/users/advisor/" + id, "GET");
  await handleError(response);

  return await response.json();
}

export async function getAdvisorPlanning(advisorId) {
  const response = await callAuthorizedEndpoint(
    "/planning/advisor/" + advisorId,
    "GET",
  );
  await handleError(response);

  return await response.json();
}

export async function getSelfPlanning() {
  const response = await callAuthorizedEndpoint("/planning/me", "GET");
  await handleError(response);

  return await response.json();
}

export async function createAppointment(request) {
  const response = await callAuthorizedEndpoint(
    "/appointments",
    "POST",
    request,
  );
  await handleError(response);

  return await response.json();
}

export async function getAppointments() {
  const response = await callAuthorizedEndpoint("/appointments", "GET");
  await handleError(response);

  return await response.json();
}

export async function getRegistrationAppointments() {
  const response = await callAuthorizedEndpoint(
    "/appointments/registration",
    "GET",
  );
  await handleError(response);

  return await response.json();
}

export async function createRegistrationAppointment(request) {
  const response = await callEndpoint(
    "/appointments/registration",
    "POST",
    request,
  );
  await handleError(response);

  return await response.json();
}

export async function getAppointment(id) {
  const response = await callAuthorizedEndpoint("/appointments/" + id, "GET");
  await handleError(response);

  return await response.json();
}

export async function updateAppointmentTime(id, startTime, duration) {
  const response = await callAuthorizedEndpoint(
    "/appointments/" + id,
    "PATCH",
    { startTime, duration },
  );
  await handleError(response);

  return await response.json();
}

export async function cancelAppointment(id) {
  const response = await callAuthorizedEndpoint(
    `/appointments/${id}/cancel`,
    "PATCH",
  );
  await handleError(response);

  return await response.json();
}

export async function assignAppointment(id, advisorId) {
  const response = await callAuthorizedEndpoint(
    `/appointments/${id}/assign/${advisorId}`,
    "PATCH",
  );
  await handleError(response);

  return await response.json();
}

export async function deleteAppointment(id) {
  const response = await callAuthorizedEndpoint(
    "/appointments/" + id,
    "DELETE",
  );
  await handleError(response);

  return await response.json();
}

export async function getWorkshop(id) {
  const response = await callAuthorizedEndpoint(`/workshops/${id}`, "GET");
  await handleError(response);

  return await response.json();
}

export async function getWorkshopRecurrence(id) {
  const response = await callAuthorizedEndpoint(
    `/workshops/recurrences/${id}`,
    "GET",
  );
  await handleError(response);

  return await response.json();
}

export async function getRegistrations(id) {
  const response = await callAuthorizedEndpoint(
    `/workshops/recurrences/${id}/registrations`,
    "GET",
  );
  await handleError(response);

  return await response.json();
}

export async function registerJobSeekerToWorkshopRecurrence(
  recurrenceId,
  jobSeekerId = undefined,
) {
  const response = await callAuthorizedEndpoint(
    `/workshops/recurrences/${recurrenceId}/register`,
    "POST",
    { jobSeekerId: jobSeekerId },
  );
  await handleError(response);
}

export async function unregisterJobSeekerToWorkshopRecurrence(
  recurrenceId,
  jobSeekerId = undefined,
) {
  const response = await callAuthorizedEndpoint(
    `/workshops/recurrences/${recurrenceId}/unregister${(jobSeekerId && "/" + jobSeekerId) || ""}`,
    "DELETE",
  );
  await handleError(response);
}

export async function removeSelfAnimatorFromWorkshopRecurrence(recurrenceId) {
  const response = await callAuthorizedEndpoint(
    `/workshops/recurrences/${recurrenceId}/animators`,
    "DELETE",
  );
  await handleError(response);
}

export async function getAssignedJobSeekers(nameQuery = undefined) {
  const response = await callAuthorizedEndpoint(
    "/advisors/job-seekers" + (nameQuery ? `?name=${nameQuery}` : ""),
    "GET",
  );
  await handleError(response);

  return await response.json();
}

export async function getUsersFilteredByRole(
  roleType,
  { page = 1, limit = 5, name = "" } = {},
) {
  const params = new URLSearchParams({
    roleType,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (name) {
    params.append("name", name);
  }

  const response = await callAuthorizedEndpoint(
    `/users?${params.toString()}`,
    "GET",
  );
  if (!response.ok) {
    throw {
      status: response.status,
      error: `Erreur lors de la récupération des conseillers`,
    };
  }

  const data = await response.json();
  return data;
}

export async function updateUser(userId, body) {
  const response = await callAuthorizedEndpoint(
    `/users/${userId}`,
    "PATCH",
    body,
  );
  if (!response.ok) {
    throw {
      status: response.status,
      error: `Erreur lors de la mise à jour du conseiller`,
    };
  }

  const data = await response.json();
  return data;
}

export async function deleteUser(userId) {
  const response = await callAuthorizedEndpoint(`/users/${userId}`, "DELETE");
  if (!response.ok) {
    throw {
      status: response.status,
      error: `Erreur lors de la suppression du conseiller`,
    };
  }

  const data = await response.json();
  return data;
}

export async function verifyResetToken(token) {
  const response = await callPublicEndpoint(
    "/auth/verify-reset-token",
    "POST",
    { token },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      status: response.status,
      error: errorData,
    };
  }

  const data = await response.json();
  return data;
}

export async function resetPassword(body) {
  const response = await callPublicEndpoint(
    "/auth/reset-password",
    "POST",
    body,
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      status: response.status,
      error: errorData,
    };
  }

  const data = await response.json();
  return data;
}
