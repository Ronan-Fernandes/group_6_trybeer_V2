import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../store/ducks/orders';

import './ClientOrdersCards.css';

const ClientOrdersCards = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.ordersReducer.orders);
  const { session } = useSelector(
    (state) => state.userReducer,
  );

  // Fetch all orders at first render
  useEffect(() => {
    dispatch(getOrders(session.token));
  }, []);

  // call orders and fetch confirmation from redux
  const { orders, getOrderSuccess } = useSelector((state) => state.ordersReducer);
  let newDate = '';
  let dateAndMonth = '';
  let totalPrice = 0;
  let day = 0;
  let month = 0;
  let dateLength = 0;

  return (
    <>
      {
        getOrderSuccess && orders.map((order, i) => (
          dateLength = order.sale_date.length,
          newDate = new Date(order.sale_date.slice(0, dateLength - 10)),
          day = ((`0${newDate.getDate()}`).slice(-2)), // Add 0 if day <10
          month = ((`0${newDate.getMonth()}${1}`).slice(-2)), // Add 0 if month <10
          dateAndMonth = `${day}/${month}`,
          totalPrice = order.total_price.toFixed(2).toString().replace('.', ','),
          (<Link
            key={ order.id }
            to={ {
              pathname: `orders/${order.id}`,
              state: { // passing props para o child
                date: dateAndMonth,
                totalPrice,
              },
            } }
          >
            <div className="cardContainer" data-testid={ `${i}-order-card-container` }>
              <h3 data-testid={ `${i}-order-number` }>
                Pedido
                {order.id}
              </h3>
              <h3>{order.status}</h3>
              <h3 data-testid={ `${i}-order-date` }>
                {
                dateAndMonth
              }
              </h3>
              <h3 data-testid={ `${i}-order-total-value` }>
                R$
                {totalPrice}
              </h3>
            </div>
          </Link>)
        ))
      }
    </>
  );
};

export default ClientOrdersCards;
