import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesProducts } from '../../store/ducks/salesProducts';
import UserService from '../../services/trybeerAPI';

import Header from '../../components/Header';

const OrderDetail = (props) => {
  const dispatch = useDispatch();
  const { getSalesProductsSuccess, salesProducts } = useSelector(
    (state) => state.salesProductsReducer,
  );
  const { session } = useSelector((state) => state.userReducer);

  // local state of sale status
  const [saleStatus, setSaleStatus] = useState('Carregando...');

  // // Fetch all products from one sale at first render
  useEffect(() => {
    dispatch(
      getSalesProducts(session.token, props.dataFromOrders.match.params.id),
    );
  }, []);

  useEffect(() => {
    if (salesProducts[0] !== undefined) {
      setSaleStatus(salesProducts[0].sale.status);
    }
  }, [salesProducts]);

  // Update the sale (define by saleId) status
  const handleClick = (status) => {
    UserService.updateStatusSale(session.token, status, saleId).then(
      (response) => {
        if (response.status === 200) {
        }
      },
    );
    setSaleStatus(status);
  };

  const newDate = '';
  const dateAndMonth = '';
  const saleId = props.dataFromOrders.match.params.id;
  if (!getSalesProductsSuccess) return <h2>Carregando...</h2>;
  return (
    <>
      <Header />
      <div>
        <h3 data-testid="order-number">
          Pedido
          {saleId}
        </h3>
        <h3>{saleStatus}</h3>
      </div>
      {getSalesProductsSuccess && (
        <div>
          {salesProducts.map((product, i) => (
            <div className="cardContainer" key={ product.id }>
              <h3 data-testid={ `${i}-product-qtd` }>
                {' '}
                {product.quantity}
                {' '}
                -
                {' '}
              </h3>

              <h3 data-testid={ `${i}-product-name` }>
                {' '}
                {product.product.name}
              </h3>
              <h3 data-testid={ `${i}-product-total-value` }>
                R$
                {' '}
                {product.product.price.toFixed(2).toString().replace('.', ',')}
              </h3>
            </div>
          ))}
          <h3 data-testid="order-total-value">
            R$
            {' '}
            {salesProducts[0].sale.total_price}
          </h3>
        </div>
      )}
      <button
        style={ { display: saleStatus === 'Pendente' ? 'block' : 'none' } }
        data-testid="mark-as-prepared-btn"
        onClick={ () => handleClick('Preparando') }
      >
        Preparar pedido
      </button>
      <button
        style={ { display: saleStatus !== 'Entregue' ? 'block' : 'none' } }
        data-testid="mark-as-delivered-btn"
        onClick={ () => handleClick('Entregue') }
      >
        Marcar como entregue
      </button>
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
