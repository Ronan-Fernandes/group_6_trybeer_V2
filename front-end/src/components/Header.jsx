import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import hamburger from '../images/hamburger.png';
import { changeVisibility } from '../store/ducks/sideBarHide';
import SideBar from './SideBar';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const [sidebarVisible, setsidebarVisible] = useState(false);
  let headTitle = 'Chat';
  const title = {
    '/profile': 'Meu perfil',
    '/checkout': 'Finalizar Pedido',
    '/orders': 'Meus Pedidos',
    '/admin/orders': 'Os Pedidos',
    '/login': 'TryBeer',
    '/products': 'TryBeer',
    '/chat': 'Chat',
    '/admin/chats': 'Chat',

  };
  const handleClick = () => {
    dispatch(changeVisibility(!isVisible));
  };

  const isVisible = useSelector(
    (state) => state.sideBarHideReducer.isVisible,
  );

  const { role } = useSelector((state) => state.userReducer.user);

  if (title[location.pathname] !== undefined) headTitle = title[location.pathname];
  return (
    <div>
      <div className="headerContainer">
        <button className="hamburger_btn"type="button" data-testid="top-hamburguer" onClick={() => handleClick()}>
          <img className="hamburger_img m-2" src={hamburger} alt="test" height="50px" />
        </button>
        <div className="headTitleContainer">
          <h1 data-testid="top-title">{headTitle}</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
