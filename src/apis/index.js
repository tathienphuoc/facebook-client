import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/api/",
  withCredentials: true,
});

const API = {
  getPosts: async () => instance.get("posts"),
  deletePost: async (postId, userId) =>
    instance.post(`posts/delete`, { postId, userId }),
  likePost: async (postId, userId) =>
    instance.post(`posts/like`, { postId, userId }),
  savePost: async (data) =>
    instance.post("posts", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  updatePost: async (data) =>
    instance.put("posts", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  getComments: async (postId) => instance.get(`comments?postId=${postId}`),
  saveComment: async (data) => instance.post(`comments`, data),
  getUser: async (id) => instance.get(`users/${id}`),
  getUsers: async () => instance.get(`users`),
  login: async (data) => instance.post(`users/login`, data),
  register: async (data) => instance.post(`users/register`, data),
};

export default API;
