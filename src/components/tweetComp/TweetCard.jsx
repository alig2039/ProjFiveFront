import React, { useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import { useSelector, useDispatch } from "react-redux";
import { load_tweet } from "../../redux/asyncActions/TweetAsync";
import ClipLoader from "react-spinners/ClipLoader";

import TweetPostCard from "./TweetPostCard";
const TweetCard = () => {
  const tweetsInfo = useSelector((state) => state.tweetReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_tweet());
  }, []);

  return tweetsInfo && tweetsInfo.isLoading ? (
    <span className="d-flex justify-content-center mt-4">
      <ClipLoader color="#f44" loading={true} size={23} />
    </span>
  ) : (
    tweetsInfo.tweets.map((tweet) => (
      <TweetPostCard tweet={tweet} key={tweet.id} />
    ))
  );
};

export default TweetCard;
