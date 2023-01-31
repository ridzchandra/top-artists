import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
      )}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
