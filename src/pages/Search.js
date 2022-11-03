import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disabledBtt: true,
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    const minValue = 2;
    if (value.length >= minValue) {
      this.setState({
        disabledBtt: false,
      });
    } else {
      this.setState({ disabledBtt: true });
    }
  };

  render() {
    const { disabledBtt } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Pesquisar artista ou banda"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ disabledBtt }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
