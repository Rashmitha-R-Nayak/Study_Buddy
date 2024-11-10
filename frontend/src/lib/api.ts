import { tokenService } from "./tokenService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const accessToken = tokenService.getAccessToken();

  if (!accessToken) {
    const loginElement = document.getElementById(
      "login_modal"
    ) as HTMLDialogElement | null;

    if (loginElement) {
      loginElement.showModal();
    }
    throw new Error("User not authenticated. Login required.");
  }

  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(options.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }), // to handle formData
  };

  const config = { ...options, headers };

  try {
    let response = await fetch(`${API_URL}${endpoint}`, config);

    if (response.status === 401) {
      const newAccessToken = await tokenService.refreshAccessToken();
      if (newAccessToken) {
        const retryHeaders = {
          ...headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        response = await fetch(`${API_URL}${endpoint}`, {
          ...config,
          headers: retryHeaders,
        });
      } else {
        tokenService.clearTokens();
        console.error(
          "Unauthorized. Redirecting to login or handle accordingly."
        );
      }
    }

    // if (!response.ok) {
    //   console.error(
    //     `Request failed with status ${response.status}: ${response.statusText}`
    //   );
    // }

    return response;
  } catch (error) {
    console.error("Network error:", error);
    throw error;
  }
};
