import styles from "components/general/Pagination/Pagination.module.scss";

interface PaginationProps {
  isLastPage: boolean;
  currentPageInd: number;
  changePage: (pageIndex: number) => void;
}

export default function Pagination({
  isLastPage,
  currentPageInd,
  changePage,
}: PaginationProps) {
  function prevPage() {
    changePage(currentPageInd - 1)
  }

  function nextPage() {
    changePage(currentPageInd + 1);
  }

  const currentPageNum = currentPageInd + 1

  return (
    <nav className={styles.pagination}>
      <button
        className={styles.pageNum}
        onClick={prevPage}
        disabled={currentPageInd <= 0}
      >
        {`<`}
      </button>
      <button
        className={styles.pageNum__current}
        onClick={() => { }}
        disabled
      >
        {currentPageNum}
      </button>
      <button
        className={styles.pageNum}
        onClick={nextPage}
        disabled={isLastPage}
      >
        {`>`}
      </button>
    </nav>
  );
}
