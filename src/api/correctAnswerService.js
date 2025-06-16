import axiosClient from './axiosClient'
const correctAnswerService = {
    // getAll: () => axiosClient.get("/auth"),
    // getAll: (id) => {
    //     console.log("Calling getAll with topicId:", id); // thêm log để kiểm tra
    //     const params = { topicId: id };
    //     return axiosClient.get("/question/list", { params });
    // },
    add: (data) => axiosClient.post("/correct-answer/add", data),
    // update: (id, data) => axiosClient.put(`/question/edit/${id}`, data),
    // getById: (id) => axiosClient.get(`/auth/${id}`),
    // delete: (id) => axiosClient.delete(`/auth/${id}`),
};
export default correctAnswerService;