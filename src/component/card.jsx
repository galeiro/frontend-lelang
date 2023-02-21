import React from "react";
import { useNavigate } from "react-router-dom";
import { convert } from "rupiah-format";

export default function Card({ title, price, time, date, id, img }) {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div
        className=" w-full mr-3 mb-3 bg-[#23232E] rounded-lg px-4 py-4 "
        style={{ height: "20rem" }}
      >
        <div
          style={{
            backgroundImage: `url(${img})`,
          }}
          className="h-2/4 rounded-lg w-full bg-gray-700 bg-cover"
        ></div>
        <div className="mt-3 flex flex-col">
          <h3 className="font-semibold mb-2">{title}</h3>
          <small className="text-[#A8A8B7] text-xs mb-1">
            {convert(price).substring(0, convert(price).length - 3)}
          </small>
          <small className="text-[#A8A8B7] text-xs capitalize">
            {time} WIB {date}
          </small>
          <div className="flex justify-end text-white">
            <div className="mt-3 transition ease-in-out hover:scale-110">
              <div className="bg-blue-theme h-7 w-16 text-sm px-5 font-semibold py-1 rounded-md absolute blur bg-opacity-30"></div>
              <button
                onClick={() => navigate(`/detail/${id}`)}
                className="bg-blue-theme text-sm px-5 font-semibold py-1 rounded-md relative"
              >
                See
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
