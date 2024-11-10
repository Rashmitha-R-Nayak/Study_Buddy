"use client";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const tokenService = {
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem("ACCESS_TOKEN_KEY", accessToken);
    localStorage.setItem("REFRESH_TOKEN_KEY", refreshToken);
  },

  getAccessToken: () => localStorage.getItem("ACCESS_TOKEN_KEY"),
  getRefreshToken: () => localStorage.getItem("REFRESH_TOKEN_KEY"),

  clearTokens: () => {
    localStorage.removeItem("ACCESS_TOKEN_KEY");
    localStorage.removeItem("REFRESH_TOKEN_KEY");
  },

  // Refresh access token using refresh token
  refreshAccessToken: async () => {
    const refreshToken = tokenService.getAccessToken();
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
        throw new Error(
          `Failed to refresh access token. Status: ${response.status}`
        );
      }

      const data = await response.json();
      const newAccessToken = data.access;

      if (newAccessToken) {
        tokenService.setTokens(newAccessToken, refreshToken);
        return newAccessToken;
      } else {
        throw new Error("No new access token returned");
      }
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      tokenService.clearTokens();
      throw error;
    }
  },
};
