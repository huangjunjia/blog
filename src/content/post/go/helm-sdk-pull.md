---
title: "Go 如何使用 Helm SDK 初始化一个 Helm Client"
description: "Helm 官方提供了一个 go sdk，可以在 go 中自由的组合指令和行为"
publishDate: "2024/3/5"
updatedDate: "2024/3/15"
tags: ["go", "helm"]
draft: true
---

## 什么是 Helm pull？

这个指令的作用是从仓库中下载 chart。

这对于获取包以进行检查、修改或重新打包非常有用。它还可用于在不安装图表的情况下执行图表的加密验证。

### 引入相关依赖

在 `go.mod` 中引入 `helm.sh/helm/v3`，或在 go 项目中执行：

```shell
go get helm.sh/helm/v3
```

可以在 `go.mod` 和 `go.sum` 文件中查看是否添加相关依赖。

### 开始

在使用 sdk 之前，我们需要初始化 helm client 所需要的 settings 和 config：

```go title="main.go"
import (
  "log"
  "os"

  "helm.sh/helm/v3/pkg/action"
  "helm.sh/helm/v3/pkg/cli"
)

func main() {
  /** 首先我们需要创建一个 settings 实例 */
  settings := cli.New()

  // 以下代码按需调整，最常用应该是修改 namespace 和 repository
  // 修改 namespace
  settings.SetNamespace(<your_namespace>)

  // 修改 repository
  settings.RepositoryConfig = "https://repository.pkg.go.com"

  /** 其次我们需要根据 settings 获取 config 实例 */
  logger := log.Default()

  // 首先通过 new 创建一个 config 实例
  config := new(action.Configuration)
  // 根据 settings 中设置的值执行初始化操作
  err := onfig.Init(
		settings.RESTClientGetter(),
		settings.Namespace(),
		os.Getenv("HELM_DRIVER"),
		logger.Printf
  )
  if err != nil {
    panic(err)
  }

  /** 实例化 client */
  // 准备创建 client 所使用的配置项
  opts := []registry.ClientOption{
		registry.ClientOptDebug(settings.Debug),
		registry.ClientOptEnableCache(true),
		registry.ClientOptWriter(os.Stdout),
		registry.ClientOptCredentialsFile(settings.RegistryConfig),
	}

	// 生成一个 client
	client, err := registry.NewClient(opts...)
	if err != nil {
		panic(err)
	}

  // 将 client 设置为 config 的 RegistryClient
  config.RegistryClient = client
}
```

到此，我们就完成了一个 helm client 的初始化
