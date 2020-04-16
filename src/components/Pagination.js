import React from "react";

const Pagination = ({ totalItems, itemsPerPage, changePage, currentPage }) => {
  // generate number for each page
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const pageNums = [...Array(Math.ceil(totalItems / itemsPerPage))].map(
    (item, index) => index + 1
  );

  //slice pagination if too many pages
  const paramFront = currentPage <= 4 ? 3 : 1;
  const paramBack = currentPage >= pageNums.length - 3 ? 3 : 1;

  const pageNumsSliced = () => {
    if (pageNums.length > 5) {
      if (currentPage <= 4) {
        return pageNums.slice(0, 5);
      } else if (currentPage > pageNums.length - 4) {
        return pageNums.slice(-5, pageNums.length);
      } else {
        return pageNums.filter(
          (item) =>
            item >= currentPage - paramFront && item <= currentPage + paramBack
        );
      }
    } else {
      return pageNums;
    }
  };

  // make dots
  const pageNumsDotted = () => {
    if (pageNums.length > 5) {
      if (currentPage < 5) {
        return [...pageNumsSliced(), "...", pageCount];
      } else if (currentPage >= pageNums.length - 3) {
        return [1, "...", ...pageNumsSliced()];
      } else {
        return [1, "...", ...pageNumsSliced(), "...", pageCount];
      }
    } else {
      return pageNums;
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumsDotted().map((item, index) => (
          <li key={index} className="pagination_item">
            <a
              className={
                item === currentPage
                  ? "pagination_link currentPage"
                  : "pagination_link"
              }
              onClick={() => changePage(item)}
              href="#!"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
