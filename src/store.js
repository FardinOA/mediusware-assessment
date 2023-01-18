import { configureStore } from "@reduxjs/toolkit";
import nameStatusSlice from "./features/nameStatusSlice";

export const store = configureStore({
    reducer: {
        allStatus: nameStatusSlice,
    },
});
