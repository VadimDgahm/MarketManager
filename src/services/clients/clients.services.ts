import { baseApi } from "@/services/base-api";

const clientsServices = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      findClients: builder.query<any, any>({
        providesTags: ["Clients"],
        query: () => {
          return {
            url: "clients",
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

export const { useFindClientsQuery, useRemoveClientByIdMutation } =
  clientsServices;
