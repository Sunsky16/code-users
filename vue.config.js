const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

    transpileDependencies: true,
    devServer: {
        //设定host
        host: 'localhost',
        //修改dev期间的端口号
        port: 3000,
        //自动打开浏览器
        open: true,
        //代理地址
        proxy: 'http://www.escook.cn',
        // proxy: {
        //     '/atguigu': {
        //         target: 'http://www.escook.cn',
        //         pathRewrite: { '^/atguigu': '' }
        //     }
        // }

    }
})