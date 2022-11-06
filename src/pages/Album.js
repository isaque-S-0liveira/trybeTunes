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
      songList: '',
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
  }

  render() {
    const { musicList, fristMusic, songList } = this.state;
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
                songList={ songList }
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
