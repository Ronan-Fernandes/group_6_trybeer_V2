import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useHistory } from 'react-router-dom';
import './index.css';

const ChatAdmin = () => {
  const history = useHistory();

  const [chatList, setChatList] = useState([]);
  const [activeList, setActiveList] = useState('');
  window.socket = window.io('http://localhost:3001', {
    query: {
      clientId: 'Loja',
    },
  });

  // Fetch all chats at first render
  useEffect(() => {
    window.socket.emit('getAllMessages');
  }, []);

  window.socket.on('SendAllMessages', (payload) => {
    setChatList(payload.allChats);
  });

  const handleRedirect = (userId) => history.push(`/admin/chats/${userId}`);

  if (chatList.length < 1) return <h2>Nenhuma conversa por aqui</h2>;
  return (
    <>
      <Header />
      <div className="container-adminChat">
        <div data-testid="containerChat">
          {chatList.map((chat) => (
            <div key={chat.userId} onClick={() => handleRedirect(chat.userId)}>
              <h2 data-testid="profile-name">{chat.userId}</h2>
              <h2 data-testid="last-message">
                {chat.messages[chat.messages.length - 1].text}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatAdmin;
