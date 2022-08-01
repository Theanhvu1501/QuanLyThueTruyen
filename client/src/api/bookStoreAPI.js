import axiosClient from "./axiosClient";

const bookStoreAPI = {
  getAll: (params) => {
    const url = "/api/bookstores";
    return axiosClient.get(url, { params });
  },
};

export default bookStoreAPI;
