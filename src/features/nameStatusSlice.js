import { createSlice } from "@reduxjs/toolkit";

const allStatus =
    typeof window !== "undefined" && window.localStorage.getItem("status")
        ? JSON.parse(window.localStorage.getItem("status") || "")
        : [];

const initialState = {
    allStatus,
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        addStatus: (state, action) => {
            state.allStatus.push(action.payload);
            localStorage.setItem("status", JSON.stringify(state.allStatus));
        },
    },
});

// Action creators are generated for each case reducer function
export const { addStatus } = counterSlice.actions;

export default counterSlice.reducer;
