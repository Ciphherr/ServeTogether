import api from "./axios";

export const registerForEvent = async (data) => {
  const response = await api.post("/register", data, {
    withCredentials: true, // ✅ VERY IMPORTANT
  });
  return response.data;
};
