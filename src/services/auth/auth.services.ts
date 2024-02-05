import { baseApi } from "@/services/base-api";

import { AuthResponse, LoginData } from "./authServicesType";

const authService = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      checkAuth: builder.mutation<AuthResponse, void>({
        query: () => {
          return {
            url: "refresh",
          };
        },
      }),
      login: builder.mutation<AuthResponse, LoginData>({
        query: (body) => {
          return {
            body,
            method: "POST",
            url: "login",
          };
        },
      }),
      logout: builder.mutation<AuthResponse, void>({
        query: () => {
          return {
            method: "POST",
            url: "logout",
          };
        },
      }),
      registration: builder.mutation<AuthResponse, LoginData>({
        query: (body) => {
          return {
            body,
            method: "POST",
            url: "registration",
          };
        },
      }),
    };
  },
});

export const { useLoginMutation, useLogoutMutation, useRegistrationMutation } =
  authService;
