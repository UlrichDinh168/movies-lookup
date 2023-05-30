import React, { useState, useEffect } from 'react';

const Paginate = (props: any) => {
  const { currentPage, totalPages, paginate } = props;
  const [page, setPage] = useState<any>();
  const [totalPageNumber, setTotalPageNumber] = useState();

  useEffect(() => {
    setPage(currentPage);
    setTotalPageNumber(totalPages);
  }, [currentPage, totalPages]);

  return (
    <>
      <span className="pageCount">
        {page} - {totalPageNumber}
      </span>
      <button className={page > 1 ? 'paginate-button' : 'paginate-button disable'} onClick={() => paginate('prev')}>
        Prev
      </button>
      <button
        className={page === totalPageNumber ? 'paginate-button disable' : 'paginate-button'}
        onClick={() => paginate('next')}
      >
        Next
      </button>
    </>
  );
};

export default Paginate;
