import axios from "axios";

export const instance = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    key: import.meta.env.VITE_API_KEY_YOON,
  },
});
