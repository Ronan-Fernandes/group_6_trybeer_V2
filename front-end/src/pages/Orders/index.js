import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SalesTable from '../../components/SalesTable/SalesTable';
import { getSales } from '../../store/ducks/sales';
import SideBar from '../../components/SideBar';

const Orders = () => {
  const { token } = useSelector((state) => state.userReducer.session);
  const { sales, isFetching } = useSelector((state) => state.salesReducer);
  const { role } = useSelector((state) => state.userReducer.user);
  const isVisible = useSelector((state) => state.sideBarHideReducer.isVisible);

  const dispatch = useDispatch();
  // console.log('isFetching', isFetching);
  const [pageLoaded, setPageLoaded] = useState(true);

  // To wait until isFetching get the value true
  useEffect(() => {
    setPageLoaded(false);
  }, [sales]);

  useEffect(() => {
    dispatch(getSales(token));
  }, []);

  if (pageLoaded || isFetching) return <h2>Carregando...</h2>;

  return (
    <div>
      <Header />
      <div className="main-container ">
        {isVisible && <SideBar />}
        <div className="container ">
          {sales.pending.length ? (
            <section style={{ display: 'flex', flexFlow: 'column' }}>
              <header>
                <h2>Pendentes</h2>
              </header>
              <SalesTable sales={sales.pending} />
            </section>
          ) : null}
          {sales.processed.length ? (
            <section style={{ display: 'flex', flexFlow: 'column' }}>
              <header>
                <h2>Preparando</h2>
              </header>
              <SalesTable sales={sales.processed} />
            </section>
          ) : null}
          {sales.delivered.length ? (
            <section style={{ display: 'flex', flexFlow: 'column' }}>
              <header>
                <h2>Entregues</h2>
              </header>
              <SalesTable sales={sales.delivered} />
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Orders;
