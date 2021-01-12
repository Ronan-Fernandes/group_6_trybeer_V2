import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';

const ChatAdmin = () => {
  window.socket = window.io('http://localhost:3001', {
    query: {
      clientId: 'admin',
    },
  });

  window.socket.on('connection', () => {});

  // // Fetch all chats at first render
  useEffect(() => {
    console.log('page loaded');
    window.socket.emit('getAllMessages');
  }, []);

  window.socket.on('SendAllMessages', (payload) => {
    console.log(
      ' allMessages received inside admin chat list: ',
      payload.allChats,
    );
    setChatList(payload.allChats);
  });

  const [chatList, setChatList] = useState([]);
  if (chatList.length < 1) return <h2>Nenhuma conversa por aqui</h2>;
  return (
    <>
      <Header />
      <h1>Admin Chat List</h1>
      <div data-testid="containerChat">
        {chatList.map((chat) => (
          <>
            <h2 data-testid="profile-name">{chat.userId}</h2>
            <h2 data-testid="last-message">{chat.messages[chat.messages.length-1].text}</h2>
          </>
        ))}
      </div>
    </>
  );
};

export default ChatAdmin;
