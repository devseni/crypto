import React, { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ page, setPage }) => {
  const [clickedPage, setClickedPage] = useState(null);

  const previousHandler = () => {
    if (page <= 1) return;
    setPage((prevPage) => page - 1);
  };

  const nextHandler = () => {
    if (page >= 10) return;
    setPage((prevPage) => page + 1);
  };

  const pageClickHandler = (event) => {
    if (event.target.tagName === "P") {
      const clickedPageNumber = event.target.innerHTML;
      setPage(clickedPageNumber);
    }
  };

  return (
    <div className={styles.pagination} onClick={pageClickHandler}>
      <button
        onClick={previousHandler}
        className={page === 1 ? styles.disabled : null}
      >
        Previous
      </button>
      <p className={page === 1 ? styles.selected : null}>1</p>
      <p className={page === 2 ? styles.selected : null}>2</p>
      {page > 2 && page < 9 && (
        <>
          <span>...</span>
          <p className={styles.selected}>{page}</p>
        </>
      )}
      <span>...</span>
      <p className={page === 9 ? styles.selected : null}>9</p>
      <p className={page === 10 ? styles.selected : null}>10</p>
      <button
        onClick={nextHandler}
        className={page === 10 ? styles.disabled : null}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
