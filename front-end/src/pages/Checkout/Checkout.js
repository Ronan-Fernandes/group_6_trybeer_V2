import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import CheckoutContainer from '../../components/CheckoutContainer';
import SideBar from '../../components/SideBar';

// import './style.css';

function Checkout() {
  const { role } = useSelector((state) => state.userReducer.user);

  const isVisible = useSelector((state) => state.sideBarHideReducer.isVisible);
  return (
    <>
      <Header />
      <div className="main-container ">
      {isVisible && <SideBar />}
      <CheckoutContainer />
      </div>
    </>
  );
}

export default Checkout;
