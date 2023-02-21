import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { convert } from "rupiah-format";
import { base_url, getDetailBarang, headers, token } from "../api/api_service";
import { month } from "../App";
import Navbar from "../component/navbar";
import Padding from "../component/padding";
import Title from "../component/title";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/outline";
import EditPelelangan from "../component/dialog/edit_pelelangan";
import jwtDecode from "jwt-decode";

export default function Detail() {
  const { id } = useParams();
  const { data } = useQuery("detail_barang", () => getDetailBarang(id), {
    refetchInterval: 3000,
  });
  let officer_id = jwtDecode(token).id;
  const [img, setImg] = useState();
  const [open, setOpen] = useState(false);
  const [imgData, setImgData] = useState();
  const [msgImage, setMsgImage] = useState();
  const getImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/png"
      ) {
        setImg(URL.createObjectURL(e.target.files[0]));
        setImgData(e.target.files[0]);
      } else {
        setMsgImage("Hanya file ber-ekstensi .jpeg, .jpg, .png");
      }
    }
  };

  async function updateImage() {
    try {
      let url = `${base_url}/barang/update/${id}`;
      let formdata = new FormData();
      formdata.append("fotoBarang", imgData);
      await axios.put(url, formdata, headers);
      setImg();
    } catch (er) {
      console.log(er);
    }
  }
  const navigate = useNavigate();

  async function deleteLelang() {
    try {
      let url = `${base_url}/barang/delete/${id}`;
      await axios.delete(url, headers);
      navigate(-1);
    } catch (er) {
      console.log(er);
    }
  }

  return (
    <React.Fragment>
      <EditPelelangan open={open} setOpen={setOpen} id={id} />
      <Padding>
        <div className="flex">
          <Navbar />
          <div className="flex flex-col w-full pr-24">
            {data?.map((i, detail) => {
              let date = new Date(i.tanggal);
              return (
                <div key={detail} className="pl-20 mt-10 lg:flex space-x-9">
                  <div
                    style={{
                      backgroundImage: `url(${
                        img === undefined ? i.fotoBarang : img
                      })`,
                    }}
                    className="bg-gray-500 lg:h-72 h-44 w-full lg:w-2/4 px-2 py-3 flex justify-end rounded-lg bg-cover"
                  >
                    {officer_id === i.idOfficer &&
                      (img === undefined ? (
                        <div className="h-7">
                          <input
                            accept=".jpg, .jpeg, .png"
                            onChange={getImage}
                            type="file"
                            className="w-7 absolute cursor-pointer opacity-0"
                          />
                          <button className="bg-black h-7 w-7 rounded-full bg-opacity-50 flex justify-center items-center">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="h-7 flex space-x-2">
                          <button
                            onClick={updateImage}
                            className="bg-black h-7 w-7 rounded-full bg-opacity-50 flex justify-center items-center"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setImg()}
                            className="bg-black h-7 w-7 rounded-full bg-opacity-50 flex justify-center items-center"
                          >
                            <XIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="w-2/4">
                    <div className="flex space-x-6 w-full ">
                      <Title text={i.namaBarang} />
                      {officer_id === i.idOfficer && (
                        <div className="flex justify-between w-1/4  h-10">
                          <button
                            onClick={() => setOpen(true)}
                            className="hover:bg-navbar rounded-full px-3 py-2"
                          >
                            <PencilIcon className="h-4 w-4 text-[#A1A1A1]" />
                          </button>
                          <button
                            onClick={deleteLelang}
                            className="hover:bg-navbar rounded-full px-3 py-2"
                          >
                            <TrashIcon className="h-4 w-4 text-[#A1A1A1]" />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-sm mt-5 mb-5">{i.deskripsi}</p>
                    <Title text={"Info"} />
                    <p className="lg:text-sm text-xs mt-3">
                      Dimulai pada{" "}
                      <span className="font-semibold">
                        {i.jam.substring(0, i.jam.length - 3)} WIB,{" "}
                        {date.getDate()} {month[date.getMonth()]}{" "}
                        {date.getFullYear()}
                      </span>
                    </p>
                    <p className="text-sm mt-1">
                      Harga awal{" "}
                      <span className="font-semibold">
                        {convert(i.hargaAwal).substring(
                          0,
                          convert(i.hargaAwal).length - 3
                        )}
                      </span>
                    </p>
                    <p className="text-sm mt-1">
                      Kategori{" "}
                      <span className="font-semibold">{i.kategori}</span>
                    </p>
                    <p className="text-sm mt-1">
                      Petugas{" "}
                      <span className="font-semibold">{i.username}</span>
                    </p>
                    <p className="text-sm mt-1">
                      Status <span className="font-semibold">{i.status}</span>
                    </p>
                    {officer_id === i.idOfficer ? (
                      i.status === "closed" ? (
                        <div className="mt-3">
                          <button className="bg-blue-theme text-sm px-5 font-semibold py-1 rounded-md absolute blur opacity-30">
                            Buka Pelelangan
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                let url = `${base_url}/lelang/update/${id}`;
                                await axios.put(
                                  url,
                                  {
                                    status: "opened",
                                  },
                                  headers
                                );

                                navigate(`/penawaran/${id}`);
                              } catch (er) {
                                console.log(er);
                              }
                            }}
                            className="bg-blue-theme text-sm px-5 font-semibold py-1 rounded-md relative transition ease-in-out hover:scale-110"
                          >
                            Buka Pelelangan
                          </button>
                        </div>
                      ) : (
                        <div className="mt-3">
                          <button className="bg-blue-theme text-sm px-5 font-semibold py-1 rounded-md absolute blur opacity-30">
                            See
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                navigate(`/penawaran/${id}`);
                              } catch (er) {
                                console.log(er);
                              }
                            }}
                            className="bg-blue-theme text-sm px-5 font-semibold py-1 rounded-md relative transition ease-in-out hover:scale-110"
                          >
                            See
                          </button>
                        </div>
                      )
                    ) : (
                      i.status === "opened" && (
                        <div className="mt-3">
                          <button className="bg-blue-theme text-sm px-5 font-semibold py-1 rounded-md absolute blur opacity-30">
                            See
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                navigate(`/penawaran/${id}`);
                              } catch (er) {
                                console.log(er);
                              }
                            }}
                            className="bg-blue-theme text-sm px-5 font-semibold py-1 rounded-md relative transition ease-in-out hover:scale-110"
                          >
                            See
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Padding>
    </React.Fragment>
  );
}
