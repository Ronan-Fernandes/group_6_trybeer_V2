import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesProducts } from '../../store/ducks/salesProducts';
import UserService from '../../services/trybeerAPI';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import './style.css';

const resStatus = 200;
const two = 2;

const OrderDetail = (props) => {
  const {
    dataFromOrders: {
      match: {
        params: { id },
      },
    },
  } = props;
  const dispatch = useDispatch();
  const { getSalesProductsSuccess, salesProducts } = useSelector(
    (state) => state.salesProductsReducer,
  );
  const { session } = useSelector((state) => state.userReducer);
  const isVisible = useSelector((state) => state.sideBarHideReducer.isVisible);

  // local state of sale status
  const [saleStatus, setSaleStatus] = useState('Carregando...');

  // // Fetch all products from one sale at first render
  useEffect(() => {
    dispatch(getSalesProducts(session.token, id));
  }, []);

  useEffect(() => {
    if (salesProducts[0] !== undefined) {
      setSaleStatus(salesProducts[0].sale.status);
    }
  }, [salesProducts]);

  const saleId = id;

  // Update the sale (define by saleId) status
  const handleClick = (status) => {
    UserService.updateStatusSale(session.token, status, saleId).then(
      (response) => {
        if (response.status === resStatus) {
          setSaleStatus(status);
        }
      },
    );
  };

  // const newDate = '';
  // const dateAndMonth = '';
  if (!getSalesProductsSuccess) return <h2>Carregando...</h2>;
  return (
    <>
      <Header />
      <div className="main-container">
        {isVisible && <SideBar />}
        <div className="container">
          <div className="container row mt-4">
            <h3 data-testid="order-number">Pedido {saleId} </h3>
            <h3 className="font-italic font-weight-bold">
              {' '}
              {`: ${saleStatus}`}
            </h3>
          </div>
          {getSalesProductsSuccess && (
            <div>
              {salesProducts.map((product, i) => (
                <div className="cardContainer row justify-content-between p-2" key={product.id}>
                  <h3 data-testid={`${i}-product-qtd`}>
                    {`(X${product.quantity})`}
                  </h3>
                  <h3 data-testid={`${i}-product-name`}>
                    {`${product.product.name}`}
                    
                  </h3>
                  <h3 data-testid={`${i}-product-total-value`} >
                    R${' '}
                    {product.product.price
                      .toFixed(two)
                      .toString()
                      .replace('.', ',')}
                  </h3>
                </div>
              ))}
              <h3 data-testid="order-total-value" className="mt-2 text-right">
                Total R$ {salesProducts[0].sale.total_price}
              </h3>
            </div>
          )}
          <div className="container order-admin_button-container">
          <button
          className="btn btn-block btn-order-admin mt-5"
            type="button"
            style={{ display: saleStatus === 'Pendente' ? 'block' : 'none' }}
            data-testid="mark-as-prepared-btn"
            onClick={() => handleClick('Preparando')}
          >
            Preparar pedido
          </button>
          <button
          className="btn btn-block btn-order-admin mt-3"

            type="button"
            style={{ display: saleStatus !== 'Entregue' ? 'block' : 'none' }}
            data-testid="mark-as-delivered-btn"
            onClick={() => handleClick('Entregue')}
          >
            Marcar como entregue
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

OrderDetail.propTypes = {
  dataFromOrders: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default OrderDetail;
