import type { AsyncStatus, UseWaitReturn } from "@/types";
import { useEffect, useState } from "react";

export function useWait<
    TResult,
    Error = unknown
>(promise: Promise<TResult>) {
    const [status, setStatus] = useState<AsyncStatus>('loading');
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
                    setStatus('success');
                }
            })
            .catch((error) => {
                if (isMounted) {
                    setError(error);
                    setStatus('error');
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

    return { status, data, error, isLoading } as UseWaitReturn<TResult, Error>;
}