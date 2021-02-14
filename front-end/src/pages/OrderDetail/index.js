import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesProducts } from '../../store/ducks/salesProducts';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import './style.css';

const zero = 0;

const OrderDetail = (props) => {
  const { role } = useSelector((state) => state.userReducer.user);
  const isVisible = useSelector((state) => state.sideBarHideReducer.isVisible);
  const {
    dataFromOrders: { match, location },
  } = props;
  const {
    params: { id },
  } = match;
  const {
    state: { date, totalPrice },
  } = location;
  const dispatch = useDispatch();

  const { getSalesProductsSuccess, salesProducts } = useSelector(
    (state) => state.salesProductsReducer,
  );
  const { session } = useSelector((state) => state.userReducer);

  // Fetch all products from one sale at first render
  useEffect(() => {
    dispatch(getSalesProducts(session.token, id));
  }, []);

  return (
    <>
      <Header />
      <div className="main-container ">
        {isVisible && <SideBar />}
        <div className="container">
          <h2 className="text-center my-3" data-testid="order-number">
            Pedido {id}
          </h2>
          {getSalesProductsSuccess && (
            <div>
              <div className="row justify-content-around my-3 ">
                <h3 data-testid="order-date">{date}</h3>
                <h3> {salesProducts[0].sale.status}</h3>
              </div>
              {salesProducts.map((product, i) => (
                <div className="cardContainer_orders-details my-3 p-2" key={product.name}>
                  <div className="row justify-content-around">
                    <h3 data-testid={`${i}-product-qtd`}>
                      {`(X ${product.quantity})`}
                    </h3>
                    <h3 data-testid={`${i}-product-name`}>
                      {product.product.name}
                    </h3>
                  </div>
                  <h3 className="text-right" data-testid={`${i}-product-total-value`}>
                    R${' '}
                    {product.sale.total_price
                      .toFixed(zero)
                      .toString()
                      .replace('.', ',')}
                  </h3>
                </div>
              ))}
              <div className="container my-4 d-flex justify-content-end">
                <h3>Total: </h3>
                <h3 data-testid="order-total-value">R$ {totalPrice}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

OrderDetail.propTypes = {
  dataFromOrders: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        date: PropTypes.string,
        totalPrice: PropTypes.string,
      }),
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default OrderDetail;
