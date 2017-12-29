# Lattebank Front End Analytics (AKA: h5a)

### 快速上手
> 参照原来的旧版 [README.md](http://gitlab.sit.caijj.net/client-web/analytics.js-integration-latte-bank-stats/blob/develop/README.md)，少部分地方做了一些更新 [查看](http://gitlab.sit.caijj.net/client-web/latte-h5a/tree/master/docs/README.md)。你也可以只看这篇文档

### 如何集成到Web应用当中
所有打包发布的文件全部都在 dist 目录下，下面介绍具体用法
* tracking.min.js 定义核心 analytics 文件加载，base目录，库名，并缓存过早的打点请求。通常在header中引入
* analytics.js，核心 analytics 文件，里面包含了 analytics.core，h5a adapter以及一个微型的 loader 组件
* analytics.integration.{provider}.js，第三方基于 analytics 实现的 integration，由 analytics.js 动态根据接受到的 init 请求参数 动态加载

> 集成主要的改动集中体现在 web.jar 项目中，对应用端是透明的

### 如何使用
应用端的接口和原来保持一致，不需要做任何其他变更。应用端新增一个 timing 接口，具体使用方式
```javascript
h5a('send', 'timing');
```

### 开发构建
```bash
# 统一打包未压缩版本，方便开发调试
$ npm run dev
# 统一打包压缩版本，最终环境使用
$ npm run build
```


### 如何增加新的 integration 实现
如果在未来，你需要为新的统计平台新增扩展实现 integration，你需要做到
* 在packages目录下面，新建项目，命名规范需要统一
* 更新 adapter/integrations.js 注册信息
* 构建脚本会自动将所有 integrations 打包好的文件，按照版本打包到统一的dist目录下面

### Analytics Integrations

| Integration | ID | JS 文件 |
| --------   | -----:   | -----:   | :----: |
| Google Analytics | Google Analytics | analytics.integration.google.js |
| Lattebank Analytics | Latte Bank Stats | analytics.integration.lattebank.js |

> ID 表示Integration唯一性标识，用在init时的关键参数

> 代码中会定义 integrations 的注册信息，详见： [integrations.js](http://gitlab.sit.caijj.net/client-web/latte-h5a/blob/master/adapter/integrations.js)

### CHANGELOG
0.2.0
--
1. 整体重构优化版本
2. core, integration-google-analytics维持原来的版本
3. integration-lattebank-analytics版本迭代，升级至 0.1.7
4. 更新了 tracking.js，为了满足动态加载引入了 basePath 参数。需要同步到 ftl 模板里

### 命名约定
1. 如果需要为新的统计平台新增扩展的 integration，请在packages目录下新建项目，项目名称 *analytics.js-integration-{provider}-analytics*
2. 新的 integration 需要遵循统一的命名、构建和打包规范