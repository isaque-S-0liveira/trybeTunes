import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, handleChange, favorite } = this.props;
    return (
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
              onChange={ handleChange }
              checked={ favorite }
            />
          </label>
        </form>
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default MusicCard;
