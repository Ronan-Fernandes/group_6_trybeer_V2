import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import ProductsContainer from '../../components/ProductsContainer';
import SideBar from '../../components/SideBar';
import './style.css';

function Products() {
  const { role } = useSelector((state) => state.userReducer.user);
  const isVisible = useSelector((state) => state.sideBarHideReducer.isVisible);

  return (
    <>
      <Header />
      <div className="main-container ">
        {isVisible && <SideBar />}
        <ProductsContainer />
      </div>
    </>
  );
}

export default Products;
