import axios from "axios";
const host = `${import.meta.env.VITE_SPRING_API_URL}/api/board`;
export const postAdd = async (board: FormData) => {
    const res = await axios.post(`${host}`, board);
    return res.data;
}
export const getList = async () => {
    const res = await axios.get(`${host}/list`);
    return res.data;
}
export const getOne = async (no: number) => {
    const res = await axios.get(`${host}/${no}`);
    return res.data;
}
export const deleteOne = async (no: number) => {
    const res = await axios.delete(`${host}/${no}`);
    return res.data;
}
export const putOne  = async (no: number, board: FormData) => {
    const res = await axios.put(`${host}/${no}`, board);
    return res.data;
}