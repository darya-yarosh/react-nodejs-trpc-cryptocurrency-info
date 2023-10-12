import styles from "components/Pagination/Pagination.module.scss";

interface PaginationProps {
  pages: number[];
  currentPage: number;
  changePage: (pageIndex: number) => void;
}

export default function Pagination({
  pages,
  currentPage,
  changePage,
}: PaginationProps) {
  return (
    <nav className={styles.pagination}>
      {pages.map((pageNum) => {
        const className =
          pageNum === currentPage ? styles.pageNum__current : styles.pageNum;
        return (
          <button
            key={pageNum}
            className={className}
            onClick={() => changePage(pageNum)}
          >
            {pageNum + 1}
          </button>
        );
      })}
    </nav>
  );
}
