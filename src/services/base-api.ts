import { createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from '@/services/base-query-with-reauth';


export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: "baseApi",
  tagTypes: ["Auth", "Clients"],

});
