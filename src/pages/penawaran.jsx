import { Avatar } from "@mui/material";
import Navbar from "../component/navbar";
import Padding from "../component/padding";
import Title from "../component/title";
import medal from "../assets/top-rated.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  base_url,
  getDetailBarang,
  headers,
  listPenawar,
  token,
} from "../api/api_service";
import axios from "axios";
import { convert } from "rupiah-format";
import { useQuery } from "react-query";
import jwtDecode from "jwt-decode";
export default function Penawaran() {
  const { id } = useParams();
  let officer_id = jwtDecode(token).id;
  const navigate = useNavigate();
  const { data } = useQuery("penawaran", () => listPenawar(id), {
    refetchInterval: 4000,
  });
  const detail = useQuery("detail", () => getDetailBarang(id), {
    refetchInterval: 3000,
  });

  return (
    <>
      <Padding>
        <div className="flex">
          <Navbar />
          <div className="flex flex-col w-full pr-24">
            <div className="pl-20 mt-10 lg:flex space-x-9">
              {detail?.data?.map((i, detail) => {
                document.title = `${i.namaBarang} - Penawaran`;
                if (i.status === "closed")
                  return navigate("/", { replace: true });
                return (
                  <div key={detail} className="w-2/4">
                    <div
                      style={{
                        backgroundImage: `url(${i.fotoBarang})`,
                      }}
                      className="bg-gray-500 mb-5 lg:h-72 h-44 w-full lg:w-full px-2 py-3 flex justify-end rounded-lg bg-cover"
                    ></div>
                    <Title text={i.namaBarang} />
                    <p className="text-sm mt-1">
                      Harga awal{" "}
                      <span className="font-semibold">
                        {convert(i.hargaAwal).substring(
                          0,
                          convert(i.hargaAwal).length - 3
                        )}
                      </span>
                    </p>
                    {officer_id === i.idOfficer && (
                      <div className="mt-3">
                        <button className="bg-blue-theme text-sm px-5 font-semibold py-1 rounded-md absolute blur opacity-30">
                          Tutup Pelelangan
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              let url = `${base_url}/lelang/update/${id}`;
                              await axios.put(
                                url,
                                {
                                  status: "closed",
                                },
                                headers
                              );

                              navigate(`/detail/${id}`, { replace: true });
                            } catch (er) {
                              console.log(er);
                            }
                          }}
                          className="bg-blue-theme text-sm px-5 font-semibold py-1 rounded-md relative transition ease-in-out hover:scale-110"
                        >
                          Tutup Pelelangan
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="flex flex-col w-2/5">
                {data?.map((i, penawar) => {
                  if (penawar === 0) {
                    return (
                      <Top
                        key={penawar}
                        price={convert(i.penawaranHarga)}
                        img={i.photoProfile}
                      />
                    );
                  } else {
                    return (
                      <div
                        key={penawar}
                        className="flex w-full items-center space-x-9 px-8 mt-5 text-[#BBBBBB]"
                      >
                        <div className="flex items-center space-x-6">
                          <Avatar src={i.photoProfile} />
                          <p className="font-medium text-xl">{penawar + 1}</p>
                        </div>
                        <p className="font-medium text-xl">
                          {convert(i.penawaranHarga).substring(
                            0,
                            convert(i.penawaranHarga).length - 3
                          )}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </Padding>
    </>
  );
}

function Top({ price, name, email, img }) {
  return (
    <>
      <div className="bg-gradient-to-r from-[#FFA722] to-[#FFD200] w-full flex items-center py-3 px-8 rounded-lg space-x-3">
        <Avatar src={img} />
        <img src={medal} alt={medal} className="h-10" />
        <p className="font-semibold text-xl">
          {price.substring(0, price.length - 3)}
        </p>
      </div>
    </>
  );
}
