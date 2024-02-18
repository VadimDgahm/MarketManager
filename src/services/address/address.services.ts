import { baseApi } from "@/services/base-api";
import { ClientType } from "@/services/clients/clientsServicesType";
import { a } from "@storybook/addon-links/dist/index.d-3adcfc00";

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
    };
  },
});

export const { useCreateAddressMutation, useRemoveAddressMutation } =
  addressServices;
