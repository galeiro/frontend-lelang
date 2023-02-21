import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { base_url, headers } from "../../api/api_service";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const schema = yup
  .object({
    email: yup.string().required(),
    name: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function AddPetugas({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [errorEmail, setErrorEmail] = useState("");

  async function onSubmit(data) {
    try {
      let url = `${base_url}/admin/add-officer`;
      await axios.post(url, data, headers);
    } catch (er) {
      setErrorEmail(er.response.data.message);
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative bg-navbar transform align-middle transition-all rounded-md w-2/6 px-6 overflow-hidden inline-block">
              <div className="bg-navbar flex flex-col px-10 py-10 rounded-md">
                <h1 className="text-2xl font-semibold mb-5 text-center">
                  Buat petugas baru
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="my-5">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Email"
                      className="bg-[#36363C] rounded-md h-8 outline-none pl-3 lg:w-full text-sm"
                    />

                    <p className="text-xs mt-2 text-left text-red-500 italic">
                      {errorEmail}
                    </p>
                    <p className="text-xs mt-2 text-left text-red-500 italic">
                      {errors.email?.message}
                    </p>
                  </div>
                  <div className="my-5">
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Name"
                      className="bg-[#36363C] rounded-md h-8 outline-none pl-3 lg:w-full text-sm"
                    />
                    <p className="text-xs mt-2 text-left text-red-500 italic">
                      {errors.name?.message}
                    </p>
                  </div>
                  <div className="my-5">
                    <input
                      {...register("username")}
                      type="text"
                      placeholder="Username"
                      className="bg-[#36363C] rounded-md h-8 outline-none pl-3 lg:w-full text-sm"
                    />
                    <p className="text-xs mt-2 text-left text-red-500 italic">
                      {errors.username?.message}
                    </p>
                  </div>
                  <div className="my-5 w-full">
                    <div className="w-full items-center">
                      <input
                        {...register("password")}
                        type={show ? "text" : "password"}
                        placeholder="Password"
                        className="bg-[#36363C] rounded-md h-8 outline-none pl-3 lg:w-full text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="text-[#969697] hover:bg-[#585858] px-1 py-1 rounded-full float-right relative bottom-7 right-2"
                      >
                        {show ? (
                          <EyeOffIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs mt-2 text-left text-red-500 italic">
                      {errors.password?.message}
                    </p>
                  </div>
                  <div className="mt-5">
                    <button className="bg-blue-theme px-5 py-1 rounded-md text-sm absolute blur opacity-40">
                      Simpan
                    </button>
                    <button className="bg-blue-theme px-5 py-1 rounded-md text-sm relative transition ease-in-out hover:scale-110">
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
