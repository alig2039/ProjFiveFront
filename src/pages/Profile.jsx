import React, { useEffect, useRef, useState } from "react";
import { userFollow, userProfile } from "../redux/asyncActions/UserAsync";
import { useDispatch, useSelector } from "react-redux";
import Second from "../components/Second";
import Moment from "moment";
import useUserInfo from "../hooks/useUserInfo";
import { AiOutlineSchedule, AiOutlineSmile } from "react-icons/ai";
import { useParams } from "react-router-dom";
import TweetHeader from "../components/tweetComp/tweetHeader";
import Viewer from "react-viewer";
import ClipLoader from "react-spinners/ClipLoader";
import { tweet_specific_user } from "../redux/asyncActions/TweetAsync";
import TweetPostCard from "../components/tweetComp/TweetPostCard";
import { removeMesage } from "../redux/slices/tweetSlice";
import AlertMessage from "../components/alertMessage";
import UserEditModal from "../components/UserEditModal";

const Profile = () => {
  const { username } = useParams();
  const { user: authUser } = useUserInfo();
  const [showUserModal, setShowUserModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [covervisible, setCoverVisible] = useState(false);
  const dispatch = useDispatch();
  const userIn = useSelector((state) => state.userReducer);
  const tweetsInfo = useSelector((state) => state.tweetReducer);
  const tweets = tweetsInfo.tweets;
  const message = tweetsInfo.message;
  const userprofile = userIn.profileUser;

  message &&
    setTimeout(() => {
      dispatch(removeMesage());
    }, 3000);
  useEffect(() => {
    dispatch(userProfile(username));
    dispatch(tweet_specific_user(username));
  }, []);

  return (
    <div>
      <Second>
        {message && (
          <AlertMessage
            removeMesage={removeMesage}
            dispatch={dispatch}
            message={message}
          />
        )}

        {userIn.isLoading ? (
          <span className="d-flex justify-content-center mt-4">
            <ClipLoader color="#f44" loading={true} size={23} />
          </span>
        ) : (
          <>
            <TweetHeader headerName="profile" />
            <div style={{ position: "relative" }}>
              <img
                onClick={() => setCoverVisible(true)}
                src={userprofile?.cover_image}
                alt="profile image"
                className="cover-image"
              />

              <img
                onClick={() => setVisible(true)}
                src={userprofile?.avatar}
                alt="profile image"
                className="rounded-circle profile-image"
              />
              {showUserModal && (
                <UserEditModal
                  user={authUser}
                  setShowUserModal={setShowUserModal}
                />
              )}
              <Viewer
                visible={visible}
                onClose={() => {
                  setVisible(false);
                }}
                images={[{ src: userprofile?.avatar, alt: "img" }]}
              />
             
              <Viewer
                visible={covervisible}
                onClose={() => {
                  setCoverVisible(false);
                }}
                images={[{ src: userprofile?.cover_image, alt: "img" }]}
              />
              {/* editprofile or follow button section depending on the user */}
              {authUser?.email === userprofile?.email ? (
                <div className="follow-or-edit">
                  <button
                    className="link-tweet"
                    type="button"
                    data-toggle="modal"
                    data-target="#userModal"
                  >
                    Edit Profile
                  </button>

                  <UserEditModal user={userprofile} modalId="userModal" />
                </div>
              ) : (
                <div className="follow-or-edit">
                  <button className="mx-2 btn-outline">
                    <i className="icon">
                      <AiOutlineSmile />
                    </i>
                  </button>
                {
                  userprofile?.i_follow?
                  <button
                  onClick={() => dispatch(userFollow(userprofile.username))}
                  className="link-tweet"
                >
                  Unfollow
                </button>
                  :<button
                  onClick={() => dispatch(userFollow(userprofile.username))}
                  className="link-tweet"
                >
                  Follow
                </button>}
                </div>
              )}
            </div>

            <div className="user-info">
              <p>
                {userprofile?.username} <br />
                <span className="side-name">@{userprofile?.nickname}</span>
              </p>
              <p>
                {userprofile?.bio}
                <span className="side-name">
                  <i className="tweetIcons">
                    <AiOutlineSchedule />
                  </i>
                  <span className="mx-2">
                    joined
                    {Moment(userprofile?.date_joined).format("MMMM Do YYYY")}
                  </span>
                </span>
              </p>
              <div className="d-flex">
                <FollowInfo number={userprofile?.followers} followinfo="followers" />
                <FollowInfo number={userprofile?.following} followinfo="following" />
              </div>
            </div>
          </>
        )}

        {tweets.map((tweet) => (
          <TweetPostCard
            user={authUser}
            dispatch={dispatch}
            tweet={tweet}
            key={tweet.id}
          />
        ))}
      </Second>
      <div></div>
    </div>
  );
};

export default Profile;

const FollowInfo = ({ number, followinfo }) => {
  return (
    <div className="d-flex">
      <span className="bold-text">{number}</span>
      <span className="mx-2 side-name">{followinfo}</span>
    </div>
  );
};
