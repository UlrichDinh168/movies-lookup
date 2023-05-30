import React, { useState, useEffect } from 'react';

type PaginateType = {
  currentPage: number;
  totalPages: number;
  paginate: (type: string) => void;
};

const Paginate = (props: PaginateType) => {
  const { currentPage, totalPages, paginate } = props;
  const [page, setPage] = useState<number>(1);
  const [totalPageNumber, setTotalPageNumber] = useState<number>();

  useEffect(() => {
    setPage(currentPage);
    setTotalPageNumber(totalPages);
  }, [currentPage, totalPages]);

  return (
    <>
      <span className="pageCount">
        {page} - {totalPageNumber}
      </span>
      <button
        className={page > 1 ? 'paginate-button' : 'paginate-button disable'}
        onClick={() => paginate('prev')}
      >
        Prev
      </button>
      <button
        className={
          page === totalPageNumber
            ? 'paginate-button disable'
            : 'paginate-button'
        }
        onClick={() => paginate('next')}
      >
        Next
      </button>
    </>
  );
};

export default Paginate;
