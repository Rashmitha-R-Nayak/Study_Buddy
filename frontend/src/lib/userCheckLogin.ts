"use client";
import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/lib/api";

export const useCheckLogin = () => {
  const [user, setUser] = useState<String | null>(null);
  const [userId, setUserId] = useState<string>("");

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
          console.log(data);
          setUser(data.user);
          setUserId(data.user_id);
        }
      } catch (error) {
        console.log("Login error");
      }
    }
    checkLogin();
  }, []);

  return { user, userId };
};
