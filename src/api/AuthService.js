import axiosClient from './axiosClient'
const authService = {
  // getAll: () => axiosClient.get("/auth"),
  // getById: (id) => axiosClient.get(`/auth/${id}`),
  // create: (data) => axiosClient.post("/auth", data),
  // update: (id, data) => axiosClient.put(`/auth/${id}`, data),
  // delete: (id) => axiosClient.delete(`/auth/${id}`),
  login: (data) => axiosClient.post("/auth/login", data)
};
export default authService;