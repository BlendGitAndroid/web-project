// 导出软件包
module.exports = function (a, b) {
    return a + b
}

// 发布软件包
// npm login
// npm publish --access public

// 更新版本号
// 更新主要版本号： npm version major
// 更新次要版本号： npm version minor
// 更新补丁版本号： npm version patch

// 撤销已发布的软件包
// 1. 只有在发布软件包的24小时内才允许撤销
// 2. 软件包撤销后 24 小时以后才能重新发布
// 3. 重新发布时需要修改包名称和版本号
// npm unpublish <pkg> --force