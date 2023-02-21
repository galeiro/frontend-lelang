import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import Padding from "../component/padding";
import Title from "../component/title";
import bg from "../assets/bg.jpg";
import Card from "../component/card";
import AddPelelangan from "../component/dialog/add_pelelangan";
import { useQuery } from "react-query";
import { getListBarang } from "../api/api_service";
import { changeTitle, month } from "../App";

export default function Jadwal() {
  const [open, setOpen] = useState(false);
  const { data } = useQuery("list_barang", () => getListBarang(10, 1), {
    refetchInterval: 4000,
  });

  useEffect(() => changeTitle("jadwal lelang"), []);
  return (
    <React.Fragment>
      <AddPelelangan setOpen={setOpen} open={open} />
      <Padding>
        <div className="flex">
          <Navbar />
          <div className="pl-20 mt-10 w-full">
            <div
              className="h-52 w-full bg-cover rounded-xl px-10 flex flex-col justify-between py-10"
              style={{ backgroundImage: `url(${bg})` }}
            >
              <Title text={"Buat pelelangan"} />
              <div>
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="bg-white text-blue-theme font-semibold text-sm px-5 mt-3 py-1 rounded-md transition ease-in-out hover:scale-110"
                >
                  Buat
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-7">
              {data?.map((i, key) => {
                let date = new Date(i.tanggal);
                return (
                  <Card
                    key={key}
                    title={i.namaBarang}
                    id={i.id}
                    date={`${date.getDate()} ${
                      month[date.getMonth()]
                    } ${date.getFullYear()}`}
                    price={i.hargaAwal}
                    time={i.jam.substring(0, i.jam.length - 3)}
                    img={i.fotoBarang}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Padding>
    </React.Fragment>
  );
}
