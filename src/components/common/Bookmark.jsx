import React from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

const Bookmark = ({ isBookmarked, onAddBookmark, onRemoveBookmark }) => {
  return (
    <div className="p-2 hover:bg-green-200 rounded-full">
      {isBookmarked ? (
        <FaBookmark
          size="1.2em"
          className="cursor-pointer"
          color="blue"
          onClick={onRemoveBookmark}
        />
      ) : (
        <FaRegBookmark
          size="1.2em"
          className="cursor-pointer"
          onClick={onAddBookmark}
        />
      )}
    </div>
  );
};
export default Bookmark;
