import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/register.png";
import BlueButton from "../../component/blue_button";
import axios from "axios";
import { base_url } from "../../api/api_service";
import { Alert, CircularProgress, Collapse } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  let [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(true);
    try {
      let url = `${base_url}/admin/register`;
      const res = await axios.post(url, data);
      setLoading(false);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard", { replace: true });
    } catch (er) {
      setMsg(er.response.data.message);
      setLoading(false);
      setShow(true);
    }
  }
  return (
    <React.Fragment>
      <Collapse in={show}>
        <Alert severity="error">{msg}</Alert>
      </Collapse>
      <div className="px-10 py-10 overflow-hidden text-white">
        <h1 className="text-2xl font-semibold mb-20">Register</h1>
        <div className="flex justify-between">
          <div className="w-full flex flex-col space-y-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 mb-5">
                <label className="mb-3 text-sm">Nama</label>
                <input
                  {...register("name")}
                  type={"text"}
                  className="bg-[#36363C] rounded-md h-8 outline-none pl-3 lg:w-2/3 text-sm"
                />
                <small className="text-red-500 mt-2 text-xs">
                  {errors.name?.message}
                </small>
              </div>
              <div className="grid grid-cols-1 mb-5">
                <label className="mb-3 text-sm">Username</label>
                <input
                  {...register("username")}
                  type={"text"}
                  className="bg-[#36363C] rounded-md h-8 outline-none pl-3 lg:w-2/3 text-sm"
                />
                <small className="text-red-500 mt-2 text-xs">
                  {errors.username?.message}
                </small>
              </div>
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
                <label className="mb-3 text-sm">Password</label>
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
                    "Register"
                  )
                }
              />
            </form>
            <small className="text-xs text-[#AAAAAA]">
              Already have an account?
              <Link to={-1} className="text-blue-theme">
                {" "}
                Sign In
              </Link>
            </small>
          </div>
          <div className="lg:flex hidden">
            <img
              src={img}
              alt={img}
              style={{ height: "26rem", width: "50rem" }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
