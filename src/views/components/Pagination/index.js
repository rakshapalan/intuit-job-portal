// button component for the pagination
import React, { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonGroup } from "react-bootstrap";

//pagination
export function Pagination({ page, setPage, pages, hasNextPage, style }) {
  // Calculate the range of page numbers to display
  const getPageNumbers = useMemo(() => {
    const maxPagesToShow = 10; // Number of pages to display around the current page
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(pages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const range = [];
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return range;
  }, [page, pages]);

  // Handlers for page navigation
  function handleNext() {
    if (hasNextPage) setPage(page + 1);
  }

  function handlePrevious() {
    if (page > 1) setPage(page - 1);
  }
  console.log("pageNumber", page, getPageNumbers, hasNextPage);
  return (
    <div className="d-flex py-3" style={style}>
      <div className="d-flex justify-content-center" style={{ width: "80%" }}>
        <div>
          <Button
            variant="outline-secondary"
            onClick={handlePrevious}
            disabled={page <= 1}
          >
            Previous
          </Button>
        </div>
        {getPageNumbers?.map((pageNumber) => (
          <div>
            <Button
              key={pageNumber}
              variant={pageNumber === page ? "primary" : "outline-secondary"}
              onClick={() => setPage(pageNumber)}
              style={{ marginLeft: "14px" }}
            >
              {pageNumber}
            </Button>
          </div>
        ))}
        <div>
          <Button
            variant="outline-secondary"
            onClick={handleNext}
            disabled={!hasNextPage}
            style={{ marginLeft: "14px" }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
