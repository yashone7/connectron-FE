import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Like = ({ isLiked, onLike, onUnlike, likesCount }) => {
  return (
    <div className="p-2 hover:bg-red-200 rounded-full">
      {isLiked ? (
        <FaHeart
          size="1.2em"
          className="cursor-pointer"
          color="red"
          onClick={onUnlike}
        />
      ) : (
        <FaRegHeart size="1.2em" className="cursor-pointer" onClick={onLike} />
      )}
    </div>
  );
};

export default Like;
