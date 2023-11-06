import { useRef, useEffect } from 'react';

type Timer = ReturnType<typeof setTimeout>;

export function useDebounce<Function extends (...args: any[]) => void>(
	func: Function,
	delay = 1000
) {
	const timer = useRef<Timer>();

	useEffect(() => {
		return () => {
			if (!timer.current) return;

			clearTimeout(timer.current);
		};
	}, []);

	const debouncedFunction = ((...args) => {
		const newTimer = setTimeout(() => func(...args), delay);

		clearTimeout(timer.current);
		timer.current = newTimer;
	}) as Function;

	return debouncedFunction;
}
