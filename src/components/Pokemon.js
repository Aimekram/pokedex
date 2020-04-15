import React from "react";

const Pokemon = ({ name, moreData }) => {
  const { weight, sprites } = moreData;
  return (
    <div className="pokemoncard">
      <img className="pokemoncard_img" src={sprites.front_default} alt={name} />
      <p className="pokemoncard_name">{name}</p>
    </div>
  );
};

export default Pokemon;
