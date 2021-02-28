import React, { useState } from 'react';

const Pagination = ({currentPage = 1, handleChosenPage, endOfPages = false}) => {
  const [page, setPage] = useState(currentPage);

  const handlePagination = (dir) => {
    let updatedPage = page;

    dir === 'forward' ? ++updatedPage : --updatedPage;

    sendOffPage(updatedPage);
  }

  const handlePaginationDirect = (event) => {
    const val = event.target.value;

    sendOffPage(parseInt(val) || 1);
  }

  const sendOffPage = (newPage) => {
    handleChosenPage(newPage);
    setPage(newPage);

    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }

  return (
    <nav className="pagination">
      <div className="grid">
        <button disabled={page == 1} className="pagination__btn" onClick={() => handlePagination('previous')}>
          Previous
        </button>

        <div className="pagination__counter">
          <label className="vh" htmlFor="pagination__input-ID-01">{page}</label>
          <input value={page} onChange={(ev) => handlePaginationDirect(ev)} type="text" name="pagination__input-ID-01" id="pagination__input-ID-01" />
        </div>

        <button disabled={endOfPages} className="pagination__btn" onClick={() => handlePagination('forward')}>
          Next
        </button>
      </div>
    </nav>
  )
}

export default Pagination;
