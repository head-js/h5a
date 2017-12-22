# analytics.js-integration-latte-bank-stats

Latte Bank Stats integration for [Analytics.js](https://segment.com/docs/sources/website/analytics.js/).

# Quick Start

0. 引用
==

在 `layout.html` 的尽量早的地方引用通用组件，页面上将得到一个 `h5a` 全局函数。[源码](./tracking/)

```html
<head>
<#include 'web/partials/tracking.ftl' />
</head>
```

1. 初始化
==

在 `layout.html` 的尾部引用自有组件 tracking.ftl，通常来说在这里你可以做初始化，以及记录 pageview 这个点；之所以做成一个组件，只是因为在实际的场景中大多数项目的大多数页面可以使用同样的配置，但这并不是必须的，你也可以在某些场景下不引用这个组件，而是自行手工处理。

```html
<#include 'partials/tracking.ftl' />
</body>
</html>
```

典型的初始化方式如下：

```javascript
<script>
  h5a('init', {
    'Google Analytics': {
      trackingId: 'UA-XXXXXXX-XX',
    },
    'Latte Bank Stats': {
      gif: head.LATTE_BANK_STATS_GIF, // ** required
      defaults: function () { // ** optional
        return {};
      },
    },
  });

  h5a('send', 'page'); // ** analytics.js 的规范是 page，这个点在我们的埋点系统中叫做 pageview
</script>
```

2. pageName
==

你的 `layout.html` 里面应该有 `<meta name="h5a" content="page-name=${H5A_PAGE_NAME!}" />` 用来存一些“定制”的参数，并在 `Controller` 里配置这些参数 `request.setAttribute("H5A_PAGE_NAME", "还呗MGM活动页");`。


3. 手工埋点
==

```javascript
h5a('send', 'track', 'ACTION_NAME_动作名称_多为中文', {
  extra: 'values',
  another: 'values',
});

// e.g.
// Who       When                Where         Why    What  How
// [当前用户] [timestamp/eventId] 获取验证码按钮  [再次]  点击   [成功]

// EXPERT
h5a('send', 'track', 'ACTION_NAME', properties, options);
```

考虑到兼容旧埋点的实践，可以通过如下方式手动覆盖 pageName，但是不推荐继续这么做！

```javascript
h5a('send', 'track', 'ACTION_NAME_动作名称_多为中文', { // e.g. 注册按钮点击
  event: 'PAGE_NAME_页面名称_多为中文', // e.g. MGM活动页面
  extra: 'values',
  another: 'values',
});
```

4. adapter 中已“自动”处理的“通用参数”，即客户端（通过 url）传给我什么，我就传给 stats，这部分数据对 h5 埋点是透明的
==

```
p_o
p_i
p_u
p_c

r_c

t_c (兼容 channel，详情见培训)

pageId
pageName
previousPageId
viewId
previousViewId
correlationId
```

5. adapter 中已“自动”处理的“规范参数”
==

```
timestamp = 1 * new Date();
eventId = uuid.uuid4();
```

6. adapter 中已“自动”处理的“常用参数”
==

```
utm_campaign
utm_source
utm_medium
utm_term
utm_content
```

7. 以上未提到的参数，如有需要应该自行在 data 中传入
==

# Development

1. 各环境的默认配置如下

```
env == "dev"
head.LATTE_BANK_STATS_GIF = '/{contextPath}/rsrc/web/collect.gif';
<script src="/{contextPath}/rsrc/web/analytics.js" />

env == "sit"
head.LATTE_BANK_STATS_GIF = 'http://stats.sit.lattebank.com/stats/shoot';
<script src="/{contextPath}/rsrc/web/analytics.js" />

env == "prod"
head.LATTE_BANK_STATS_GIF = 'https://stats.api.lattebank.com/stats/shoot';
<script src="/{contextPath}/rsrc/web/analytics.js" />
```

2. 在本地开发的时候你可以自行指定懒加载的脚本地址，即不要 `include web/partials/tracking.ftl`，自行把代码复制过来改掉即可，例如

```
<script>
var head = window.head || head;
head.LATTE_BANK_STATS_GIF = 'https://example.com/collect.next.gif';
...
}(window,document,"script",'/{contextPath}/analytics.next.js',"h5a");
</script>
```

3. 如果在某些项目中发送了异常的数据到 stats 导致数据清理工作加重，可以将打点 gif 指向一个备用地址，切掉这部分流量，注意在此情况下，你仍然是 `include web/partials/tracking.ftl`，只是新增一行代码覆盖掉 gif 的默认配置，例如

```
<script>
head.LATTE_BANK_STATS_GIF = 'https://example.com/collect.hotfix.gif';
</script>
```

# 开发

```bash
$ npm run build
$ gulp dev
```

1. 新生成的 analytics.js 将覆盖 jar-web 中的 analytics.js，这是一个没有压缩的版本，你可以引用本地 jar-web 方便地进行测试

```bash
$ npm run build
$ npm run dist
$ npm run next
```

1. 手动将新生成的 analytics.js 引用到某个你指定的应用，部署到 sit 环境或你手动指定的某个 prod 环境进行测试
2. 注意手动修改 package.json 中的 version
3. 测试通过后将 analytics.js 覆盖 jar-web 中的 analytics.js

# 友商

1. [神策分析](https://sensorsdata.cn/index.html), [github](https://github.com/sensorsdata/sa-sdk-javascript/)
2. [诸葛io](https://zhugeio.com/)
3. [数说 - 微信H5传播监测](http://chuanbo.datastory.com.cn/)
4. [DataEye - 泛娱乐基础数据服务提供商](https://www.dataeye.com/?lang=zh)
5. [inspectlet - Playback everything visitors do on your site](http://www.inspectlet.com/)
6. [Optimizely X](https://www.optimizely.com/)
7. [Fox Metrics](http://www.foxmetrics.com/)
8. [mixpanel](https://mixpanel.com/), [github](https://github.com/mixpanel)
9. [localytics](https://www.localytics.com/features/)
10. [amplitude](https://amplitude.com/)
11. [cobub - 开源移动应用统计](http://www.cobub.com/), [docs](http://www.cobub.com/docs/)
