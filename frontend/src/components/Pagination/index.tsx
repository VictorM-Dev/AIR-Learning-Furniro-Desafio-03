import clsx from "clsx";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

function getPageRange(current: number, total: number): (number | "...")[] {
    const delta = 1;
    const range: (number | "...")[] = [];

    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);
    if (left > 2) range.push("...");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < total - 1) range.push("...");
    if (total > 1) range.push(total);

    return range;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    if (totalPages <= 1) return null;

    const pages = getPageRange(currentPage, totalPages);

    const buttonBase = clsx(
        "h-10 min-w-10 px-2 flex items-center justify-center rounded",
        "font-poppins text-sm transition",
    );

    return (
        <nav
            aria-label="Pagination"
            className={clsx(
                "flex justify-center items-center gap-2 flex-wrap mt-8",
            )}>
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={clsx(
                    buttonBase,
                    currentPage === 1
                        ? "text-[#B0B0B0] cursor-not-allowed"
                        : "text-primary-text hover:bg-secundary cursor-pointer",
                )}>
                Prev
            </button>

            {pages.map((p, index) =>
                p === "..." ? (
                    <span
                        key={`ellipsis-${index}`}
                        className={clsx(buttonBase, "text-[#B0B0B0]")}>
                        ...
                    </span>
                ) : (
                    <button
                        type="button"
                        key={p}
                        onClick={() => onPageChange(p)}
                        disabled={p === currentPage}
                        aria-current={p === currentPage ? "page" : undefined}
                        className={clsx(
                            buttonBase,
                            p === currentPage
                                ? "bg-over-secundary text-secundary cursor-default"
                                : "text-primary-text hover:bg-secundary cursor-pointer",
                        )}>
                        {p}
                    </button>
                ),
            )}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={clsx(
                    buttonBase,
                    currentPage === totalPages
                        ? "text-[#B0B0B0] cursor-not-allowed"
                        : "text-primary-text hover:bg-secundary cursor-pointer",
                )}>
                Next
            </button>
        </nav>
    );
};

export default Pagination;
