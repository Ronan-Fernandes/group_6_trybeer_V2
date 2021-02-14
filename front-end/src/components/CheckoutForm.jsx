import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { loadInitCart } from '../store/ducks/productsCart';
import { postOrder } from '../store/ducks/orders';
import { deleteFromLocalStorage } from '../services/localStorage';

const CheckoutForm = ({ total }) => {
  const zero = 0;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer.cart);

  const { user, session } = useSelector((state) => state.userReducer);

  const postOrderSuccess = useSelector(
    (state) => state.ordersReducer.postOrderSuccess,
  );

  const [address, setAddress] = useState({
    street: '',
    number: '',
  });

  const handleClick = () => {
    dispatch(loadInitCart({}));
    dispatch(
      postOrder(
        cart,
        user.id,
        user.email,
        total,
        address.street,
        address.number,
        session.token,
      ),
    );
    deleteFromLocalStorage('cart');
  };

  return (
    <div className="container">
          <h3 className="mb-3">Endereço</h3>
        <form className="form-inline">
        <div class="form-group">
          <label class="col-sm-2 col-form-label-lg" htmlFor="street">
            Rua:
            </label>
            <input
            className="form-control mb-2 mr-sm-2" 
              name="street"
              type="text"
              data-testid="checkout-street-input"
              placeholder="Digit seu rua"
              value={address.street}
              onChange={(event) => setAddress({
                ...address,
                [event.target.name]: event.target.value,
              })}
            />
          </div>
          <label class="col-sm-3 col-form-label-lg" htmlFor="number">
            Número da casa:
            </label>
            <input
            className="form-control mb-2 mr-sm-2" 

              name="number"
              type="number"
              data-testid="checkout-house-number-input"
              placeholder="Digit o numero de sua casa"
              value={address.number}
              onChange={(event) => setAddress({
                ...address,
                [event.target.name]: event.target.value,
              })}
            />
        </form>
      <button
      className="btn btn-primary mt-3"
        type="button"
        data-testid="checkout-finish-btn"
        onClick={handleClick}
        disabled={
          !total > zero
          || address.street.length < 1
          || address.number.length < 1
        }
      >
        Finalizar Pedido
        {' '}
      </button>
      {postOrderSuccess && <h2>Compra realizada com sucesso!</h2>}
    </div>
  );
};

CheckoutForm.propTypes = {
  total: PropTypes.number.isRequired,
};
export default CheckoutForm;
