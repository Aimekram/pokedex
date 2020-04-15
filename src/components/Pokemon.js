import React, { Component } from "react";

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      front: true,
    };
    this.flip = this.flip.bind(this);
  }

  flip() {
    this.setState((prevState) => ({ front: !prevState.front }));
  }

  render() {
    const { front } = this.state;
    const { name, moreData } = this.props;
    const { sprites, weight } = moreData;

    return (
      <div className="pokemoncard" onClick={this.flip}>
        {front ? (
          <>
            <img
              className="pokemoncard_img"
              src={sprites.front_default}
              alt={name}
            />
            <p className="pokemoncard_name">{name}</p>
          </>
        ) : (
          <>
            <p>Weight: {weight} hectograms</p>
          </>
        )}
      </div>
    );
  }
}

export default Pokemon;
