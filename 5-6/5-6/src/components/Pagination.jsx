import React from "react";

export default function Pagination({
  currentPage,
  total,
  limit,
  onNext,
  onPrev,
}) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={onPrev} disabled={currentPage === 1}>
        Previous
      </button>
      <span style={{ margin: "0 10px" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage >= totalPages}>
        Next
      </button>
    </div>
  );
}
