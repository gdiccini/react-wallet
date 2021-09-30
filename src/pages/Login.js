import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeLogin } from '../actions';

import '../styles/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    // this.handelLogin = this.handelLogin.bind(this);

    this.state = {
      email: '',
      password: '',
      btnDisabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verifyInputs());
  }

  validateEmail(email) {
    const re = new RegExp([
      '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)',
      '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])',
      '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    ].join(''));
    return re.test(String(email).toLowerCase());
  }

  verifyInputs() {
    const { email, password } = this.state;
    const passwordMinLength = 6;
    if (this.validateEmail(email) && password.length >= passwordMinLength) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  // handelLogin() {
  //   const { email } = this.state;
  //   const { login } = this.props;
  //   login(email);
  // }

  render() {
    const { email, password, btnDisabled } = this.state;
    return (
      <main>
        <div className="container">
          <section className="description">
            <h1>Wallet</h1>
          </section>
          <section className="login">
            <input
              type="text"
              placeholder="Email"
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            <input
              type="password"
              placeholder="Senha"
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
            <Link to="/carteira">
              <button
                type="button"
                disabled={ btnDisabled }
                // onClick={ this.handelLogin }
              >
                Entrar
              </button>
            </Link>
          </section>
        </div>
      </main>
    );
  }
}

// Login.propTypes = {
//   login: PropTypes.func.isRequired,
// };

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(makeLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
