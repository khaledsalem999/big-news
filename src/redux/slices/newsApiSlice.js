import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const apiKey = process.env.REACT_APP_NEWS_API_KEY;
const newsApiUrl = process.env.REACT_APP_NEWS_API_URL;

export const fetchFromNewsApi = createAsyncThunk('news/fetchFromNewsApi', async ({domainsList,searchQuery,from,to}) => {
    const newsData = await fetch(`${newsApiUrl}?q=${searchQuery}&pageSize=9&page=1&apiKey=${apiKey}&domains=${domainsList}&from=${from}&to=${to}`);
    return newsData.json();
})

const newsApiSlice = createSlice({
    name: 'news',
    initialState: {
        isLoading: false,
        data: [],
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFromNewsApi.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchFromNewsApi.fulfilled, (state, action) => {
            state.isLoading = false;
            action.payload.articles ? state.data = action.payload.articles.map(article => ({
                source: article.source.name,
                title: article.title,
                image: article.urlToImage,
                url: article.url,
            })) : state.error = true;
        })
        builder.addCase(fetchFromNewsApi.rejected, (state, action) => {
            state.error = true;
        })
    }
})

export default newsApiSlice.reducer;