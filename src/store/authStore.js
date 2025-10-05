// store/authStore.js
import { create } from "zustand";
import { authAPI } from "@/lib/api";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  // Initialize auth dari localStorage
  initialize: () => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      const userStr = localStorage.getItem("user");

      if (accessToken && userStr) {
        try {
          const decoded = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;

          // Check if token expired
          if (decoded.exp > currentTime) {
            set({
              user: JSON.parse(userStr),
              isAuthenticated: true,
              isLoading: false,
            });
            return;
          }
        } catch (error) {
          console.error("Token decode error:", error);
        }
      }

      set({ isLoading: false });
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { user, accessToken, refreshToken } = response.data;

      // Simpan ke localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      return { success: false, message };
    }
  },

  // Register
  register: async (data, role) => {
    try {
      let response;

      if (role === "vendor") {
        response = await authAPI.registerVendor(data);
      } else {
        response = await authAPI.registerClient(data);
      }

      // Jika vendor, tidak langsung login (pending approval)
      if (role === "vendor") {
        return {
          success: true,
          message: response.message,
          isPending: true,
        };
      }

      // Jika client, langsung login
      const { user, accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      set({
        user,
        isAuthenticated: true,
      });

      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      const errors = error.response?.data?.errors || [];
      return { success: false, message, errors };
    }
  },

  // Logout
  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },

  // Fetch user profile
  fetchProfile: async () => {
    try {
      const response = await authAPI.getProfile();
      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      set({ user });
      return { success: true, user };
    } catch (error) {
      return { success: false, message: "Failed to fetch profile" };
    }
  },
}));

export default useAuthStore;
