import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

class Stats extends React.Component {
  static propTypes = {
    volumes: PropTypes.object.isRequired,
    artists: PropTypes.array,
    original_artists: PropTypes.array,
    rankUniqueValues: PropTypes.func.isRequired,
    setActiveAlbum: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.setActiveAlbum("0");
    if (this.props.artists.length < 1) {
      console.log("mounted");
      this.props.rankUniqueValues("artist", "artists");
      this.props.rankUniqueValues("original_artist", "original_artists");
    }
  }

  render() {
    const chartCount = 25;
    return (
      <React.Fragment>
        <Helmet>
          <title>Top Artists • Under The Covers</title>
        </Helmet>
        <div className="stats">
          <h1 className="stats__heading">Jukebox Statistics</h1>
          <div className="stats__column stats__column--players">
            <h2 className="stats__subHeading">Top Players</h2>
            <ol className="stats__topList">
              {this.props.artists.slice(0, chartCount).map(value => (
                <li key={value.value} className="stats__topItem">
                  <span className="stats__topArtist">{value.value}</span>
                  <span className="stats__topCount">{value.count}</span>
                </li>
              ))}
            </ol>
            <h3 className="stats__subHeading--minor">Other Players</h3>
            <p className="stats__others">
              {this.props.artists
                .slice(chartCount + 1)
                .sort((a, b) =>
                  a.value.replace("The ", "") > b.value.replace("The ", "")
                    ? 1
                    : -1
                )
                .map(value => (
                  <span className="stats__otherArtist" key={value.value}>
                    {value.value}
                  </span>
                ))}
            </p>
          </div>
          <div className="stats__column stats__column--writers">
            <h2 className="stats__subHeading">Top Writers</h2>
            <ol className="stats__topList">
              {this.props.original_artists.slice(0, chartCount).map(value => (
                <li key={value.value} className="stats__topItem">
                  <span className="stats__topArtist">{value.value}</span>
                  <span className="stats__topCount">{value.count}</span>
                </li>
              ))}
            </ol>
            <h3 className="stats__subHeading--minor">Other Writers</h3>
            <p className="stats__others">
              {this.props.original_artists
                .slice(chartCount + 1)
                .sort((a, b) =>
                  a.value.replace("The ", "") > b.value.replace("The ", "")
                    ? 1
                    : -1
                )
                .map(value => (
                  <span className="stats__otherArtist" key={value.value}>
                    {value.value}
                  </span>
                ))}
            </p>
          </div>
        </div>
        <Link to="/" className="stats__home">
          &larr; Back To Selections
        </Link>
      </React.Fragment>
    );
  }
}

export default Stats;
