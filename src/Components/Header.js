import React from 'react';
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
      </header>
    );
  }
}

export default Header;
