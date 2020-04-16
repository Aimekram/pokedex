import React from "react";

const Filter = ({ handleFilterChange, filterValue }) => {
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
      <select onChange={handleFilterChange}>
        <option value="none">Filter by type</option>
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
