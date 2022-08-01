import axiosClient from "./axiosClient";

const storeAPI = {
  getAll: (params) => {
    const url = "/api/stores";
    return axiosClient.get(url, { params });
  },
};

export default storeAPI;
