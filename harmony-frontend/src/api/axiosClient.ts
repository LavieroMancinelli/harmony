import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://effective-space-fiesta-6944jwqq7v45f54v7-4000.app.github.dev",
    headers: {
        "Conent-Type": "application/json",
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token)
        config.headers.Authorization = 'Bearer ${token}';
    return config;
});

export default axiosClient;