import React from 'react';
import Button from 'react-bootstrap/Button';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Button variant="primary" onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </Button>
      )}
      {currentPage < totalPages && (
        <Button variant="primary" onClick={() => onPageChange(currentPage + 1)}>
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;
