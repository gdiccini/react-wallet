import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, addExpense } from '../actions';
import Currency from './Currency';
import PaymentMethod from './PaymentMethod';
import Tag from './Tag';

class AddExpenseForms extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.setId = this.setId.bind(this);
    this.createId = this.createId.bind(this);

    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { receiveCurrencies } = this.props;
    receiveCurrencies();
  }

  setId(expenses) {
    if (!expenses) {
      return 0;
    }
    return (expenses.length + 1);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  createId() {
    const { expenses } = this.props;
    if (expenses.length === 0) {
      return 0;
    }
    return expenses.reduce((acc, expense) => {
      if (acc <= expense.id) {
        acc = (expense.id + 1);
      }
      return acc;
    }, 0);
  }

  async addExpense() {
    const { receiveCurrencies, sumExpense, currencies } = this.props;

    await receiveCurrencies();

    console.log(this.createId());
    const id = this.createId();
    const { value, currency, method, tag, description } = this.state;
    const expense = { id, value, currency, method, tag, description };
    expense.exchangeRates = { ...currencies };
    sumExpense(expense);

    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              name="value"
              type="number"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <Currency value={ currency } onChange={ this.handleChange } />
          <PaymentMethod value={ method } onChange={ this.handleChange } />
          <Tag value={ tag } onChange={ this.handleChange } />
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              name="description"
              type="text"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button type="button" onClick={ () => this.addExpense() }>
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

AddExpenseForms.propTypes = {
  receiveCurrencies: PropTypes.func.isRequired,
  sumExpense: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  receiveCurrencies: () => dispatch(fetchCurrencies()),
  sumExpense: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForms);
