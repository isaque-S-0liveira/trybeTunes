import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    const { name } = user;
    this.setState({
      loading: false,
      userName: name,
    });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : <span data-testid="header-user-name">{ userName }</span>}
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>

        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>

        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
