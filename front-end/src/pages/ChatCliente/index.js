import React from 'react';
import { useSelector } from 'react-redux';
import ChatPanel from '../../components/ChatPanel';
import Header from '../../components/Header';

const ChatClient = () => {
  const { email } = useSelector((state) => state.userReducer.user);

  return (
    <>
      <Header />
      <ChatPanel userId={email} chatUser={email} />
    </>
  );
};

export default ChatClient;
