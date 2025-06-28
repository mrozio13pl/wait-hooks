import type { AsyncDeferStatus, DeferedAsyncFn, UseDeferedWaitReturn } from "@/types";
import { useCallback, useRef, useState } from "react";

export function useDeferWait<TArgs extends any[], TResult, TError = unknown>(
    asyncFn: DeferedAsyncFn<TArgs, TResult>,
) {
    const [status, setStatus] = useState<AsyncDeferStatus>('idle');
    const [data, setData] = useState<TResult>();
    const [error, setError] = useState<TError>();
    const [isLoading, setIsLoading] = useState(true);

    const callId = useRef(0);

    const run = useCallback(async (...args: TArgs) => {
        setIsLoading(true);
        setStatus('loading');
        setError(undefined);
        const currentCall = ++callId.current;

        try {
            const result = await asyncFn(...args);
            
            if (callId.current === currentCall) {
                setData(result);
                setStatus('success');
            }
            return result;
        } catch (err) {
            if (callId.current === currentCall) {
                setError(err as TError);
                setStatus('error');
            }
            throw err;
        } finally {
            if (callId.current === currentCall) {
                setIsLoading(false);
            }
        }
    }, [asyncFn]);

    return { status, data, error, isLoading, run } as UseDeferedWaitReturn<TArgs, TResult, TError>;
}