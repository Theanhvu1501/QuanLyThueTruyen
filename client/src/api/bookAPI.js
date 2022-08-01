import axiosClient from "./axiosClient";

const bookAPI = {
  getAll: (params) => {
    const url = "/api/books";
    return axiosClient.get(url, { params });
  },

  create: (data) => {
    const url = "/api/books";
    return axiosClient.post(url, data);
  },

  update: (data) => {
    const url = `/api/book/${data.Id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/api/book/${id}`;
    return axiosClient.delete(url);
  },
};

export default bookAPI;
