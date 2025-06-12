import axiosClient from './axiosClient'
const levelService = {
    // getAll: () => axiosClient.get("/auth"),
    getAll: (pageNo, pageSize) => {
        const params = {
            page: pageNo,
            size: pageSize
        }
        return axiosClient.get("/level/all", { params });
    },
    findAll: () => {
        return axiosClient.get("/level/getAll");
    },
    add: (data) => axiosClient.post("/level/add", data),
    // getById: (id) => axiosClient.get(`/auth/${id}`),

    update: (id, data) => axiosClient.put(`/level/edit/${id}`, data),
    // delete: (id) => axiosClient.delete(`/auth/${id}`),
};
export default levelService;