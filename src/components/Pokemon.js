import React from "react";

const Pokemon = ({ name, moreData, front }) => {
  const { sprites, weight } = moreData;
  return front ? (
    <div className="pokemoncard">
      <img className="pokemoncard_img" src={sprites.front_default} alt={name} />
      <p className="pokemoncard_name">{name}</p>
    </div>
  ) : (
    <div className="pokemoncard">
      <p>Weight: {weight}</p>
    </div>
  );
};

export default Pokemon;
