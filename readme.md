<div style="text-align: center">
    <h3>tiny async hooks for react</h3>
    <a href="https://npm.im/wait-hooks"><img src="https://img.shields.io/npm/v/wait-hooks?label=%20&color=%234287f5" alt="npm version" /></a>
    <a href="https://bundlephobia.com/package/wait-hooks"><img src="https://img.shields.io/bundlephobia/minzip/wait-hooks?label=%20&color=%234287f5" alt="bundle size" /></a>
    <hr />
</div>

This package exposes two basic hooks: `useWait` and `useDeferWait`.

### `useWait`

is a simple hook that waits for a promise to resolve:

```tsx
import { useWait } from 'wait-hooks'; // 341 B

async function getData() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { message: 'Hello World' };
}

function Component() {
    const { status, data, isLoading, error } = useWait(getData);
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <div>
            Message: {data.message}
        </div>
    );
}
```

### `useDeferWait`

allows to defer the execution of an async function:

```tsx
import { useDeferWait } from 'wait-hooks'; // 429 B

async function getData() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { message: 'Hello World' };
}

function Component() {
    const { status, data, isLoading, error, run } = useDeferWait(getData);
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <div>
            <button onClick={() => run()}>Run</button>

            {data && <div>Message: {data.message}</div>}
        </div>
    );
}
```