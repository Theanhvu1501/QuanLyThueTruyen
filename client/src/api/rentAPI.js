import axiosClient from "./axiosClient";

const rentAPI = {
  getAll: (params) => {
    const url = "/api/rents";
    return axiosClient.get(url, { params });
  },

  create: (data) => {
    const url = "/api/rents";
    return axiosClient.post(url, data);
  },

  update: (data) => {
    const url = `/api/rent/${data.Id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/api/rent/${id}`;
    return axiosClient.delete(url);
  },
};

export default rentAPI;
