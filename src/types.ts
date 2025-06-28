// shared core states

type AsyncSuccess<T> = {
    data: T;
    error: undefined;
    isLoading: false;
};

type AsyncError<E = unknown> = {
    data: undefined;
    error: E;
    isLoading: false;
};

type AsyncLoading = {
    data: undefined;
    error: undefined;
    isLoading: true;
};

type AsyncIdle = {
    data: undefined;
    error: undefined;
    isLoading: false;
};

// return types

export type UseWaitReturn<TResult, TError = unknown> = 
  | AsyncSuccess<TResult>
  | AsyncError<TError>
  | AsyncLoading;

export type UseDeferedWaitReturn<
    TArgs extends any[],
    TResult,
    TError = unknown
> = (
  | AsyncSuccess<TResult>
  | AsyncError<TError>
  | AsyncLoading
  | AsyncIdle
) & {
    run: DeferedAsyncFn<TArgs, TResult>;
}

export type DeferedAsyncFn<TArgs extends any[], TResult> = (...args: TArgs) => Promise<TResult>;