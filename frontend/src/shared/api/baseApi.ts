import axios from "axios";
import { config } from "../config";

export const baseApi = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
