import { useRouteError } from 'react-router-dom';

import styles from 'pages/ErrorPage/ErrorPage.module.scss';

interface ErrorPageProps {
	description: string;
}

export default function ErrorPage({ description }: ErrorPageProps) {
	const error = useRouteError();
	console.log(error);

	return (
		<div className={styles.wrapper}>
			<h1>Something wrong.</h1>
			<p>Unexpected error has occured.</p>
			<p>{description}</p>
		</div>
	);
}
