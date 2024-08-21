import {baseApi} from "@/services/base-api";

const invoicesService = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getInvoicesById: builder.query<any, any>({
        providesTags: ["Invoices"],
        query: ({id}) => {
          return {
            url: `invoices/${id}`,
          };
        },
      }),

      createInvoice: builder.mutation<any, any>({
        invalidatesTags: ["Invoices"],
        query: (body) => {
          return {
            body,
            method: "POST",
            url: `invoices`,
          };
        }
      }),

      getOrderInvoiceById: builder.query<any, any>({
        providesTags: ["Invoices"],
        query: ({briefcase, order}) => {
          return {
            url: `invoices/receipt/${briefcase}/${order}`,
          };
        },
      }),

      getTotalWeight: builder.query<any, any>({
        providesTags: ["Invoices"],
        query: ({briefcaseId}) => {
          return {
            url: `invoices/totalweight/${briefcaseId}`,
          };
        },
      }),
    };
  },
});

export const {
  useGetInvoicesByIdQuery,
  useCreateInvoiceMutation,
  useGetOrderInvoiceByIdQuery,
  useGetTotalWeightQuery
} = invoicesService;
