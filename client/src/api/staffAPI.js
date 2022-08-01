import axiosClient from "./axiosClient";

const staffAPI = {
  getAll: (params) => {
    const url = "/api/staffs";
    return axiosClient.get(url, { params });
  },
};

export default staffAPI;
