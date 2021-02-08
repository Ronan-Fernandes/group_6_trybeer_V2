import React from 'react';
import { useSelector } from 'react-redux';
import ClientOrdersContainer from '../../components/ClientOrdersContainer';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

const ClientOrders = () => {
  const { role } = useSelector((state) => state.userReducer.user);

  const isVisible = useSelector((state) => state.sideBarHideReducer.isVisible);
  return (
    <>
      <Header />
      <div className="main-container ">
        {isVisible && <SideBar />}
        <ClientOrdersContainer />
      </div>
    </>
  );
};

export default ClientOrders;
