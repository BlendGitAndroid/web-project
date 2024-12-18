// ^5.12.5: 主要版本不变，更新次要版本和补丁版本
// ~5.12.5: 主要版本和次要版本不变，更新补丁版本
// 5.12.5: 使用确切版本，即主要版本，次要版本，补丁版本固定
// 查看具体的版本:npm list --depth=0
// 查看软件包源数据:npm view lodash
// 下载指定版本的软件包:npm install lodash@4.17.21
// 删除软件包:npm uninstall lodash
// 查看发生变化的软件包:npm outdated
// 更新软件包:npm update lodash
// 项目依赖安装:npm install lodash --save
// 开发依赖安装:npm install lodash --save-dev，npm install lodash -D
// 在开发坏境中下载所有依赖软件包: npm install
// 在生产环境中只下载项目依赖软件包: npm install --prod
// 本地安装：将软件包下载到应用根目录下的 node_modules 文件夹中，软件包只能在当前应用中使用。
// 全局安装：将软件包下载到操作系统的指定目录中，可以在任何应用中使用。
// 全局安装软件包:npm install nodemon -g
// 查看全局软件包安装位置： npm root -g
// 查看全局软件包:npm list -g --depth=0


// 获取 npm 配置
// npm config list -l --json
// -l 列表所有默认配置选项
// --json 以 json 格式显示配置选项
// 获取 npm 用户配置文件: npm config get userconfig
// 获取 npm 下载地址： npm config get registry
// 更改 npm 镜像地址： npm config set registry https://registry.npm.taobao.org


// npx
// npx 是 npm 5.2.0 版本引入的一个工具，用于执行 node_modules/.bin 目录下的命令
// 主要用途有两个，第一个是临时安装软件包执行后删除它，第二个是执行本地安装的提供命令的软件包。
// 1. 临时安装软件包执行后删除软件包
// 有些提供命令的软件包使用的频率并不高，比如 create-react-app 脚手架工具，我能不能临时下载
// 使用，然后再删掉它。
// 2. 执行本地安装的软件包
// 现在有两个项目都依赖了某个命令工具软件包，但是项目 A 依赖的是它的 1 版本，项目 B 依赖的
// 是它的 2 版本，我在全局到底应该安装什么版本呢 ?
// 该软件包可以在本地进行安装，在 A 项目中安装它的 1 版本, 在 B 项目中安装它的 2 版本，在应用
// 中可以通过 npx 调用 node_modules 文件夹中安装的命令工具。
// 将所有软件包安装到应用本地是现在最推荐的做法，一是可以防止软件包的版本冲突问题，二是其他开
// 发者在恢复应用依赖时可以恢复全部依赖，因为软件包安装到本地后会被 package.json 文件记录，其他
// 开发者在运行项目时不会因为缺少依赖而报错。
// 如:npm install nodemon，将 nodemon 安装到本地，全局使用nodemon就会报错。nodemon index说找不到命令。
// 这个时候就可以通过：npx nodemon index来调用，通过 npx 调用 nodemon 命令。



const _ = require("lodash")
const array = ["a", "b", "c", "d"]
// chunk 对数组中的元素进行分组
// 参数一表示要进行操作的数组
// 参数二表示每一组中包含的元素个数
console.log(_.chunk(array, 2)) // [ [ 'a', 'b' ], [ 'c', 'd' ] ]


// 配置入口文件的作用
// 应用程序入口文件就是应用程序执行的起点，就是启动应用程序时执行的文件。
// 场景一：其他开发者拿到你的软件包以后，通过该文件可以知道应用的入口文件是谁，通过入口文件启动应用。
// 场景二：通过 node 应用文件夹 命令启动应用。node 命令会执行 package.json 文件中 main 选项指定
// 的入口文件，如果没有指定入口文件，则执行 index.js。
// 如 node npm，先去查找package.json，会执行 npm 文件夹下的 index.js 文件。

// 模块查找规则
// 一：在指定了查找路径的情况下，先查找文件，再查找文件夹
// require("./server")
// 1. 查找 server.js
// 2. 查找 server.json
// 3. 查找 server 文件夹, 查看入口文件 (package.json -> main)
// 4. 查找 server 文件夹 中的 index.js 文件
// 二：没有指定查找路径的情况下
// require("server")
// 1. 查找 node_modules 文件夹下的 server 文件夹，然后按照上面的规则查找
// 2. 如果没有找到，会向上一级目录查找 node_modules 文件夹，然后按照上面的规则查找
// 3. 如果一直找到根目录还没有找到，则会报错