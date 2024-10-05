import { baseApi } from "@/services/base-api";
import { configureStore } from "@reduxjs/toolkit";
import privatePassReducer from "./privateReport/privatePassSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    );
  },
  reducer: {
    privatePass: privatePassReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
