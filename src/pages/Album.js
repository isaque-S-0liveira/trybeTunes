import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      fristMusic: '',
      songList: '',
      loading: false,
      favorite: false,
      trackIdInput: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumSelected = await getMusics(id);
    const songs = albumSelected.filter((song, i) => i !== 0);
    this.setState({
      fristMusic: albumSelected[0],
      musicList: songs,
      songList: albumSelected,
    });
    this.getFavorites();
  }

  handleChange = async (event) => {
    const { id, checked } = event.target;
    const { songList } = this.state;
    this.setState({ loading: true, trackIdInput: id });
    const song = songList.find((son) => son.trackId === Number(id));
    await addSong(song);
    this.setState({ loading: false });
    if (checked) {
      this.setState({ favorite: true });
    }
  };

  getFavorites = async () => {
    const { trackIdInput } = this.state;
    const favoriteSongs = await getFavoriteSongs();
    const haveFavorites = favoriteSongs.some((id) => id.trackId === Number(trackIdInput));
    if (haveFavorites) {
      this.setState({ favorite: true });
    }
  };

  render() {
    const { musicList, fristMusic, loading, favorite } = this.state;
    const { artistName, collectionName, artworkUrl100 } = fristMusic;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <>
            <section>
              <img src={ artworkUrl100 } alt={ collectionName } />
              <p data-testid="artist-name">{artistName}</p>
              <span data-testid="album-name">{ collectionName }</span>
            </section>
            <ul>
              { musicList.map(({
                trackName,
                trackId,
                previewUrl }) => (
                (
                  <MusicCard
                    key={ trackId }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                    handleChange={ this.handleChange }
                    favorite={ favorite }
                  />
                )))}
            </ul>
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
