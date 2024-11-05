"use client";
import React from "react";

export default function Login() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log(API_URL);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    try {
      const response = await fetch(`${API_URL}/auth/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Error login");
      }
      const data = await response.json();
      console.log(data);
      const access_token = data.access;
      const refresh_token = data.refresh;
      localStorage.setItem("ACCESS_TOKEN_KEY", access_token);
      localStorage.setItem("REFRESH_TOKEN_KEY", refresh_token);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 items-center justify-center"
    >
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter your username"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter Your password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
