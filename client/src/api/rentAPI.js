import axiosClient from "./axiosClient";

const rentAPI = {
  getAll: (params) => {
    const url = "/api/rents";
    return axiosClient.get(url, { params });
  },
};

export default rentAPI;
