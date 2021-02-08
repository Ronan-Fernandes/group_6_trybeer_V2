import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import FormClientProfile from '../../components/FormClientProfile';
import SideBar from '../../components/SideBar';

const ClientProfile = () => {
  const { role } = useSelector((state) => state.userReducer.user);
  const isVisible = useSelector((state) => state.sideBarHideReducer.isVisible);

  return (
    <div>
      <Header />
      <div className="main-container ">
        {isVisible && <SideBar />}
        <FormClientProfile />
      </div>
    </div>
  );
};

export default ClientProfile;
