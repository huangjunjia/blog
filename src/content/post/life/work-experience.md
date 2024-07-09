---
title: "工作经历"
description: "简单记录一下工作经历和项目内容，内容将会脱敏"
publishDate: "2024/7/9"
updatedDate: ""
tags: ["人生"]
draft: false
---

# 初衷

突然之间想整理整理在工作不同阶段中自己的成长，看看自己到底掌握了哪些技能。

# 时间轴

## 2021/05/24 - 至今

目前任职的是一家 to B 业务为主的公司，在垂直行业名列前茅。

公司前端团队负责内容较广，不是单纯意义的前端，前端组同事大致工作内容：

1. 同事 A 主要负责 SRE 部份，常用开发语言是 go 和 python，是个 k8s 大神，同时负责维护公司多数部署于 k8s 的服务；
2. 同事 B 负责底层架构，在 k8s 基础上使用 go 开发中间服务，向上涉及多服务编排，向下开发裸金属服务；
3. 同事 C 负责多服务对接，基于 node 实现一套以 GraphQL 为主、OpenAPI 为辅的高性能 web 服务；
4. 同事 D 负责页面实现，对技术有较高追求，使用多种协议 or 架构与不同体系的后端服务对接并绘制页面。

介绍完了我们前端组的工作内容，接下来介绍里面其中一个小兵的我的工作内容和职责吧。

我的工作内容主要在 3 和 4，从进入公司后就不再是单纯的前端仔，在开发页面、后端服务的同时，组内一些使用 shell、go、node 编写的脚本也由我负责开发和维护。

### 项目

#### 项目 1：多集群管理系统

**项目描述**

这是一个多集群统一运维的 UI 界面，主要负责集群日常维护和管理，其次提供维护相关基于 k8s 编排、构建的服务的能力。

**工作职责**

负责多集群服务对接，抹平集群架构、版本、平台之间的差异，开发和维护服务与对外 API，对接 k8s 服务或其他类型服务。

**技术栈**

这里就整理我所使用过的技术吧，不整理完整项目的了

- 整体项目基于 monorepo 组织和维护，其中包含多个 private package，包括不限于：
  - ui：前端页面；
  - server：为前端提供底层服务组合和编排的能力；
  - utils：工具库；
  - types：类型库。
- typescript：所有库均使用 ts，用于实现严谨的类型声明和静态检测能力；
- 前端 UI：react + redux + react-router + graphql + apollo-client；
- 后端 Server：
  - postgres：数据库服务；
  - prisma@1：用于配合 graphql schema 生成一系列 postgres 数据结构和表，以及提供相关的 orm 操作；
  - apollo-server：graphql server；
  - nexus：生成接口类型描述和实现，以及自定义接口；
  - xstate：status machine，用于控制部份资源、操作状态扭转；
  - graphql compiler：常用于处理 nexus 生成的 graphql schema 和 prisma 所使用的 graphql schema 间差异或自定义；
  - cronjob：用于实现定时任务。

**工作内容**

- 负责前端页面实现，基于 graphql schema + graphql-codegen 实现表单、选择器组件、接口 hooks 等组件的自动化生成功能，减少重复代码工作；
- 负责基础组件库维护，提供弹窗、popover、时间选择器等多种基础、业务组件；
- 负责后端底层服务差异抹平，开发并维护 connector 层用于抹平多个集群之间的差异，在 server 层可直接调用 connector 而不再需要关注集群差异；
- 负责后端底层服务编排，维护 graphql schema 并通过 prisma 生成 postgres 表结构和 orm 原子操作，使用 nexus 生成对前端的接口 graphql schema 用于描述操作和资源类型，减少重复的 restful api 声明和实现；
- 负责 k8s 服务调用和管理，通过 cronjob 定时同步 k8s 服务状态，开发独立 node 进程确保特定资源可不受 server 影响快速同步资源；
- 负责 k8s、helm、docker API SDK，基于 k8s-node-client 实现 k8s resources 操作，基于 node child_process 实现 helm 和 docker 操作；
- 负责前端部份 eslint rules 维护和开发，规则包括：根据引用包名或其他关键信息限制开发者引用方式，限制开发者在代码中直接使用中文等；
- 负责前端部份微前端方案确定，基于 MFD 实现微前端方案，拆分巨石应用，加速主 UI 构建速度，同时基于 postcss-prefix-selector 实现 css 样式隔离，避免样式污染；
- 负责 grafana ui 精简，实现最小可运行的 grafana ui 并可嵌入任意前端项目，实现最小 grafana ui 渲染方案，可对接任意在支持版本范围内的 grafana 后端，并正确加载和挂载 plugins。

#### 项目 2：流量可视化

**项目描述**

用于展示应用之间或者虚拟机和集群之间的流量信息，通过拓扑图和表格能够快速或者详细的查看流量详情

**工作职责**

负责前端实现，负责 grafana dashboard 及 provisioning 维护和配置。

**技术栈**

- grafana panel plugin 用于前端页面展示
- grafana datasource plugin 用于数据获取
- clickhouse 用于拼接查询语句

**工作内容**

- 使用 antv/g6 开发流量拓扑试图，并调整布局算法提高页面渲染和布局计算速度；
- 开发 datasource 用于调用 graphql api 查询应用数据；
- 编写 clickhouse sql 查询并转换数据用于页面展示，同时解决数据量大导致的查询过慢问题；
- 配置 dashboard 和 datasource provisioning，用于展示概览视图和流量可视化拓扑视图；
- 配置 docker-compose.yml 方便开发者快速搭建本地 grafana + ssl port-forward + nginx proxy 开发环境，方便调试和开发。

#### 项目 3：业务脚本

**项目描述**

编写和开发相关业务脚本，方便用户在极端场景下快速恢复相关数据或者执行业务操作。

**工作职责**

负责 shell、go、node 脚本开发和维护，实现部份业务侧底层操作。

**技术栈**

根据不同语言编写的脚本使用不同的技术方案：

- shell 脚本根据应用部署在虚拟化容器中使用 linux OS 所安装的库开发；
- go 脚本：
  - docker sdk
  - helm sdk
  - gitlab sdk
  - yaml sdk
- node 脚本：
  - commander
  - inquirer
  - chalk
  - ejs

**工作内容**

- shell 脚本用于数据恢复，调用 k8s api-server 获取数据并通过 grep 和 cut 指令截取业务数据，并将数据清洗后通过 graphql api 写入对应的 db 中；
- go 脚本实现服务升级包构建，通过 gitlab sdk 实现 gitlab 项目文件下载，使用 helm sdk 和 docker sdk 实现 helm charts 和 templates 生成、docker image 拉取和批量导出，使用 yaml sdk 和 json sdk 实现升级配置文件解析和生成，使用 http module 实现构建产物上传；
- node 脚本实现微前端子项目脚手架快速构建，结合 commander 和 inquirer 实现指令、flags 解析和交互式输入，使用 ejs 实现模版变量替换和生成。



