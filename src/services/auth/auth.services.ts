
import { baseApi } from "@/services/base-api";
import { AuthResponse, LoginData } from "./authServicesType";

const authService = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      login: builder.mutation<AuthResponse, LoginData>({
        query: (body) => {
          return {
            body,
            method: 'POST',
            url: "login",
          };
        },
      }),
      registration: builder.mutation<AuthResponse, LoginData>({
        query: (body) => {
          return {
            body,
            method: 'POST',
            url: "registration",
          };
        },
      }),
      logout: builder.mutation<AuthResponse, void>({
        query: () => {
          return {
            method: 'POST',
            url: "logout",
          };
        },
      }),
      checkAuth: builder.mutation<AuthResponse, void>({
        query: () => {
          return {
            url: "refresh",
          };
        },
      }),
    }}
}
);


export const {useLoginMutation,useLogoutMutation,useRegistrationMutation} = authService