import axios from "axios";

const axiosSecure = axios.create({ baseURL: "/" });
export default axiosSecure;
