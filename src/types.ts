// shared core states

export type AsyncStatus = 'loading' | 'error' | 'success';
export type AsyncDeferStatus = 'idle' | AsyncStatus;
export type AsyncError<E = unknown> = E extends Error ? E : Error;

type AsyncCoreResult<S extends AsyncDeferStatus, T, E, L extends boolean> = {
    status: S;
    data: T;
    error: E;
    isLoading: L;
}

export type AsyncSuccessResult<T> = AsyncCoreResult<'success', T, undefined, false>;

export type AsyncErrorResult<E extends AsyncError = AsyncError> = AsyncCoreResult<'error', undefined, E, false>;

export type AsyncLoadingResult = AsyncCoreResult<'loading', undefined, undefined, true>;

export type AsyncIdleResult = AsyncCoreResult<'idle', undefined, undefined, false>; 

// return types

export type UseWaitReturn<TResult, TError = unknown> = 
  | AsyncSuccessResult<TResult>
  | AsyncErrorResult<AsyncError<TError>>
  | AsyncLoadingResult;

export type UseDeferedWaitReturn<
    TArgs extends any[],
    TResult,
    TError = unknown
> = (
  | AsyncSuccessResult<TResult>
  | AsyncErrorResult<AsyncError<TError>>
  | AsyncLoadingResult
  | AsyncIdleResult
) & {
    run: DeferedAsyncFn<TArgs, TResult>;
}

export type DeferedAsyncFn<TArgs extends any[], TResult> = (...args: TArgs) => Promise<TResult>;