import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const apiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
const newsApiUrl = process.env.REACT_APP_GUARDIAN_API_URL;

export const fetchFromTheGuardianApi = createAsyncThunk('guardianNews/fetchFromTheGuardianApi', async ({searchQuery, from, to}) => {
    const newsData = await fetch(`${newsApiUrl}?q=${searchQuery}&page-size=9&page=1&api-key=${apiKey}&format=json&from-date=${from}&to-date=${to}`);
    return newsData.json();
})

const guadianApiSlice = createSlice({
    name: 'guardianNews',
    initialState: {
        isLoading: false,
        data: [],
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFromTheGuardianApi.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchFromTheGuardianApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.response.results.map(article => ({
                source: "The Guardian",
                title: article.webTitle,
                image: null,
                url: article.webUrl,
            }));
        })
        builder.addCase(fetchFromTheGuardianApi.rejected, (state, action) => {
            state.error = true;
        })
    }
})

export default guadianApiSlice.reducer;