---
title: "Go 如何使用 Helm SDK 实现 pull"
description: "Helm 官方提供了一个 go sdk，可以在 go 中自由的组合指令和行为"
publishDate: "2024/3/5"
updatedDate: ""
tags: ["go", "helm"]
draft: true
---

## 什么是 Helm pull？

这个指令的作用是从仓库中下载 chart。

这对于获取包以进行检查、修改或重新打包非常有用。它还可用于在不安装图表的情况下执行图表的加密验证。

## 如何实现 pull 操作

### 引入相关依赖

在 `go.mod` 中引入 `helm.sh/helm/v3`，或在 go 项目中执行：

```shell
go get helm.sh/helm/v3
```

可以在 `go.mod` 和 `go.sum` 文件中查看是否添加相关依赖。

### 初始化 Helm settings




