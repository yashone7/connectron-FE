import React from 'react';
import { FaHome, FaGlobeAsia, FaBookmark, FaRegUser } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { BsChatSquareDots } from 'react-icons/bs';

const SidebarMenu = (props) => {
  const { handleModal, handleLogout } = props;

  return (
    <div className="h-screen flex-col w-full px-2">
      <div className="justify-center align-center mt-20 ml-5">
        <ul>
          <li>
            <div className="flex p-3 my-2 hover:bg-blue-100 rounded-full">
              <FaHome size={26} />
              <span className="ml-10 text-xl">Home</span>
            </div>
          </li>
          <li>
            <div className="flex p-3 my-2 hover:bg-blue-100 rounded-full">
              <FaGlobeAsia size={26} />
              <span className="ml-10 text-xl">Explore</span>
            </div>
          </li>
          <li>
            <div className="flex p-3 my-2 hover:bg-blue-100 rounded-full">
              <IoIosNotifications size={26} />
              <span className="ml-10 text-xl">Notifications</span>
            </div>
          </li>
          <li>
            <div className="flex p-3 my-2 hover:bg-blue-100 rounded-full">
              <BsChatSquareDots size={26} />
              <span className="ml-10 text-xl">Messages</span>
            </div>
          </li>
          <li>
            <div className="flex p-3 my-2 hover:bg-blue-100 rounded-full">
              <FaBookmark size={26} />
              <span className="ml-10 text-xl">Bookmarks</span>
            </div>
          </li>
          <li>
            <div className="flex p-3 my-2 hover:bg-blue-100 rounded-full">
              <FaRegUser size={26} />
              <span className="ml-10 text-xl">Profile</span>
            </div>
          </li>
          <li>
            <div className="flex p-3 my-2">
              <button
                className="button is-info is-rounded"
                onClick={() => handleModal()}
              >
                Post a Message
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div className="">
        <button className="button is-rounded" onClick={() => handleLogout()}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
