# Lattebank Front End Analytics

Analytics Integrations
==
| Integration | ID |
| --------   | -----:   | :----: |
| Google Analytics | Google Analytics |
| Lattebank Analytics | Latte Bank Stats | 
> ID 表示Integration唯一性标识，用在init时的关键参数

CHANGELOG
==
0.2.0
--
1. 整体重构优化版本
2. core, integration-google-analytics维持原来的版本
3. integration-lattebank-analytics版本迭代，升级至 0.1.7

命名约定
==
1. 如果需要为新的统计平台新增扩展的 integration，请在packages目录下新建项目，项目名称 *analytics.js-integration-{provider}-analytics*