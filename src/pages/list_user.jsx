import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { base_url, headers } from "../api/api_service";
import { changeTitle } from "../App";
import ItemUser from "../component/item_users";
import Navbar from "../component/navbar";
import Padding from "../component/padding";
import Title from "../component/title";

export default function ListUser() {
  async function getListUser() {
    try {
      let url = `${base_url}/user/list`;
      let res = await axios.get(url, headers);
      return res.data?.data?.rows;
    } catch (er) {
      if (er) return window.location.reload();
    }
  }
  const { data } = useQuery("list_user", () => getListUser(), {
    refetchInterval: 3000,
  });
  useEffect(() => changeTitle("dashboard"), []);
  return (
    <React.Fragment>
      <Padding>
        <div className="flex">
          <Navbar />
          <div className="pl-20 mt-10 w-full">
            <div>
              <Title text={"User"} />
              <p className="text-xs text-[#9F9F9F]">{data?.length} Users</p>
            </div>
            <div className="mt-8 w-full flex flex-col space-y-6">
              {data?.length === 0 ? (
                <h1 className="text-gray-600 font-semibold text-5xl text-center">
                  kosong
                </h1>
              ) : (
                data?.map((i, user) => (
                  <ItemUser
                    id={i.id}
                    key={user}
                    name={i.name}
                    username={i.username}
                    img={i.photoProfile}
                    email={i.email}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </Padding>
    </React.Fragment>
  );
}
