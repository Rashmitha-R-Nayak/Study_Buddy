// lib/fetchWithAuth.ts
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
  let response = await fetch(`${API_URL}${endpoint}`, config);

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
      console.error("Unauthorized. Redirect to login or handle accordingly.");
    }
  }

  return response;
};
