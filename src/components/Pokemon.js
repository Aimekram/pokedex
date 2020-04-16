import React, { Component } from "react";

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      front: true,
    };
    this.flip = this.flip.bind(this);
    this.mapStats = this.mapStats.bind(this);
  }

  flip() {
    this.setState((prevState) => ({ front: !prevState.front }));
  }

  mapStats(stats) {
    let statsList = [];
    stats.forEach((item) => {
      let statName = item.stat.name;
      let baseStat = item.base_stat;
      let obj = { [statName]: baseStat };
      statsList.push(obj);
    });
    return statsList;
  }

  render() {
    const { front } = this.state;
    const { data, windowWidth } = this.props;
    const { name, sprites, types, stats } = data;
    const typesList = types.map((item) => item.type.name).join(" / ");
    const statsList = this.mapStats(stats);
    const barWidth = windowWidth >= 370 ? 150 : 100;

    return (
      <div onClick={this.flip}>
        {front ? (
          <div className="pokemoncard pokemoncard_front">
            <img
              className="pokemoncard_img"
              src={sprites.front_default}
              alt={name}
            />
            <h2 className="pokemoncard_name">{name}</h2>
          </div>
        ) : (
          <div className="pokemoncard pokemoncard_back">
            <h3 className="pokemoncard_subtitle">{name} stats:</h3>
            <ul className="pokemoncard_stats">
              {statsList.map((item) => (
                <li className="pokemoncard_stats_item" key={Object.keys(item)}>
                  <span>{Object.keys(item)}: </span>
                  <span
                    className="pokemoncard_stats_fullbar"
                    style={{ width: `${barWidth}px` }}
                  >
                    <span
                      className={`pokemoncard_stats_progressbar ${Object.keys(
                        item
                      )}`}
                      style={{
                        width: `${
                          barWidth === 100
                            ? Math.floor((Object.values(item) * 100) / 150)
                            : Math.floor((Object.values(item) * 150) / 250)
                        }px`,
                      }}
                    >
                      {Object.values(item)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p>Type: {typesList}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Pokemon;
