import { Alert, Collapse, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { base_url } from "../../api/api_service";
import img from "../../assets/login.png";
import BlueButton from "../../component/blue_button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  let [show, setShow] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(true);
    try {
      let url = `${base_url}/admin/login`;
      let res = await axios.post(url, data);
      setLoading(false);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard", { replace: true });
    } catch (er) {
      setShow(true);
      setLoading(false);
      setMsgError(er.response.data.message);
    }
  }
  return (
    <React.Fragment>
      <Collapse in={show}>
        <Alert className="bg-dark alert text-blue-300" severity="error">
          {msgError}
        </Alert>
      </Collapse>

      <div className="px-10 py-10 overflow-hidden text-white">
        <h1 className="text-2xl font-semibold mb-20">Login</h1>
        <div className="flex justify-between">
          <div className="w-full flex flex-col space-y-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 mb-5">
                <label className="mb-3 text-sm">Email</label>
                <input
                  {...register("email")}
                  type={"email"}
                  className="bg-[#36363C] rounded-md h-8 outline-none pl-3 lg:w-2/3 text-sm"
                />
                <small className="text-red-500 mt-2 text-xs">
                  {errors.email?.message}
                </small>
              </div>
              <div className="grid grid-cols-1 mb-5">
                <label className="mb-3 text-sm">Passsword</label>
                <input
                  {...register("password")}
                  type={"password"}
                  className="bg-[#36363C] rounded-md h-8 outline-none pl-3 lg:w-2/3 text-sm"
                />
                <small className="text-red-500 mt-2 text-xs">
                  {errors.password?.message}
                </small>
              </div>
              <BlueButton
                text={
                  loading ? (
                    <CircularProgress
                      color="inherit"
                      className="h-10"
                      size={24}
                    />
                  ) : (
                    "Login"
                  )
                }
              />
            </form>
            <small className="text-xs text-[#AAAAAA]">
              Don't have an Account? Tes{" "}
              <Link to={"/register"} className="text-blue-theme">
                Sign Up
              </Link>
            </small>
          </div>
          <div className="lg:flex hidden" style={{ marginTop: "-9rem" }}>
            <img
              src={img}
              alt={img}
              style={{ height: "32rem", width: "50rem" }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
