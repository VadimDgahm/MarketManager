import { baseApi } from "@/services/base-api";

const addressServices = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createAddress: builder.mutation<any, any>({
        invalidatesTags: ["Clients"],
        query: ({ idClient, ...arg }) => {
          return {
            body: arg,
            method: "POST",
            url: `address/${idClient}`,
          };
        },
      }),
      removeAddress: builder.mutation<any, any>({
        invalidatesTags: ["Clients"],
        query: ({ idAddress, idClient }) => {
          return {
            body: { idAddress },
            method: "DELETE",
            url: `address/${idClient}`,
          };
        },
      }),
      updateAddress: builder.mutation<any, any>({
        invalidatesTags: ["Clients"],
        query: ({ idClient, ...body }) => {
          return {
            body,
            method: "PUT",
            url: `address/${idClient}`,
          };
        },
      }),
    };
  },
});

export const {
  useCreateAddressMutation,
  useRemoveAddressMutation,
  useUpdateAddressMutation,
} = addressServices;
