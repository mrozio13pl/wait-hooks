import type { UseWaitReturn } from "@/types";
import { useEffect, useState } from "react";

export function useWait<
    TResult extends Promise<TResult>,
    Error = unknown
>(promise: TResult) {
    const [data, setData] = useState<TResult>();
    const [error, setError] = useState<Error>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        setIsLoading(true);
        setError(undefined);
        setData(undefined);

        promise
            .then((data) => {
                if (isMounted) {
                    setData(data);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    setError(error);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [promise]);

    return { data, error, isLoading } as UseWaitReturn<TResult, Error>;
}