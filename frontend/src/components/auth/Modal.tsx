import React from "react";
import Form from "./Form";

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
      const element = document.getElementById(id) as HTMLDialogElement | null;
      if (element) {
        element.close();
      }
    } catch (error) {
      console.log(error);
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
            <form method="dialog">
              <Form
                callHandleSubmit={handleSubmit}
                formName="Login"
                currentModalId={id}
                otherModalId="register_modal"
              />
            </form>
          ) : (
            <form method="dialog">
              <Form
                callHandleSubmit={handleSubmit}
                formName="Register"
                currentModalId={id}
                otherModalId="login_modal"
              />
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
}
