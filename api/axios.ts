import axios from "axios";

const instance = axios.create({
  baseURL: "https://explore-macedonia-app.onrender.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default instance;
