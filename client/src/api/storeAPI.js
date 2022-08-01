import axiosClient from "./axiosClient";

const storeAPI = {
  getAll: (params) => {
    const url = "/api/stores";
    return axiosClient.get(url, { params });
  },
  create: (data) => {
    const url = "/api/stores";
    return axiosClient.post(url, data);
  },

  update: (data) => {
    const url = `/api/store/${data.Id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/api/store/${id}`;
    return axiosClient.delete(url);
  },
};

export default storeAPI;
