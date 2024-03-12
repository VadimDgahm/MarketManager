import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

export const API_URL = "http://localhost:5000/";
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
});

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            url: "refresh",
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          debugger;
          result = await baseQuery(args, api, extraOptions);
        } else {
          window.location.href = "/login";
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
