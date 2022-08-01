import axiosClient from "./axiosClient";

const customerAPI = {
  getAll: (params) => {
    const url = "/api/customers";
    return axiosClient.get(url, { params });
  },
};

export default customerAPI;
