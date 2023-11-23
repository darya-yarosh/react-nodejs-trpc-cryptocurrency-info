import styles from 'components/general/Pagination/Pagination.module.scss';

export interface PaginationProps {
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
		changePage(currentPageInd - 1);
	}

	function nextPage() {
		changePage(currentPageInd + 1);
	}

	const currentPageNum =
		currentPageInd >= 0
			? currentPageInd + 1
			: 1;

	return (
		<nav className={styles.pagination}
			data-testid={'pagination'}>
			<button
				data-testid={'pagination-prevButton'}
				className={styles.pageNum}
				onClick={prevPage}
				disabled={currentPageInd <= 0}
			>
				{`<`}
			</button>
			<button
				data-testid={'pagination-pageCountText'}
				className={styles.pageNum__current}
				onClick={() => { }}
				disabled
			>
				{currentPageNum}
			</button>
			<button
				data-testid={'pagination-nextButton'}
				className={styles.pageNum}
				onClick={nextPage}
				disabled={isLastPage}
			>
				{`>`}
			</button>
		</nav>
	);
}
