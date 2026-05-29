import axios from "axios";

const API = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_APP_BASE_URL || "http://localhost:5000/api/v1",
=======
  // baseURL:"http://localhost:5000/api/v1",
  
  baseURL: "https://shopmern-1c1d.onrender.com/api/v1",
>>>>>>> a600036f1ab813c77e853d3c64573163ec88e775
});


API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default API;
