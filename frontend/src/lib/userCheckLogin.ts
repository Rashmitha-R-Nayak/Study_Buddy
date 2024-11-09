"use client";
import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/lib/api";

export const useCheckLogin = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    async function checkLogin() {
      try {
        if (!localStorage.getItem("ACCESS_TOKEN_KEY")) {
          return;
        }
        const response = await fetchWithAuth(`/auth/check-login/`);
        if (!response.ok) {
          console.error(`Login check failed with status: ${response.status}`);
          return;
        }
        const data = await response.json();
        if (data.login_status === "logged_in") {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error during login check:", error);
      }
    }
    checkLogin();
  }, []);

  return user;
};
