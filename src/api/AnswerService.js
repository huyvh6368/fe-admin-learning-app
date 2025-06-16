import axiosClient from './axiosClient'
const answerService = {
    // getAll: () => axiosClient.get("/auth"),
    getAll: (id) => {
        console.log("Calling getAll with topicId:", id); // thêm log để kiểm tra
        const params = { questionId: id };
        return axiosClient.get("/answer/all", { params });
    },
    add: (data) => axiosClient.post("/answer/add", data),
    update: (id, data) => axiosClient.put(`/answer/edit/${id}`, data),
    // getById: (id) => axiosClient.get(`/auth/${id}`),
    delete: (id) => axiosClient.delete(`/answer/delete/${id}`),
};
export default answerService;