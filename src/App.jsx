import jwtDecode from "jwt-decode";
import { Navigate, Route, Routes } from "react-router-dom";
import { token } from "./api/api_service";
import ProtectRoute from "./component/protect_route";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Detail from "./pages/detail";
import Jadwal from "./pages/jadwal";
import Dashboard from "./pages/list_user";
import Penawaran from "./pages/penawaran";
import Petugas from "./pages/petugas";

export let month = [
  "januari",
  "februari",
  "maret",
  "april",
  "mei",
  "juni",
  "juli",
  "agustus",
  "september",
  "oktober",
  "november",
  "desember",
];

export function changeTitle(title) {
  document.title = title;
}
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={<ProtectRoute children={<Dashboard />} />}
      />
      <Route
        path="/petugas"
        element={<ProtectRoute children={<Petugas />} />}
      />
      <Route path="/jadwal" element={<ProtectRoute children={<Jadwal />} />} />
      <Route path="/detail/:id" element={<ProtectRoute children={<Detail />} />} />
      <Route path="/penawaran/:id" element={<ProtectRoute children={<Penawaran />} />} />

      <Route path="/" element={<Navigate replace to={"/dashboard"} />} />
    </Routes>
  );
}
