import axiosClient from "./axiosClient";

const staffAPI = {
  getAll: (params) => {
    const url = "/api/staffs";
    return axiosClient.get(url, { params });
  },

  create: (data) => {
    const url = "/api/staffs";
    return axiosClient.post(url, data);
  },

  update: (data) => {
    const url = `/api/staff/${data.Id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/api/staff/${id}`;
    return axiosClient.delete(url);
  },
};

export default staffAPI;
