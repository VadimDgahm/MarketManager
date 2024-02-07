import { baseApi } from "@/services/base-api";

const catalogServices = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createProduct: builder.mutation<any, any>({
        invalidatesTags: ["Catalog"],
        query: (body) => {
          return {
            body,
            method: "POST",
            url: `catalog`,
          };
        },
      }),
      getCatalog: builder.query<any, any>({
        providesTags: ["Catalog"],
        query: () => {
          return {
            url: "catalog",
          };
        },
      }),
      removeProduct: builder.mutation<any, any>({
        invalidatesTags: ["Catalog"],
        query: ({ id }) => {
          return {
            method: "DELETE",
            url: `catalog/${id}`,
          };
        },
      }),
    };
  },
});

export const {
  useCreateProductMutation,
  useGetCatalogQuery,
  useRemoveProductMutation,
} = catalogServices;
