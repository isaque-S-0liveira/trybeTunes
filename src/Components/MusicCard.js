import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorite: false,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  handleChange = async (event) => {
    const { id, checked } = event.target;
    const { songList } = this.props;
    this.setState({ loading: true });
    const song = songList.find((son) => son.trackId === Number(id));
    await addSong(song);
    this.setState({ loading: false });
    if (checked) {
      this.setState({ favorite: true });
    }
  };

  getFavorites = async () => {
    const { trackId } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    const haveFav = favoriteSongs.some((id) => id.trackId === trackId);
    if (haveFav) {
      this.setState({ favorite: true });
    }
  };

  render() {
    const { loading, favorite } = this.state;
    const { trackName,
      previewUrl,
      trackId,
    } = this.props;
    return (
      <div>
        {loading ? <Loading /> : (
          <li>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <form>
              <label htmlFor={ `${trackId}` }>
                {' '}
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  id={ trackId }
                  onChange={ this.handleChange }
                  checked={ favorite }
                />
              </label>
            </form>
          </li>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  songList: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number,
  })).isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
