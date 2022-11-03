import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      bttHabillit: true,
      inputValue: '',
      loading: false,
      redirect: false,
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    const minValue = 3;
    if (value.length >= minValue) {
      this.setState({
        bttHabillit: false,
        inputValue: value,
      });
    } else {
      this.setState({ bttHabillit: true });
    }
  };

  handleClick = async () => {
    const { inputValue } = this.state;
    this.setState({ loading: true });
    await createUser({ name: inputValue });
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    const { bttHabillit, loading, redirect } = this.state;
    return (
      <>
        { redirect && <Redirect to="/search" /> }
        {loading ? <Loading /> : (
          <div data-testid="page-login">
            <form>
              <input
                data-testid="login-name-input"
                type="text"
                placeholder="Nome"
                onChange={ this.handleChange }
              />
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ bttHabillit }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
      </>
    );
  }
}
export default Login;
