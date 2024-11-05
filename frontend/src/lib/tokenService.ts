const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const tokenService = {
  // Store tokens in localStorage
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),

  //on logout
  clearTokens: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  // Refresh access token using refresh token
  refreshAccessToken: async () => {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token available");

    try {
      const response = await fetch(`${API_URL}/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }
      const data = await response.json();
      const newAccessToken = data.access;

      if (newAccessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
        return newAccessToken;
      }
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      tokenService.clearTokens();
      throw error;
    }
  },
};
