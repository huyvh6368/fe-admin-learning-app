import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api", // đổi thành URL thật
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // nếu dùng cookie
});

// Interceptor request
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor response
axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Xử lý lỗi tập trung
        if (error.response && error.response.status === 401) {
            // redirect hoặc xử lý khi hết hạn token
            console.error("Không có quyền truy cập");
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
