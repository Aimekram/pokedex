import React from "react";

const Filter = ({ handleFilterSubmit, handleFilterChange, filterValue }) => {
  return (
    <form onSubmit={handleFilterSubmit}>
      <input
        type="text"
        placeholder="max weight"
        value={filterValue}
        onChange={handleFilterChange}
      ></input>
      <input type="submit" value="Filter" />
    </form>
  );
};

export default Filter;
