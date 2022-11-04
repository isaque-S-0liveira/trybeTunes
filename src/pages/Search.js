import React from 'react';
import AlbumCard from '../Components/AlbumCard';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disabledBtt: true,
      albumName: '',
      name: '',
      loading: false,
      albumList: [],
      albumListEmpty: false,
      empty: true,
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
    this.setState({
      albumName: value,
    });
  };

  handleClick = async () => {
    const { albumName } = this.state;
    this.setState({ loading: true });
    const albumList = await searchAlbumsAPI(albumName);
    this.setState({
      name: albumName,
      albumName: '',
      loading: false,
      albumList,
    });
    console.log(albumList);
    if (albumList.length === 0) {
      this.setState({
        albumListEmpty: true,
        empty: true,
      });
    } else {
      this.setState({
        empty: false,
        albumListEmpty: false,
      });
    }
  };

  render() {
    const {
      disabledBtt,
      albumName,
      name,
      loading,
      albumList,
      empty,
      albumListEmpty } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              placeholder="Pesquisar artista ou banda"
              onChange={ this.handleChange }
              value={ albumName }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ disabledBtt }
              onClick={ this.handleClick }
            >
              Pesquisar

            </button>
          </form>
        )}
        { albumListEmpty && <h3>Nenhum álbum foi encontrado</h3>}
        { empty ? '' : (
          <>
            <h3>{`Resultado de álbuns de: ${name}`}</h3>
            {albumList.map(({
              artistName,
              collectionId,
              collectionName,
              artworkUrl100,
            }) => (
              <AlbumCard
                key={ collectionId }
                artworkUrl100={ artworkUrl100 }
                collectionName={ collectionName }
                artistName={ artistName }
                collectionId={ collectionId }
              />
            ))}
          </>
        )}
      </div>
    );
  }
}

export default Search;
