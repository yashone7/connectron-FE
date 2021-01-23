import React, { useState } from 'react';
import Modal from 'react-modal';
import PostComposer from './PostComposer';
import { connect } from 'react-redux';
import SidebarMenu from '../common/SidebarMenu';
import { modalStyle } from '../common/modalStyle';
import { logout } from '../../redux/actions/authAction';

Modal.setAppElement('#root');
const Sidebar = ({ logout }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const handleModal = () => {
    if (!isModalActive) {
      setIsModalActive(true);
    } else setIsModalActive(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <SidebarMenu handleModal={handleModal} handleLogout={handleLogout} />
      <Modal
        isOpen={isModalActive}
        style={modalStyle}
        //overlayClassName="inset-0 fixed bg-gray-100"
        //className="w-1/3 h-auto"
        onRequestClose={() => handleModal()}
      >
        <div>
          <h1>Please post your message</h1>
          <PostComposer />
        </div>
      </Modal>
    </>
  );
};

export default connect(null, { logout })(Sidebar);
