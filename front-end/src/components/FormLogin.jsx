import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { saveToLocalStorage } from '../services/localStorage';
import { userLogin } from '../store/ducks/user';
import './FormLogin.css';

const five = 5;

const FormLogin = () => {
  const { errors } = useSelector((state) => state.userReducer);
  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  // Route to /Register
  const history = useHistory();
  const dispatch = useDispatch();

  // Set all local Action/Reducers
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [inputsValid, setInputsValid] = useState({
    email: false,
    password: false,
  });

  function handleClick() {
    dispatch(userLogin(user.email, user.password)); // async
  }

  // Each time user is updated password and email are checked if are valid
  useEffect(() => {
    const isEmailValid = regexEmail.test(user.email);
    setInputsValid({ ...inputsValid, email: isEmailValid, password: user.password.length > five })
  }, [user]);

  return (
    <div className="login-container">
      <div className="simple-login-container">
        <h2>Login</h2>
        {<h2> {errors.message}</h2>}
        <div className="row">
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              name="email"
              type="email"
              data-testid="email-input"
              placeholder="Digit seu email"
              value={user.email}
              onChange={(event) => setUser({ ...user, [event.target.name]: event.target.value })}
            />
            {!inputsValid.email && <small id="emailHelp" className="form-text text-danger">Please enter a valid email address.</small>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              name="password"
              type="password"
              data-testid="password-input"
              placeholder="Digit seu password"
              value={user.password}
              onChange={(event) => setUser({ ...user, [event.target.name]: event.target.value })}
            />
            {!inputsValid.password && <small id="emailHelp" className="form-text text-danger">Please enter a valid email address.</small>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 form-group">
            <button
              className="btn btn-block btn-login"
              type="button"
              data-testid="signin-btn"
              disabled={!inputsValid.email || !inputsValid.password}
              onClick={handleClick}
            >
              ENTRAR
        </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 form-group">
            <button
              className="btn btn-block btn-register"
              type="button"
              data-testid="no-account-btn"
              onClick={() => history.push('/register')}
            >
              {' '}
          Ainda não tenho conta
        </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
