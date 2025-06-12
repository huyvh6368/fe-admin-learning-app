import axiosClient from './axiosClient'
const TopicService = {
    // getAll: () => axiosClient.get("/auth"),
    getAll: (pageNo, pageSize) => {
        const params = {
            page: pageNo,
            size: pageSize
        }
        return axiosClient.get("/topic/all", { params });
    },
    add: (data) => axiosClient.post("/topic/add", data),
    update: (id, data) => axiosClient.put(`/topic/edit/${id}`, data),
    // getById: (id) => axiosClient.get(`/auth/${id}`),
    // delete: (id) => axiosClient.delete(`/auth/${id}`),
};
export default TopicService;