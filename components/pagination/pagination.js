import React, { useState } from 'react';

const Pagination = ({currentPage = 1, handleChosenPage, endOfPages = false}) => {
  const [page, setPage] = useState(currentPage);

  const handlePagination = (dir) => {
    let updatedPage = page;

    dir === 'forward' ? ++updatedPage : --updatedPage;

    handleChosenPage(updatedPage);
    setPage(updatedPage);

    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }

  return (
    <nav className="pagination">
      <div className="grid">
        <button disabled={page == 1} className="pagination__btn" onClick={() => handlePagination('previous')}>
          Previous
        </button>

        <div className="pagination__counter">{page}</div>

        <button disabled={endOfPages} className="pagination__btn" onClick={() => handlePagination('forward')}>
          Next
        </button>
      </div>
    </nav>
  )
}

export default Pagination;
