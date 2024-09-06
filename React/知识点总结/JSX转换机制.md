在 React 17 及更高版本中，React 引入了新的 JSX 转换机制，使得你不再需要显式导入 [`React`] 来使用 JSX。这是通过 Babel 或 TypeScript 配置来实现的。

### React 17+ 新的 JSX 转换

在 React 17 及更高版本中，你可以使用新的 JSX 转换机制，这样就不需要显式导入 [`React`]。以下是如何配置 Babel 和 TypeScript 以支持新的 JSX 转换。

#### Babel 配置

如果你使用 Babel，可以在 `.babelrc` 或 `babel.config.js` 中配置：

```json
{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "automatic"
    }]
  ]
}
```

#### TypeScript 配置

如果你使用 TypeScript，可以在 `tsconfig.json` 中配置：

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

### 示例代码

以下是一个使用新的 JSX 转换机制的示例，不需要显式导入 [`React`]：

#### 旧的写法（React 17 之前）

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <h1>Hello, world!</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

#### 新的写法（React 17+）

```tsx
import ReactDOM from 'react-dom';

function App() {
  return <h1>Hello, world!</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### `createElement` 的使用

虽然在新的 JSX 转换机制下不需要显式导入 [`React`]，但 `createElement` 仍然是 JSX 转换的基础。JSX 语法会被编译器转换为 `React.createElement` 调用。

#### 手动使用 `createElement`

即使在 React 17+ 中，你仍然可以手动使用 `createElement`：

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

const element = React.createElement('h1', null, 'Hello, world!');

ReactDOM.render(element, document.getElementById('root'));
```

### 总结

在 React 17 及更高版本中，你可以通过配置 Babel 或 TypeScript 来使用新的 JSX 转换机制，从而不需要显式导入 [`React`]。然而，`createElement` 仍然是 JSX 转换的基础，你可以手动使用它来创建 React 元素。

在 React 17 及更高版本中，React 引入了新的 JSX 转换机制，使得你不再需要显式导入 [`React`]来使用 JSX。这是通过 Babel 或 TypeScript 配置来实现的。以下是具体的实现方式和原理：

### 新的 JSX 转换机制

新的 JSX 转换机制通过 Babel 或 TypeScript 配置，将 JSX 语法转换为 JavaScript 代码时，不再依赖 [`React.createElement`]，而是使用新的自动导入机制。

### Babel 配置

如果你使用 Babel，可以在 `.babelrc` 或 `babel.config.js` 中配置 `@babel/preset-react`，并启用 `runtime: 'automatic'` 选项：

```json
{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "automatic"
    }]
  ]
}
```

### TypeScript 配置

如果你使用 TypeScript，可以在 `tsconfig.json` 中配置 `jsx` 选项为 `react-jsx`：

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

### 实现原理

新的 JSX 转换机制通过 Babel 或 TypeScript 编译器，将 JSX 语法转换为 JavaScript 代码时，自动导入必要的函数，而不需要显式导入 [`React`]。以下是具体的转换示例：

#### 旧的 JSX 转换（React 17 之前）

在 React 17 之前，JSX 会被转换为 [`React.createElement`]：

```jsx
import React from 'react';

const element = <h1>Hello, world!</h1>;

// 转换后
const element = React.createElement('h1', null, 'Hello, world!');
```

#### 新的 JSX 转换（React 17 及更高版本）

在 React 17 及更高版本中，JSX 会被转换为新的自动导入函数，不再需要显式导入 [`React`]：

```jsx
const element = <h1>Hello, world!</h1>;

// 转换后，是通过jsx函数
import { jsx as _jsx } from 'react/jsx-runtime';
const element = _jsx('h1', { children: 'Hello, world!' });
```

### `jsx-runtime` 和 `jsx-dev-runtime`

React 17 引入了两个新的运行时模块：

- `react/jsx-runtime`：用于生产环境的 JSX 转换。
- `react/jsx-dev-runtime`：用于开发环境的 JSX 转换，包含额外的开发工具支持。

### 总结

通过配置 Babel 或 TypeScript，React 17 及更高版本的 JSX 转换机制可以自动导入必要的函数，而不需要显式导入 [`React`]。这使得代码更加简洁，同时保持了与旧版本的兼容性。