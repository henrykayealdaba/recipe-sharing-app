export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  const getPagination = () => {
    const pages = [];
    const delta = 1;

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (left > 2) pages.push('...');

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) pages.push('...');

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        ←
      </button>

      {getPagination().map((page, index) =>
        page === '...' ? (
          <span key={index}>...</span>
        ) : (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`rounded border px-3 py-1 ${
              currentPage === page ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
}
