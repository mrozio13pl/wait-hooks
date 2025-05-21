export type UseWaitReturn<T extends Promise<T>, Error = unknown> = {
    data: T;
    error: undefined;
    isLoading: false;
} | {
    data: undefined;
    error: Error;
    isLoading: false;
} | {
    data: undefined;
    error: undefined;
    isLoading: true;
};

export type UseDeferedWaitReturn<
    TArgs extends any[],
    TResult,
    TError = unknown
> = ({
    data: TResult;
    error: undefined;
    isLoading: false;
} | {
    data: undefined;
    error: undefined;
    isLoading: boolean;
} | {
    data: undefined;
    error: TError;
    isLoading: false;
}) & {
    run: DeferedAsyncFn<TArgs, TResult>;
}

export type DeferedAsyncFn<TArgs extends any[], TResult> = (...args: TArgs) => Promise<TResult>;