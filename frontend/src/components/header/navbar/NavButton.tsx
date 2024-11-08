import React from "react";
import { MdAccountCircle } from "react-icons/md";
import Link from "next/link";
import Modal from "@/components/auth/Modal";
import { useState } from "react";

export default function NavButton() {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle text-white"
      >
        <MdAccountCircle style={{ color: "white", fontSize: "35px" }} />
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content text-white bg-zinc-900 rounded-box z-[1] mt-3 w-32 p-2 shadow"
      >
        <li>
          <p
            onClick={() => {
              const element = document.getElementById(
                "register_modal"
              ) as HTMLDialogElement | null;
              element?.showModal();
            }}
          >
            Register
          </p>
        </li>
        <li>
          <p
            onClick={() => {
              const element = document.getElementById(
                "login_modal"
              ) as HTMLDialogElement | null;
              element?.showModal();
            }}
          >
            Login
          </p>
        </li>
      </ul>
      <Modal id="login_modal" />
      <Modal id="register_modal" />
    </div>
  );
}
