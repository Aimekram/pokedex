import React from "react";

const Filter = ({ handleFilterChange }) => {
  const types = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "dragon",
    "dark",
    "fairy",
    "unknown",
    "shadow",
  ].sort();

  return (
    <form>
      <select className="filter" onChange={handleFilterChange}>
        <option value="none">filter by type</option>
        {types.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </form>
  );
};

export default Filter;
