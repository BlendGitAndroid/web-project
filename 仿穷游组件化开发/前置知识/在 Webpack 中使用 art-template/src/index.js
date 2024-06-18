console.log('index');

// 首先，它使用 console.log('index') 打印出一个字符串 'index'。这通常用于调试或跟踪代码的执行过程。
// 然后，它导入了一个名为 render 的函数，这个函数来自于一个名为 index.art 的文件。这个文件是一个 Art Template 模板文件。
// Art Template 是一个简单而强大的 JavaScript 模板引擎，它可以帮助你生成动态的 HTML 内容。
// import render from './index.art' 这行代码的意思是，从当前目录下的 index.art 文件中导入默认导出的模块，
// 并将其赋值给 render 变量。在这个例子中，index.art 文件应该导出一个函数，这个函数接受一个对象作为参数，返回一个渲染后的 HTML 字符串。
// 最后，console.log(render({ page: '首页' })) 这行代码调用了 render 函数，并传入了一个对象 { page: '首页' } 作为参数。
// 这个对象的属性和值将被用于填充 index.art 模板中的占位符。然后，render 函数返回一个渲染后的 HTML 字符串，这个字符串被打印出来。
// 总的来说，这段代码的主要目的是使用 Art Template 模板引擎生成一个动态的 HTML 页面，并将其打印出来。
// 这是一个模板引擎
import render from './index.art';

// 传入数据，得到渲染后的 HTML 字符串
console.log(render({ page: '首页' }));

// template('id', {})
