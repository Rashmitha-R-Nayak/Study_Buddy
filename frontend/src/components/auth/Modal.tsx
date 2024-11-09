import React from "react";
import Form from "./Form";
import toast from "react-hot-toast";

type ModalProps = {
  id: string;
};

export default function Modal({ id }: ModalProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword") || "";
    const email = formData.get("email");
    if (id === "login_modal") {
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
        const access_token = data.access;
        const refresh_token = data.refresh;
        localStorage.setItem("ACCESS_TOKEN_KEY", access_token);
        localStorage.setItem("REFRESH_TOKEN_KEY", refresh_token);
        const element = document.getElementById(id) as HTMLDialogElement | null;
        if (element) {
          element.close();
        }
        toast.success("Login successfull");
        setTimeout(() => {
          window.location.reload();
        }, 400);
      } catch (error) {
        console.log(error);
      }
      return;
    }
    try {
      const response = await fetch(`${API_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          password_confirm: confirmPassword,
          email: email,
        }),
      });
      const data = await response.json();
      if (data) {
        console.log(data);
        const registerModalElement =
          (document.getElementById("register_modal") as HTMLDialogElement) ||
          null;
        if (registerModalElement) {
          registerModalElement.close();
        }
        toast.success("User Registered successfully!");
        const loginModalElement =
          (document.getElementById("login_modal") as HTMLDialogElement) || null;
        if (loginModalElement) {
          loginModalElement.showModal();
        }
      }
    } catch (error) {
      console.log("Error occured during register", error);
    }
  }
  return (
    <div>
      <dialog id={id} className="modal modal-middle">
        <div className="modal-box  bg-gray-800 text-gray-800 ">
          <button
            className="btn btn-sm btn-circle btn-ghost text-blue-200  absolute right-2 top-2"
            onClick={() => {
              const element = document.getElementById(
                id
              ) as HTMLDialogElement | null;
              element?.close();
            }}
          >
            ✕
          </button>

          {id === "login_modal" ? (
            <div>
              <Form
                callHandleSubmit={handleSubmit}
                formName="Login"
                currentModalId={id}
                otherModalId="register_modal"
              />
            </div>
          ) : (
            <div>
              <Form
                callHandleSubmit={handleSubmit}
                formName="Register"
                currentModalId={id}
                otherModalId="login_modal"
              />
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
