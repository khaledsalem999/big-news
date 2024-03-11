import { configureStore } from "@reduxjs/toolkit";
import newsApiSlice from "./slices/newsApiSlice";
import guardianSlice from "./slices/guardianSlice";
import nytimesSlice from "./slices/nytimesSlice";

export const store = configureStore({
    reducer: {
        news: newsApiSlice,
        guardianNews: guardianSlice,
        newYorkTimes: nytimesSlice
    }
})