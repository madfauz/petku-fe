import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../config/domain";
import axiosClient from "../api/axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "user-slice/register",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${domain}/register`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const login = createAsyncThunk(
  "user-slice/login",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${domain}/login`, {
        email: data.email,
        password: data.password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  "user-slice/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("/users");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const logout = createAsyncThunk(
  "user-slice/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.post("/logout");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const updateProfile = createAsyncThunk(
  "user-slice/updateProfile",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("kontak", data.kontak);
      formData.append("alamat", data.alamat);

      if (data.url_photo) {
        formData.append("image", data.url_photo);
      }

      if (data.role === "dokter") {
        formData.append("pengalaman", data.pengalaman);
        formData.append("nama_klinik", data.nama_klinik);
      }

      const endpoint =
        data.role === "pelanggan"
          ? `/customers/${data.id_user}`
          : `/doctors/${data.id_user}`;

      const response = await axiosClient.patch(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const userSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = "Logout success";
        localStorage.removeItem("token");
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.message = action.payload.message;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("user-slice/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.message = "";
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("user-slice/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          if (
            action.type === getCurrentUser.rejected.type ||
            action.type === logout.rejected.type
          ) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
          }
        },
      );
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
