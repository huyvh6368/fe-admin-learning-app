import axiosClient from './axiosClient'
const rankService = {
    // getAll: () => axiosClient.get("/auth"),
    getAll: (pageNo, pageSize) => {
        const params = {
            page: pageNo,
            size: pageSize
        }
        return axiosClient.get("/rank/all", { params });
    },
    findAll: () => {
        return axiosClient.get("/rank/getAll");
    },
    add: (data) => axiosClient.post("/rank/add", data),
    update: (id, data) => axiosClient.put(`/rank/edit/${id}`, data),
};
export default rankService;