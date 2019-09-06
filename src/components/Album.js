import React from "react";
import PropTypes from "prop-types";
import Track from "./Track";
import Download from "./Download";

class Album extends React.Component {
  state = {
    selectedTrack: ""
  };

  static propTypes = {
    setActiveAlbum: PropTypes.func,
    match: PropTypes.object,
    volumes: PropTypes.object
  };

  componentDidMount() {
    this.props.setActiveAlbum(this.props.match.params.volume);

    if (this.props.match.params.track) {
      this.setState({
        selectedTrack: this.props.match.params.track
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let selectedAlbum = this.props.match.params.volume;
    let previousAlbum = prevProps.match.params.volume;
    if (selectedAlbum !== previousAlbum) {
      this.props.setActiveAlbum(selectedAlbum);
    }
    if (this.props.match.params.track !== prevProps.match.params.track) {
      this.setState({
        selectedTrack: this.props.match.params.track
      });
    }
  }

  handleTrackLoading = track => {
    this.setState({
      selectedTrack: track === this.state.selectedTrack ? "" : track
    });
    if (track === this.props.match.params.track) {
      this.props.history.push(`/volume/${this.props.match.params.volume}`);
    } else {
      this.props.history.push(
        `/volume/${this.props.match.params.volume}/track/${track}`
      );
    }
  };

  renderTracklist(currentAlbum) {
    if (currentAlbum in this.props.volumes) {
      document.documentElement.style.setProperty(
        "--accentColor",
        this.props.volumes[currentAlbum].color.secondary
      );
      const tracklist = this.props.volumes[currentAlbum].tracklist;
      return Object.keys(tracklist).map(track => (
        <Track
          match={this.props.match}
          volume={currentAlbum}
          trackDetails={tracklist[track]}
          trackNumber={track}
          key={track}
          accentColor={this.props.volumes[currentAlbum].color.secondary}
          selectedTrack={this.state.selectedTrack}
          handleTrackLoading={this.handleTrackLoading}
        />
      ));
    } else {
      return false;
    }
  }

  render() {
    const currentAlbum = this.props.currentAlbum;

    return (
      <React.Fragment>
        <div className="album">
          <figure className="album__jacket">
            <img
              className="album__cover"
              srcSet={`
                /assets/images/${currentAlbum}/300.jpg 300w,
                /assets/images/${currentAlbum}/400.jpg 400w,
                /assets/images/${currentAlbum}/600.jpg 600w,
                /assets/images/${currentAlbum}/900.jpg 900w,
                /assets/images/${currentAlbum}/1200.jpg 1200w,
                /assets/images/${currentAlbum}/1500.jpg 1500w,
                /assets/images/${currentAlbum}/1800.jpg 1800w,
                /assets/images/${currentAlbum}/2400.jpg 2400w
              `}
              sizes="(max-width: 50.0625em) 72.5vw, (max-width: 75em) 500px, calc((100vh - 9.722222rem) * .3)"
              src={`/assets/images/${currentAlbum}/600.jpg`}
              alt={`Under The Covers, Vol. ${currentAlbum} Cover Artwork`}
            />
            <Download currentAlbum={currentAlbum} />
          </figure>
          <ol className="album__tracklist">
            {this.renderTracklist(currentAlbum)}
          </ol>
        </div>
      </React.Fragment>
    );
  }
}

export default Album;
