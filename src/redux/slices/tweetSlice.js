import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tweets: [],
  isLoading: false,
  error: null,
  singleTweet: {},
  uploading: false,
  message: null,
  meta:null
};
export const tweetReducer = createSlice({
  name: "tweetReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setUploading: (state, action) => {
      state.uploading = action.payload;
      state.error = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    tweetSuccess: (state, { payload }) => {
      state.tweets = payload;
    },
    tweetFail: (state) => {
      state.error = true;
    },
    tweetUser:(state,{payload}) =>{
      const userMan = state.tweets.find((i) => i.author.username === payload.username);
      userMan.author.i_follow = payload.follow
    },
    tweetAdded: (state, { payload }) => {
      state.tweets.unshift(payload);
    },
    tweetDetail: (state, { payload }) => {
      state.singleTweet = payload;
    },
    deletedSuccess: (state, { payload }) => {
      state.tweets = state.tweets.filter((i) => i.id !== payload);
    },
    setMeta:(state, { payload }) => {
      state.meta = payload;
    },
    loadedMore:(state, { payload }) => {
      state.tweets.push(...payload)
    },
    removeMesage: (state, action) => {
      state.message = null;
    },
    likeUnlikeTweet:(state,{payload}) => {
      const tweet = state.tweets.find((i) => i.id === payload.id);
      if (tweet) tweet.like_count = payload.count;
      state.singleTweet.like_count=payload.count
    }
  },
});

export const {
  setLoading,
  setMeta,
  tweetSuccess,
  tweetAdded,
  tweetFail,
  loadedMore,
  deletedSuccess,
  tweetDetail,
  setUploading,
  setMessage,
  removeMesage,
  tweetUser,
  likeUnlikeTweet
  
} = tweetReducer.actions;
export default tweetReducer.reducer;
