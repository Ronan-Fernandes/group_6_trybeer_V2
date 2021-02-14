import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CheckoutCards.css';
import { removeProduct } from '../store/ducks/productsCart';

const zero = 0;
const two = 2;

const CheckoutCards = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer.cart);

  return (
    <div>
      {Object.keys(cart).length === zero && (
        <h2>Não há produtos no carrinho</h2>
      )}
      {Object.keys(cart).map((keyName, i) => (
        <div key={cart[keyName].name} className="card_checkout my-5">
          <div className="col py-3">
            <div className="row ">

              <h5 className="col" data-testid={`${i}-product-qtd-input`}>
                {cart[keyName].quantity}
              </h5>
              <h4 className="col-10 text-center font-weight-bold" data-testid={`${i}-product-name`}>{cart[keyName].name}</h4>
            </div>
            <div className="row justify-content-between pt-2">

              <h5 className="col" data-testid={`${i}-product-total-value`}>
                R$
            {' '}
                {(cart[keyName].price * cart[keyName].quantity)
                  .toFixed(two)
                  .toString()
                  .replace('.', ',')}
              </h5>
              <h6 className="col" data-testid={`${i}-product-unit-price`}>
                (R$
            {' '}
                {cart[keyName].price.toFixed(two).toString().replace('.', ',')}
                {' '}
            un)
          </h6>
              <div className="col-2">
                <button
                  className="btn_remove border-0 rounded-circle"
                  type="button"
                  data-testid={`${i}-removal-button`}
                  onClick={() => dispatch(removeProduct([keyName]))}
                >
                  X
          </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CheckoutCards;
