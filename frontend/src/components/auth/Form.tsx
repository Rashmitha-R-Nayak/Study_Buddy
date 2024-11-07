import React, { FormEvent } from "react";

type FormProps = {
  formName: string;
  currentModalId: string;
  otherModalId: string;
  callHandleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function FormModal({
  formName,
  callHandleSubmit,
  currentModalId,
  otherModalId,
}: FormProps) {
  const handleModalSwitch = () => {
    const currentModal = document.getElementById(
      currentModalId
    ) as HTMLDialogElement | null;
    const otherModal = document.getElementById(
      otherModalId
    ) as HTMLDialogElement | null;
    if (currentModal) {
      currentModal.close();
    }

    if (otherModal) {
      otherModal.showModal();
    }
  };
  return (
    <div className="md:mt-2 mt-1">
      <h1 className="text-2xl font-bold mb-4 text-blue-500 text-center">
        {formName}
      </h1>
      <div className="md:mx-2 mx-1">
        <section onSubmit={callHandleSubmit}>
          <div className="md:mb-4 mb-2">
            <label className="font-bold block text-gray-300">Username</label>
            <input
              name="username"
              type="text"
              placeholder="username"
              className="bg-stone-400 font-bold text-md text-stone-700 w-full p-2 placeholder:text-gray-500 placeholder:font-normal border border-gray-300 rounded-lg mt-1 transition transform hover:scale-105 duration-300 ease-in-out"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="bg-stone-400  font-bold text-md text-stone-700 w-full p-2 placeholder:text-gray-500 border border-gray-300 rounded-lg mt-1 transition transform hover:scale-105 duration-300 ease-in-out"
              required
            />
          </div>
          {formName === "Register" && (
            <div className="mb-4">
              <label className="block font-bold text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                className="bg-stone-400  font-bold text-md text-stone-700 w-full p-2 placeholder:text-gray-500 border border-gray-300 rounded-lg mt-1 transition transform hover:scale-105 duration-300 ease-in-out"
                required
              />
            </div>
          )}

          <div className="md:mb-6 mb-4 mt-8">
            <button
              type="submit"
              className="font-bold text-md  outline-light rounded-lg bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 ... text-white p-2 w-full transition transform hover:scale-105 duration-300 ease-in-out"
            >
              {formName}
            </button>
            {/* {errorText && (
              <p className="text-sm text-error mt-2">{errorText}</p>
            )} */}
          </div>
        </section>
        {formName === "Login" ? (
          <div className="w-full flex justify-around">
            <div className="font-bold badge rounded-lg badge-lg bg-slate-500 text-sm  text-gray-200 hover:text-blue-400">
              <p onClick={handleModalSwitch} className="mx-1">
                Click here to register
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-around">
            <div className="font-bold badge rounded-lg badge-lg bg-slate-500 text-sm  text-gray-200 hover:text-amber-300">
              <p onClick={handleModalSwitch} className="mx-1">
                Already Registered ?
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
