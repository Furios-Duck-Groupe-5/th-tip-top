// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://pre-prod.dsp5-archi-o23-15m-g5.fr/api/", // Your backend URL
});

// Request interceptor for adding the access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) throw new Error("Refresh token is missing.");

        // Call /refresh-token endpoint
        const { data } = await axios.post("/refresh-token", { refreshToken });

        // Save the new access token
        localStorage.setItem("accessToken", data.accessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Optionally log the user out
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
