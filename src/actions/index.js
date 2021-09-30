import {
  LOGIN,
  RECEIVE_CURRENCIES_SUCCESS,
  ADD_EXPENSE, REMOVE_EXPENSE,
} from './actionTypes';

import getCurrencies from '../services/apiRequests';

export const makeLogin = (email) => ({
  type: LOGIN,
  email,
});

const receiveCurrenciesSuccess = (data) => ({
  type: RECEIVE_CURRENCIES_SUCCESS,
  currencies: data,
});

export function fetchCurrencies() {
  return (dispatch) => (
    getCurrencies()
      .then((data) => dispatch(receiveCurrenciesSuccess(data)))
  );
}

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});
