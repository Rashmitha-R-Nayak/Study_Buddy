import { tokenService } from "./tokenService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const accessToken = tokenService.getAccessToken();

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const config = { ...options, headers };

  try {
    let response = await fetch(`${API_URL}${endpoint}`, config);

    // Handle 401 Unauthorized
    if (response.status === 401) {
      const newAccessToken = await tokenService.refreshAccessToken();

      if (newAccessToken) {
        const retryHeaders = {
          ...config.headers,
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

    if (!response.ok) {
      console.error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }

    return response;
  } catch (error) {
    console.error("Network error:", error);
    throw error;
  }
};
