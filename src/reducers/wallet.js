import {
  RECEIVE_CURRENCIES_SUCCESS,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
} from '../actions/actionTypes';

const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  default:
    return state;
  }
};

export default wallet;
