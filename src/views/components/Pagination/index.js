// button component for the pagination
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, ButtonGroup } from "react-bootstrap";

function Button({ active, children, ...props }) {
  return (
    <button
      className={`btn ${
        active ? "btn-primary font-weight-bold mr-2" : "btn-light mr-2"
      } ${typeof children === "number" ? "px-3" : "px-4"}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

// pagination component  //brute force
// export function Pagination({ page, setPage, pages, hasNextPage }) {
//   // handler for the next button
//   function handleNext() {
//     setPage(page + 1);
//   }

//   // handler for the previous button
//   function handlePrevious() {
//     setPage(page - 1);
//   }

//   return (
//     <div className="p-5 flex items-center justify-center text-gray-600">
//       <Button onClick={handlePrevious} disabled={page <= 1}>
//         Previous
//       </Button>
//       {pages - page < 1 && page - 4 > 0 && (
//         <Button onClick={() => setPage(page - 4)}>{page - 4}</Button>
//       )}
//       {pages - page < 2 && page - 3 > 0 && (
//         <Button onClick={() => setPage(page - 3)}>{page - 3}</Button>
//       )}
//       {pages && page - 2 > 0 && (
//         <Button onClick={() => setPage(page - 2)}>{page - 2}</Button>
//       )}
//       {pages && page - 1 > 0 && (
//         <Button onClick={() => setPage(page - 1)}>{page - 1}</Button>
//       )}
//       <Button active={true}>{page}</Button>
//       {page + 1 <= pages && (
//         <Button onClick={() => setPage(page + 1)}>{page + 1}</Button>
//       )}
//       {page + 2 <= pages && (
//         <Button onClick={() => setPage(page + 2)}>{page + 2}</Button>
//       )}
//       {page + 3 <= pages && page < 3 && (
//         <Button onClick={() => setPage(page + 3)}>{page + 3}</Button>
//       )}
//       {page + 4 <= pages && page < 2 && (
//         <Button onClick={() => setPage(page + 4)}>{page + 4}</Button>
//       )}
//       <Button onClick={handleNext} disabled={!hasNextPage}>
//         Next
//       </Button>
//     </div>
//   );
// }

//pagination
export function Pagination({ page, setPage, pages, hasNextPage, style }) {
  // Calculate the range of page numbers to display
  const getPageNumbers = () => {
    const range = [];
    const maxPagesToShow = 10; // Number of pages to display around the current page

    // Calculate the start and end pages
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(pages, startPage + maxPagesToShow - 1);

    // Adjust the range if at the beginning or end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return range;
  };

  // Handlers for page navigation
  function handleNext() {
    if (hasNextPage) setPage(page + 1);
  }

  function handlePrevious() {
    if (page > 1) setPage(page - 1);
  }

  return (
    <div className="d-flex align-items-center py-3" style={style}>
      <div>
        <Button
          variant="outline-secondary"
          onClick={handlePrevious}
          disabled={page <= 1}
        >
          Previous
        </Button>
        {getPageNumbers()?.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? "primary" : "outline-secondary"}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
        <Button
          variant="outline-secondary"
          onClick={handleNext}
          disabled={!hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
