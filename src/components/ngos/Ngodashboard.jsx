import React, { Fragment, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import client from "../../feathers/feathersClient";
import { ADD_DATA_TO_FEED } from "../../redux/actions/types/actionTypes";
import Sidebar from "./Sidebar";
import { getFeeds } from "../../redux/actions/feedAction";
import PostContainer from "./PostContainer";
import { fetchLikesByUser } from "../../redux/actions/likeAction";
import { fetchBookmarksByUser } from "../../redux/actions/bookmarkAction";

const feedService = client.service("feeds");

const Ngodashboard = ({
  isAuthenticated,
  user,
  getFeeds,
  fetchLikesByUser,
  fetchBookmarksByUser,
}) => {
  useEffect(() => {
    getFeeds();
  }, [getFeeds]);

  useEffect(() => {
    if (user) {
      fetchLikesByUser(user._id);
      fetchBookmarksByUser(user._id);
    }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    feedService.on("created", (data) => {
      dispatch({ type: ADD_DATA_TO_FEED, payload: data });
    });
    return () => feedService.removeListener("created");
  });

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (isAuthenticated) {
    if (user.role !== "ngo" && user.role !== "individual") {
      return <Redirect to="/login" />;
    }
  }
  // always widths and height should be mobile first then we can override at large breakpoints
  // The columns functionality is for prototype purpose but for production it is advisable to
  // use tailwind css.
  return (
    <Fragment>
      <div className="columns is-hidden-mobile ">
        <div className="column is-3 bg-redx-100 border-solid border-1">
          <Sidebar />
        </div>
        <div className="column is-5 bg-bluex-100 border-soild border-1">
          <PostContainer />
        </div>
        <div className="column is-4 bg-greenx-100 border-solid border-1">
          test
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user,
});

export default connect(mapStateToProps, {
  getFeeds,
  fetchLikesByUser,
  fetchBookmarksByUser,
})(Ngodashboard);
