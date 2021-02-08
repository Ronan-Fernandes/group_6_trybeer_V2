import React from 'react';
import { useSelector } from 'react-redux';
import ChatPanel from '../../components/ChatPanel';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

const ChatClient = () => {
  const { email } = useSelector((state) => state.userReducer.user);
  const { role } = useSelector((state) => state.userReducer.user);
  const isVisible = useSelector((state) => state.sideBarHideReducer.isVisible);

  return (
    <>
      <Header />
      <div className="main-container ">
      {isVisible && <SideBar />}
        <ChatPanel userId={email} chatUser={email} />
      </div>
    </>
  );
};

export default ChatClient;
