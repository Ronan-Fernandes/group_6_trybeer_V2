import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveToLocalStorage, loadFromLocalStorage } from '../services/localStorage';
import { addToCart, removeToCart, loadInitCart } from '../store/ducks/productsCart';
import { getProducts } from '../store/ducks/products';

import './ProductsContainer.css';

const ProductsContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [initialRender, setInitialRender] = useState(true);
  const cart = useSelector((state) => state.cartReducer.cart);

  let quantity = 0;
  const toFixedValue = 2;


  const totalCart = () => {
    let totalSummed = 0;
    Object.keys(cart).map((key) => {
      if (cart[key].quantity > 0) {
        totalSummed += cart[key].price * cart[key].quantity;
      }
      return totalSummed;
    });
    setTotal(totalSummed);
  };


  useEffect(() => {
    totalCart();
    if (initialRender) {
      // To prevent to reset cart in local storage at first render
      setInitialRender(false);
    } else {
      saveToLocalStorage('cart', { cart });
    }
  }, [cart]);

  useEffect(() => {
    dispatch(getProducts());
    const cartFromLocalStorage = loadFromLocalStorage('cart');
    if (cartFromLocalStorage !== null) dispatch(loadInitCart(cartFromLocalStorage.cart));
  }, []);

  const { productsDB, productsFetching } = useSelector((state) => state.productsReducer);
  const handleGoToCheckOut = () => {
    saveToLocalStorage('cart', { cart });
    history.push('/checkout');
  };

  const handelClick = (type, product) => {
    type === 'plus' ? dispatch(addToCart(product)) : dispatch(removeToCart(product));
  };

  let price = 0;

  return (
    <>
      <div className="cardsContainer">
        {productsFetching
          && productsDB.map(
            (product, i) => (
              cart[product.id] !== undefined
                ? (quantity = cart[product.id].quantity)
                : (quantity = 0),
              (price = product.price.toFixed(2).toString().replace('.', ',')),
              (
                <div className="productCard" key={ product.name }>
                  <span className="price" data-testid={ `${i}-product-price` }>
                    R$
                    {' '}
                    {price}
                  </span>
                  <img
                    data-testid={ `${i}-product-img` }
                    src={ product.url_image }
                    alt="test"
                    height="80px"
                  />
                  <h3 data-testid={ `${i}-product-name` }>{product.name}</h3>
                  <div className="quantityContainer">
                    <button
                      type="button"
                      data-testid={ `${i}-product-minus` }
                      className="productButton"
                      onClick={ () => handelClick('minus', product) }
                    >
                      -
                    </button>
                    <span data-testid={ `${i}-product-qtd` } className="quantity">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      data-testid={ `${i}-product-plus` }
                      className="productButton"
                      onClick={ () => handelClick('plus', product) }
                    >
                      +
                    </button>
                  </div>
                </div>
              )
            ),
          )}
      </div>
      <button
        type="button"
        disabled={ total === 0 }
        data-testid="checkout-bottom-btn"
        onClick={ () => handleGoToCheckOut() }
      >
        Ver Carrinho
      </button>
      <h2 data-testid="checkout-bottom-btn-value">
        R$
        {' '}
        {total.toFixed(toFixedValue).toString().replace('.', ',')}
      </h2>
    </>
  );
};

export default ProductsContainer;
