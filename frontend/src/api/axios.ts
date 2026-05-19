import axios from 'axios';

const baseAPIurl = import.meta.env.VITE_API_URL;

console.log("Connecting at: ", import.meta.env);

const api = axios.create({
    baseURL: baseAPIurl
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("AccountToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
},
(error) => {
    return Promise.reject(error);
})

export default api;