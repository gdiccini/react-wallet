import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);

    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.renderExpenses = this.renderExpenses.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
  }

  removeExpense(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  renderExpenses() {
    const { expenses } = this.props;
    return expenses.map((expense) => (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>
          {`${parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}`}
        </td>
        <td>
          {
            `${(expense.value * expense.exchangeRates[expense.currency].ask)
              .toFixed(2)}`
          }
        </td>
        <td>Real</td>
        <td>
          <button type="button">Editar</button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.removeExpense(expense.id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
  }

  renderTableHeader() {
    const fields = ['Descrição',
      'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];
    return fields.map(
      (field, index) => <th key={ index }>{field}</th>,
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <tr>{this.renderTableHeader()}</tr>
          {(expenses.length > 0) && this.renderExpenses()}
        </table>
      </div>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(removeExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
