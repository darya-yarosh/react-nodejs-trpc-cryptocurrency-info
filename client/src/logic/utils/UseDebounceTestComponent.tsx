import { useEffect, useState } from "react";

import { useDebounce } from "logic/utils/useDebounce";

export default function TestComponent() {
    const [counter, setCounter] = useState<number>(0);

    function onClick() {
        reloadWithDefaultDelay(counter+1);
    }
    const reloadWithCustomDelay = useDebounce((value) => setCounter(value), 300);
    const reloadWithDefaultDelay = useDebounce((value) => setCounter(value));

    useEffect(() => {
        reloadWithCustomDelay(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <p data-testid="counter">{counter}</p>
            <button data-testid="button" onClick={onClick}></button>
        </div>
    )
}