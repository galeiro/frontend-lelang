import axios from "axios";

export let base_url = "https://myapp.com:8000";
export let token = localStorage.getItem("token");
export let headers = {
  headers: { authorization: `Bearer ${token}` },
};

export async function getListPetugas() {
  try {
    let url = `${base_url}/admin/list-officer`;
    let res = await axios.get(url, headers);
    return res.data?.data?.rows;
  } catch (er) {
    console.log(er);
  }
}

export async function getListBarang(pageSize, page) {
  try {
    let url = `${base_url}/barang/all?pageSize=${pageSize}&page=${page}`;
    let res = await axios.get(url, headers);
    return res.data?.data?.rows;
  } catch (er) {
    console.log(er);
  }
}

export async function getDetailBarang(id) {
  try {
    let url = `${base_url}/lelang/schedule/${id}`;
    let res = await axios.get(url, headers);
    return res.data?.data;
  } catch (er) {
    console.log(er);
  }
}

export async function listPenawar(id) {
  try {
    let url = `${base_url}/lelang/history/${id}`;
    let res = await axios.get(url, headers);
    return res?.data?.data;
  } catch (er) {
    console.log(er);
  }
}
