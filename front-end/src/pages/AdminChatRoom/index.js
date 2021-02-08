import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import ChatPanel from '../../components/ChatPanel';
import { useHistory } from 'react-router-dom';

import './index.css';

const ChatAdmin = (props) => {
  const history = useHistory();

  const activeList = props.dataFromChatAdmin.match.params.id;

  const [chatList, setChatList] = useState([]);
  // const [activeList, setActiveList] = useState('');
  window.socket = window.io('http://localhost:3001', {
    query: {
      clientId: 'Loja',
    },
  });

  window.socket.on('connection', () => {});

  // // Fetch all chats at first render
  useEffect(() => {
    window.socket.emit('getAllMessages');
  }, []);

  window.socket.on('SendAllMessages', (payload) => {
    setChatList(payload.allChats);
  });

  // const handleRedirect = (userId) => setActiveList(userId);

  if (chatList.length < 1) return <h2>Nenhuma conversa por aqui</h2>;
  return (
    <>
      <Header />
      <div className="container-adminChat">
        <button data-testid="back-button" onClick={() => history.push(`/admin/chats`)}> back</button>
        <h3>Loja</h3>
         <ChatPanel userId={activeList} chatUser={'Loja'}/>
      </div>
    </>
  );
};

export default ChatAdmin;