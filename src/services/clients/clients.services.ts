import { baseApi } from "@/services/base-api";
import { ClientType } from "@/services/clients/clientsServicesType";
import { a } from "@storybook/addon-links/dist/index.d-3adcfc00";

const clientsServices = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createClient: builder.mutation<any, any>({
        invalidatesTags: ["Clients"],
        query: (arg) => {
          return {
            body: arg,
            method: "POST",
            url: `clients`,
          };
        },
      }),
      findClients: builder.query<any, any>({
        providesTags: ["Clients"],
        query: () => {
          return {
            url: "clients",
          };
        },
      }),
      getClientById: builder.query<ClientType, { id: string | undefined }>({
        providesTags: ["Clients"],
        query: ({ id }) => {
          return {
            url: `clients/${id}`,
          };
        },
      }),
      removeClientById: builder.mutation<any, any>({
        invalidatesTags: ["Clients"],
        query: ({ id }) => {
          return {
            method: "DELETE",
            url: `clients/${id}`,
          };
        },
      }),
    };
  },
});

export const {
  enhanceEndpoints,
  useCreateClientMutation,
  useFindClientsQuery,
  useGetClientByIdQuery,
  useRemoveClientByIdMutation,
} = clientsServices;
