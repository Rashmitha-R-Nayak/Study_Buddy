import React from "react";
import { MdAccountCircle } from "react-icons/md";
import Modal from "@/components/auth/Modal";
import { MdLogin } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useCheckLogin } from "@/lib/userCheckLogin";
import { tokenService } from "@/lib/tokenService";

export default function NavButton() {
  const { user } = useCheckLogin();
  return (
    <div className="dropdown dropdown-end relative">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle text-white  rounded-full transition-all duration-200 ease-in-out"
      >
        <MdAccountCircle style={{ color: "white", fontSize: "35px" }} />
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content text-white bg-zinc-900 rounded-box mt-3 w-40 p-3 shadow-lg transform transition-all duration-200 ease-in-out opacity-0 group-focus:opacity-100 group-focus:scale-100 scale-95"
      >
        {user ? (
          <>
            <li className="py-2 px-4 border-b border-zinc-700">
              <p className=" text-[16px] p-1 font-medium">{user}</p>
            </li>
            <li className="py-2 px-4">
              <p
                className="cursor-pointer  text-[16px]  p-1 font-medium flex items-center text-red-500 hover:text-white"
                onClick={() => {
                  tokenService.clearTokens();
                  window.location.reload();
                }}
              >
                Logout <TbLogout2 className="ml-2" />
              </p>
            </li>
          </>
        ) : (
          <>
            <li className="py-2 px-4">
              <p
                className="cursor-pointer  text-[16px] p-1 font-medium text-blue-500 hover:text-white"
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
            <li className="py-2 px-4">
              <p
                className="cursor-pointer  text-[16px] p-1 font-medium text-blue-500 flex items-center hover:text-white"
                onClick={() => {
                  const element = document.getElementById(
                    "login_modal"
                  ) as HTMLDialogElement | null;
                  element?.showModal();
                }}
              >
                Login
                <MdLogin className="ml-2" />
              </p>
            </li>
          </>
        )}
      </ul>

      <Modal id="login_modal" />
      <Modal id="register_modal" />
    </div>
  );
}
