import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const apiKey = process.env.REACT_APP_NYTIMES_API_KEY;
const newsApiUrl = process.env.REACT_APP_NYTIMES_API_URL;

export const fetchNewsFromNyTimesAPI = createAsyncThunk('news/fetchNewsFromNyTimesAPI', async ({searchQuery, pubDate}) => {
    const newsData = await fetch(`${newsApiUrl}?q=${searchQuery}&page=1&api-key=${apiKey}&pub_date=${pubDate}`);
    return newsData.json();
})

const nyTimesApiSlice = createSlice({
    name: 'news',
    initialState: {
        isLoading: false,
        data: [],
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNewsFromNyTimesAPI.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchNewsFromNyTimesAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.response.docs.map(article => ({
                source: article.source,
                title: article.snippet,
                image: null,
                url: article.web_url,
            }));
        })
        builder.addCase(fetchNewsFromNyTimesAPI.rejected, (state, action) => {
            state.error = true;
        })
    }
})

export default nyTimesApiSlice.reducer;