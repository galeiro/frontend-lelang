import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getListPetugas } from "../api/api_service";
import Navbar from "../component/navbar";
import Padding from "../component/padding";
import Title from "../component/title";
import bg from "../assets/bg.jpg";
import AddPetugas from "../component/dialog/add_petugas";
import ItemPetugas from "../component/item_petugas";
import { changeTitle } from "../App";
export default function Petugas() {
  const [open, setOpen] = useState(false);
  const { data } = useQuery("list_petugas", () => getListPetugas(), {
    refetchInterval: 3000,
  });
useEffect(()=>changeTitle("petugas"),[])
  return (
    <React.Fragment>
      <AddPetugas setOpen={setOpen} open={open} />
      <Padding>
        <div className="flex">
          <Navbar />
          <div className="pl-20 mt-10 w-full">
            <div
              className="h-52 w-full bg-cover rounded-xl px-10 flex flex-col justify-between py-10"
              style={{ backgroundImage: `url(${bg})` }}
            >
              <Title text={"Tambah petugas baru"} />
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
            <div className="mt-8 w-full flex flex-col space-y-6">
              {data?.map((i, user) => (
                <ItemPetugas
                  id={i.id}
                  key={user}
                  name={i.name}
                  username={i.username}
                  img={i.photoProfile}
                  email={i.email}
                />
              ))}
            </div>
          </div>
        </div>
      </Padding>
    </React.Fragment>
  );
}
