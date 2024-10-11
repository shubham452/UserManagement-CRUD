import React from "react";

const Pagination = ({ handlePrev, handleNext, page, setPage, pageCount }) => {
  if (pageCount === 0) {
    return null; // No pagination if no pages available
  }

  const renderButtons = () => {
    let items = [];
    for (let i = 1; i <= pageCount; i++) {
      items.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 mx-1 rounded ${
            page === i ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return items;
  };

  return (
    <div>
      <button
        className={`px-3 py-1 mx-1 rounded ${
          page === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        onClick={handlePrev}
        disabled={page === 1}
      >
        Previous
      </button>

      {renderButtons()}

      <button
        className={`px-3 py-1 mx-1 rounded ${
          page === pageCount
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        onClick={handleNext}
        disabled={page === pageCount}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
