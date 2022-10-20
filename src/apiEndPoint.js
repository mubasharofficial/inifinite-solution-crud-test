
import axios from "axios";

// we need to pass the baseURL as an object

const API = axios.create({
  baseURL: "https://brainiot.io/erp/public/api/",
});

export default API;