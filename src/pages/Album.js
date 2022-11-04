import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      fristMusic: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumSelected = await getMusics(id);
    this.setState({
      fristMusic: albumSelected[0],
      musicList: albumSelected,
    });
  }

  render() {
    const { musicList, fristMusic } = this.state;
    const { artistName, collectionName, artworkUrl100 } = fristMusic;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <p data-testid="artist-name">{artistName}</p>
          <span data-testid="album-name">{ collectionName }</span>
        </section>
        <ul>
          { musicList.map(({ trackName, trackId, previewUrl }, index) => (index === 0 ? ''
            : (
              <MusicCard
                key={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
              />
            )))}
        </ul>
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
