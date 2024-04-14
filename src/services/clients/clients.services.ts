import { baseApi } from "@/services/base-api";
import {
  ClientType,
  ClientTypeFilter,
} from "@/services/clients/clientsServicesType";

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
        query: ({ search, page = 1, pageSize = 10 }) => {
          return {
            url: `clients?page=${page}&pageSize=${pageSize}${
              search ? `&search=${search}` : ""
            }`,
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
      updateClient: builder.mutation<
        any,
        { filter: ClientTypeFilter; id: string | undefined }
      >({
        invalidatesTags: ["Clients"],
        query: ({ filter, id }) => {
          return {
            body: filter,
            method: "PUT",
            url: `clients/${id}`,
          };
        },
      }),
    };
  },
});

export const {
  useCreateClientMutation,
  useFindClientsQuery,
  useGetClientByIdQuery,
  useRemoveClientByIdMutation,
  useUpdateClientMutation,
} = clientsServices;
