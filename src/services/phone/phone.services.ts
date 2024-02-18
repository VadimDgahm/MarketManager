import { baseApi } from "@/services/base-api";

const phoneServices = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createPhone: builder.mutation<any, any>({
        invalidatesTags: ["Clients"],
        query: ({ idClient, ...arg }) => {
          return {
            body: arg,
            method: "POST",
            url: `phone/${idClient}`,
          };
        },
      }),
      removePhone: builder.mutation<any, any>({
        invalidatesTags: ["Clients"],
        query: ({ idClient, idPhone }) => {
          return {
            body: { idPhone },
            method: "DELETE",
            url: `phone/${idClient}`,
          };
        },
      }),
    };
  },
});

export const { useCreatePhoneMutation, useRemovePhoneMutation } = phoneServices;
