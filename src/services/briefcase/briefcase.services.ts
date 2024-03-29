import { baseApi } from "@/services/base-api";

const briefcaseService = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createBriefcase: builder.mutation<any, any>({
        invalidatesTags: ["Briefcase"],
        query: (body) => {
          return {
            body,
            method: "POST",
            url: "briefcase",
          };
        },
      }),
      createOrderClient: builder.mutation<any, any>({
        invalidatesTags: ["Briefcase"],
        query: ({ body, id }) => {
          return {
            body,
            method: "POST",
            url: `briefcase/${id}`,
          };
        },
      }),
      getBriefcase: builder.query<any, any>({
        providesTags: ["Briefcase"],
        query: () => {
          return {
            url: "briefcase",
          };
        },
      }),
      getBriefcaseById: builder.query<any, any>({
        providesTags: ["Briefcase"],
        query: ({ id }) => {
          return {
            url: `briefcase/${id}`,
          };
        },
      }),
      removeBriefcase: builder.mutation<any, any>({
        invalidatesTags: ["Briefcase"],
        query: ({ id }) => {
          return {
            method: "DELETE",
            url: `briefcase/${id}`,
          };
        },
      }),
      removeOrder: builder.mutation<any, any>({
        invalidatesTags: ["Briefcase"],
        query: ({ id, orderId }) => {
          return {
            method: "DELETE",
            url: `briefcase/${id}/orders/${orderId}`,
          };
        },
      }),
    };
  },
});

export const {
  useCreateBriefcaseMutation,
  useCreateOrderClientMutation,
  useGetBriefcaseByIdQuery,
  useGetBriefcaseQuery,
  useRemoveBriefcaseMutation,
  useRemoveOrderMutation,
} = briefcaseService;
