import styles from 'components/general/Modal/Modal.module.scss';

interface ModalProps {
	handleDismiss: () => void;
	children: React.ReactNode;
}

export default function Module({ handleDismiss, children }: ModalProps) {
	return (
		<div className={styles.wrapper} data-testid={'modal'}>
			<div className={styles.backdrop} onClick={handleDismiss} data-testid={'modal-backdrop'} />
			<div className={styles.drawer} data-testid={'modal-drawer'}>{children}</div>
		</div>
	);
}
