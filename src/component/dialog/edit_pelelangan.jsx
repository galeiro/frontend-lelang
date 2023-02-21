import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { base_url, headers } from "../../api/api_service";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CurrencyInput from "react-currency-input-field";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";

const schema = yup
  .object({
    namaBarang: yup.string().required(),
    tanggal: yup.string().required(),
    hargaAwal: yup.string().required(),
    jam: yup.string().required(),
    deskripsi: yup.string().required(),
  })
  .required();

export default function EditPelelangan({ open, setOpen, id }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const kategori = [
    "gaming",
    "komputer",
    "elektronik",
    "transportasi",
    "rumah",
    "perhiasan",
    "seni",
  ];
  const cancelButtonRef = useRef(null);
  const [selected, setSelected] = useState(kategori[0]);

  const [price, setPrice] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [data, setData] = useState([]);

  async function getData() {
    try {
      let url = `${base_url}/barang/detail/${id}`;
      let res = await axios.get(url, headers);
      setData(res.data?.data?.rows);
    } catch (er) {
      console.log(er);
    }
  }

  async function onSubmit(data) {
    try {
      let url = `${base_url}/barang/update/${id}`;
      await axios.put(
        url,
        {
          namaBarang: data.namaBarang,
          jam: data.jam,
          tanggal: data.tanggal,
          hargaAwal: price,
          kategori: selected,
          deskripsi: data.deskripsi,
        },
        headers
      );
      setOpen(false);
    } catch (er) {
      console.log(er);
    }
  }
  useEffect(() => {
    getData();
  }, []);
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
                  Edit Pelelangan
                </h1>
                {data?.map((i, key) => {
                  let date = new Date(i.tanggal);
                  return (
                    <form key={key} onSubmit={handleSubmit(onSubmit)}>
                      <div className="my-5">
                        <input
                          {...register("namaBarang", { value: i.namaBarang })}
                          type="text"
                          placeholder="Nama Barang"
                          className="bg-[#36363C] rounded-md h-8 outline-none pl-3 lg:w-full text-sm"
                        />
                        <p className="text-xs mt-2 text-left text-red-500 italic">
                          {errors.namaBarang?.message}
                        </p>
                      </div>
                      <div className="my-5">
                        <input
                          {...register("jam", { value: i.jam })}
                          type="time"
                          placeholder="Jam"
                          className="bg-[#36363C] appearance-none rounded-md h-8 outline-none pl-3 lg:w-full text-sm"
                        />
                        <p className="text-xs mt-2 text-left text-red-500 italic">
                          {errors.jam?.message}
                        </p>
                      </div>
                      <div className="my-5">
                        <input
                          {...register("tanggal", {
                            value: `${date.getFullYear()}-${
                              date.getMonth() + 1
                            }-${date.getDate()}`,
                          })}
                          type="text"
                          placeholder="Tanggal"
                          className="bg-[#36363C] rounded-md h-8 outline-none pl-3 lg:w-full text-sm"
                        />
                        <p className="text-xs mt-2 text-left text-red-500 italic">
                          {errors.tanggal?.message}
                        </p>
                      </div>
                      <div className="my-5">
                        <CurrencyInput
                          {...register("hargaAwal", {
                            value: i.hargaAwal,
                          })}
                          className="bg-[#36363C] rounded-md h-8 outline-none px-3 lg:w-full text-sm"
                          placeholder="Harga awal"
                          prefix="Rp. "
                          defaultValue={i.hargaAwal}
                          decimalsLimit={2}
                          onValueChange={(value) => setPrice(value)}
                        />
                        <p className="text-xs mt-2 text-left text-red-500 italic">
                          {errors.hargaAwal?.message}
                        </p>
                      </div>
                      <div className="float-left mb-5 w-full">
                        <Listbox value={selected} onChange={setSelected}>
                          {({ open }) => (
                            <>
                              <div className="mt-1 relative">
                                <Listbox.Button
                                  className={`relative w-full bg-[#36363C] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm`}
                                >
                                  <span className="flex items-center">
                                    <span className="ml-3 block truncate">
                                      {selected}
                                    </span>
                                  </span>
                                  <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>
                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options
                                    className={
                                      "absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                    }
                                  >
                                    {kategori.map((cat, key) => {
                                      return (
                                        <Listbox.Option
                                          key={cat}
                                          className={({ active }) =>
                                            classNames(
                                              active
                                                ? "text-white bg-blue-theme"
                                                : "text-gray-900",
                                              "cursor-default select-none relative py-2 pl-3 pr-9"
                                            )
                                          }
                                          value={cat}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <div className="flex items-center">
                                                <span
                                                  className={classNames(
                                                    selected
                                                      ? "font-semibold"
                                                      : "font-normal",
                                                    "ml-3 block truncate"
                                                  )}
                                                >
                                                  {cat}
                                                </span>
                                              </div>

                                              {selected ? (
                                                <span
                                                  className={classNames(
                                                    active
                                                      ? "text-white"
                                                      : "text-blue-theme",
                                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                                  )}
                                                >
                                                  <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      );
                                    })}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>
                      <div className="my-5">
                        <textarea
                          {...register("deskripsi", { value: i.deskripsi })}
                          placeholder="Deskripsi"
                          className="bg-[#36363C] rounded-md h-52 py-4 resize-none outline-none px-3 lg:w-full text-sm"
                        ></textarea>
                        <p className="text-xs mt-2 text-left text-red-500 italic">
                          {errors.deskripsi?.message}
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
                  );
                })}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
