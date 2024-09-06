[`useReducer`] 是 React 中的一个 Hook，用于在函数组件中管理复杂的状态逻辑。它类似于 [`useState`]，但允许你通过 reducer 函数来更新状态。以下是 [`useReducer`] 的原理和实现细节。

### [`useReducer`] 的工作原理

1. **初始化状态**：
   - 在组件首次渲染时，[`useReducer`]会初始化状态，并将其存储在当前 Fiber 节点的 [`memoizedState`] 中。

2. **状态更新**：
   - 当状态更新时，[`dispatch`] 函数会触发 reducer 函数，计算新的状态，并将其存储在 [`memoizedState`] 中。

3. **状态链表**：
   - [`useReducer`] 的状态存储在一个链表中，每个链表节点对应一个 Hook 的状态。React 通过遍历这个链表来管理和更新 Hook 的状态。

### [`useReducer`] 的实现细节

以下是一个简化的 [`useReducer`]实现，展示了它如何在 React 内部工作：

```javascript
let currentlyRenderingFiber = null;
let workInProgressHook = null;

function useReducer(reducer, initialArg, init) {
  // 获取当前 Fiber 节点
  const fiber = currentlyRenderingFiber;

  // 获取当前 Hook
  let hook;
  if (workInProgressHook === null) {
    // 初始化 Hook
    hook = {
      memoizedState: init !== undefined ? init(initialArg) : initialArg,
      baseState: init !== undefined ? init(initialArg) : initialArg,
      queue: {
        pending: null
      },
      next: null
    };
    workInProgressHook = hook;
    fiber.memoizedState = hook;
  } else {
    // 更新 Hook
    hook = workInProgressHook;
    workInProgressHook = hook.next;
  }

  // 获取当前 Hook 的状态
  const queue = hook.queue;
  const pending = queue.pending;
  if (pending !== null) {
    let first = pending.next;
    let newState = hook.baseState;
    do {
      const action = first.action;
      newState = reducer(newState, action);
      first = first.next;
    } while (first !== pending.next);
    hook.baseState = newState;
    hook.memoizedState = newState;
    queue.pending = null;
  }

  // 返回状态和更新函数
  const dispatch = (action) => {
    const update = {
      action,
      next: null
    };
    if (queue.pending === null) {
      update.next = update;
    } else {
      update.next = queue.pending.next;
      queue.pending.next = update;
    }
    queue.pending = update;
    scheduleUpdateOnFiber(fiber);
  };

  return [hook.memoizedState, dispatch];
}

function scheduleUpdateOnFiber(fiber) {
  // 触发组件重新渲染
  // 具体实现略
}
```

### 详细步骤

1. **初始化状态**：
   - 在首次渲染时，[`useReducer`] 会初始化一个 Hook 对象，并将初始状态存储在 [`memoizedState`] 中。
   - 如果提供了 `init` 函数，则使用 `init` 函数初始化状态。

2. **状态更新**：
   - 当状态更新时，[`dispatch`]函数会创建一个更新对象，并将其添加到更新队列中。
   - [`scheduleUpdateOnFiber`] 函数会触发组件重新渲染。

3. **状态链表**：
   - 在每次渲染过程中，React 会遍历 Hook 状态链表，确保每个 Hook 的状态和调用顺序一致。
   - 在状态更新时，[`useReducer`] 会遍历更新队列，依次应用每个更新，计算新的状态。

### 示例

以下是一个使用 [`useReducer`]的示例：

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}
```

在这个示例中，`Counter` 组件使用了 [`useReducer`]来管理计数器的状态。[`reducer`] 函数定义了如何根据不同的 `action` 更新状态。

### 总结

[`useReducer`] 是 React 中用于在函数组件中管理复杂状态逻辑的 Hook。它的工作原理包括初始化状态、状态更新和状态链表管理。通过 [`useReducer`]，React 能够高效地管理和更新函数组件中的复杂状态，从而实现高性能的状态管理和渲染。

[`useState`] 是 React 中最常用的 Hook 之一，用于在函数组件中添加状态。它的原理涉及到 React 的 Fiber 架构和 Hook 状态链表。以下是 [`useState`]的工作原理和实现细节。

### [`useState`] 的工作原理

1. **初始化状态**：
   - 在组件首次渲染时，[`useState`]会初始化状态，并将其存储在当前 Fiber 节点的 `memoizedState` 中。

2. **状态更新**：
   - 当状态更新时，[`useState`]会触发组件重新渲染，并在新的渲染过程中使用更新后的状态。

3. **状态链表**：
   - [`useState`]的状态存储在一个链表中，每个链表节点对应一个 Hook 的状态。React 通过遍历这个链表来管理和更新 Hook 的状态。

### [`useState`]的实现细节

以下是一个简化的 [`useState`] 实现，展示了它如何在 React 内部工作：

```javascript
let currentlyRenderingFiber = null;
let workInProgressHook = null;

function useState(initialState) {
  return useReducer(basicStateReducer, initialState);
}

function basicStateReducer(state, action) {
  return typeof action === 'function' ? action(state) : action;
}

function useReducer(reducer, initialArg, init) {
  // 获取当前 Fiber 节点
  const fiber = currentlyRenderingFiber;

  // 获取当前 Hook
  let hook;
  if (workInProgressHook === null) {
    // 初始化 Hook
    hook = {
      memoizedState: init !== undefined ? init(initialArg) : initialArg,
      baseState: init !== undefined ? init(initialArg) : initialArg,
      queue: {
        pending: null
      },
      next: null
    };
    workInProgressHook = hook;
    fiber.memoizedState = hook;
  } else {
    // 更新 Hook
    hook = workInProgressHook;
    workInProgressHook = hook.next;
  }

  // 获取当前 Hook 的状态
  const queue = hook.queue;
  const pending = queue.pending;
  if (pending !== null) {
    let first = pending.next;
    let newState = hook.baseState;
    do {
      const action = first.action;
      newState = reducer(newState, action);
      first = first.next;
    } while (first !== pending.next);
    hook.baseState = newState;
    hook.memoizedState = newState;
    queue.pending = null;
  }

  // 返回状态和更新函数
  const dispatch = (action) => {
    const update = {
      action,
      next: null
    };
    if (queue.pending === null) {
      update.next = update;
    } else {
      update.next = queue.pending.next;
      queue.pending.next = update;
    }
    queue.pending = update;
    scheduleUpdateOnFiber(fiber);
  };

  return [hook.memoizedState, dispatch];
}

function scheduleUpdateOnFiber(fiber) {
  // 触发组件重新渲染
  // 具体实现略
}
```

### 详细步骤

1. **初始化状态**：
   - 在首次渲染时，[`useState`]会调用 `useReducer`，并传递一个基本的状态 reducer（`basicStateReducer`）。
   - `useReducer` 会初始化一个 Hook 对象，并将初始状态存储在 `memoizedState` 中。

2. **状态更新**：
   - 当状态更新时，`dispatch` 函数会创建一个更新对象，并将其添加到更新队列中。
   - `scheduleUpdateOnFiber` 函数会触发组件重新渲染。

3. **状态链表**：
   - 在每次渲染过程中，React 会遍历 Hook 状态链表，确保每个 Hook 的状态和调用顺序一致。

### 总结

[`useState`] 是 React 中用于在函数组件中添加状态的 Hook。它的工作原理包括初始化状态、状态更新和状态链表管理。通过 [`useState`]，React 能够高效地管理和更新函数组件中的状态，从而实现高性能的状态管理和渲染。