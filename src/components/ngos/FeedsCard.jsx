import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFeeds } from '../../redux/actions/feedAction';

const FeedsCard = ({ feeds, getFeeds }) => {
  useEffect(() => {
    getFeeds();
  }, [getFeeds]);

  return (
    feeds !== null &&
    feeds.length > 0 &&
    feeds.map((b) => (
      <Link
        to={{ pathname: `/feeds/${b._id}`, state: b }}
        className="text-gray-800"
        key={b._id}
      >
        <div className="p-2 m-2 shadow-md shadow-rounded">
          <p className="text-sm my-2 mx-1">Name: {b.name}</p>
          <p className="text-sm my-2 mx-1">phone: {b.phone}</p>
          <p className="text-sm my-2 mx-1">message: {b.message}</p>
        </div>
      </Link>
    ))
  );
};
const mapStateToProps = (state) => ({
  feeds: state.feedReducer.feeds,
});

export default connect(mapStateToProps, { getFeeds })(FeedsCard);
