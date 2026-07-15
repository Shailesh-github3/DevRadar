import { Pagination as BPagination } from 'react-bootstrap';

function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  // Calculate total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Don't render if there's only one page or no items
  if (totalPages <= 1) return null;

  // Generate array of page numbers [1, 2, 3, ...]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="d-flex justify-content-center">
      <BPagination>
        <BPagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        
        {pageNumbers.map((number) => (
          <BPagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => onPageChange(number)}
          >
            {number}
          </BPagination.Item>
        ))}
        
        <BPagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </BPagination>
    </div>
  );
}

export default Pagination;