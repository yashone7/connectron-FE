import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  FaCommentAlt,
  FaRegCommentAlt,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import EditorBody from './EditorBody';
import { addLike, removeLike } from '../../redux/actions/likeAction';
import Like from '../common/Like';
import Bookmark from '../common/Bookmark';
import _ from 'lodash';
import {
  addBookmark,
  removeBookmark,
} from '../../redux/actions/bookmarkAction';
import Comment from '../common/Comment';
import Modal from 'react-modal';
import { modalStyleForReply } from '../common/modalStyle';

const PostContainer = ({
  feeds,
  addLike,
  user,
  removeLike,
  likesByUser,
  bookmarksByUser,
  addBookmark,
  removeBookmark,
}) => {
  const checkLike = (feedId) => {
    return _.includes(likesByUser, feedId);
  };

  const checkBookmark = (feedId) => {
    return _.includes(bookmarksByUser, feedId);
  };

  const [isModalActive, setIsModalActive] = useState(false);

  const handleModal = () => {
    if (!isModalActive) {
      setIsModalActive(true);
    } else setIsModalActive(false);
  };

  return (
    <>
      {feeds !== null &&
        feeds.length > 0 &&
        feeds.map((feed) => (
          <div
            className="block border-solid border rounded-sm p-4 my-2"
            key={feed._id}
          >
            <div className="flex">
              <figure className="image is-32x32">
                <img
                  className="is-rounded"
                  src={feed.user.avatar}
                  alt="avatar"
                />
              </figure>
              <div className="px-1 mx-1">
                <p className="text-lg">{feed.user.name}</p>
                <small>
                  <Link to={`/${feed.user.usertag}`}>{feed.user.usertag}</Link>
                </small>
              </div>
            </div>
            <div className="mt-1 py-1 plx-10 ml-10 text-md">
              <EditorBody data={feed.data} />
            </div>
            <div className="flex justify-around mt-2">
              <Like
                isLiked={checkLike(feed._id)}
                onLike={() => addLike(feed._id, user._id)}
                onUnlike={() => removeLike(feed._id, user._id)}
                //likesCount={likesByUser.length}
              />
              <div className="p-2 hover:bg-blue-200 rounded-full">
                <FaRegCommentAlt
                  size="1.2em"
                  className="cursor-pointer"
                  onClick={() => setIsModalActive(true)}
                />
                <Modal
                  isOpen={isModalActive}
                  style={modalStyleForReply}
                  onRequestClose={() => handleModal()}
                >
                  <Comment usertag={feed.usertag} />
                </Modal>
              </div>
              <Bookmark
                isBookmarked={checkBookmark(feed._id)}
                onAddBookmark={() => addBookmark(feed._id, user._id)}
                onRemoveBookmark={() => removeBookmark(feed._id, user._id)}
              />

              <div className="p-2 hover:bg-blue-200 rounded-full">
                <FiMapPin size="1.2em" className="cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  feeds: state.feedReducer.feeds,
  user: state.authReducer.user,
  likesByUser: state.likeReducer.likesByUser,
  bookmarksByUser: state.bookmarkReducer.bookmarksByUser,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addBookmark,
  removeBookmark,
})(PostContainer);
