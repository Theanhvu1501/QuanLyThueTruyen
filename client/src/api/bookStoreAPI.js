import axiosClient from "./axiosClient";

const bookStoreAPI = {
  getAll: (params) => {
    const url = "/api/bookstores";
    return axiosClient.get(url, { params });
  },

  create: (data) => {
    const url = "/api/bookstores";
    return axiosClient.post(url, data);
  },

  update: (data) => {
    const url = `/api/bookstore/${data.Id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/api/bookstore/${id}`;
    return axiosClient.delete(url);
  },
};

export default bookStoreAPI;
