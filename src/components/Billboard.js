import React from "react";
import PropTypes from "prop-types";

class Billboard extends React.Component {
  static propTypes = {
    volumeCount: PropTypes.number,
    clearAlbum: PropTypes.func
  };

  componentDidMount() {
    this.props.clearAlbum();
  }

  render() {
    return (
      <header className="billboard">
        <h1 className="billboard__title">
          <span className="billboard__title--under">Under</span>
          <span className="billboard__title--the">The</span>
          <br />
          <span className="billboard__title--covers">Covers</span>
        </h1>
        <h2 className="billboard__description">
          <strong className="billboard__count">{this.props.volumeCount}</strong>
          volumes of songs <u>not</u> written by the people playing them
        </h2>
      </header>
    );
  }
}

export default Billboard;
