import axiosClient from "./axiosClient";

const customerAPI = {
  getAll: (params) => {
    const url = "/api/customers";
    return axiosClient.get(url, { params });
  },

  create: (data) => {
    const url = "/api/customers";
    return axiosClient.post(url, data);
  },

  update: (data) => {
    const url = `/api/customer/${data.Id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/api/customer/${id}`;
    return axiosClient.delete(url);
  },
};

export default customerAPI;
