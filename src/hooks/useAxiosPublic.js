import axios from "axios";

const axiosPublic = axios.create({ baseURL: "/" });
export default axiosPublic;
