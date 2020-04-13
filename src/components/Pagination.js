import React from "react";

const Pagination = ({ totalItems, itemsPerPage, changePage }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const pageNums = [...Array(pageCount)].map((item, index) => index + 1);

  return (
    <nav>
      <ul>
        {pageNums.map((item) => (
          <li key={item}>
            <a onClick={() => changePage(item)} href="!#">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
