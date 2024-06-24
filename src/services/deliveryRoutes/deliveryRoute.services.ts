import {baseApi} from "@/services/base-api";

const deliveryRouteService = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createRoute: builder.mutation<any, any>({
        invalidatesTags: ["DeliveryRoutes"],
        query: (body) => {
          return {
            body,
            method: "POST",
            url: "deliveryRoute",
          };
        },
      }),
      getRoute: builder.query<any, any>({
        providesTags: ["DeliveryRoutes"],
        query: () => {
          return {
            url: "deliveryRoute",
          };
        },
      }),
      getRouteById: builder.query<any, any>({
        providesTags: ["DeliveryRoutes"],
        query: ({id}) => {
          return {
            url: `deliveryRoute/${id}`,
          };
        },
      }),
      removeRoute: builder.mutation<any, any>({
        invalidatesTags: ["DeliveryRoutes"],
        query: ({_id}) => {
          return {
            method: "DELETE",
            url: `deliveryRoute/${_id}`,
          };
        },
      }),
      updateRoute: builder.mutation<any, any>({
        invalidatesTags: ["DeliveryRoutes"],
        query: (body) => {
          return {
            body,
            method: "PUT",
            url: `deliveryRoute/${body._id}`,
          };
        },
      }),
      sortRoute: builder.mutation<any, any>({
        invalidatesTags: ["DeliveryRoutes"],
        query: (body) => {
          return {
            body,
            method: "PUT",
            url: `deliveryRoute/sort/${body._id}`,
          };
        },
      }),
    };
  },
});

export const {
  useCreateRouteMutation,
  useGetRouteQuery,
  useGetRouteByIdQuery,
  useRemoveRouteMutation,
  useUpdateRouteMutation,
  useSortRouteMutation
} = deliveryRouteService;
