import { useEffect, useState } from "react";

export function useDebouncer(query: string, timer: number) {
    const [value, setValue] = useState(query)

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setValue(query)
        }, timer);

        return () => clearTimeout(timeoutID)
    }, [query, timer])

    return value
}