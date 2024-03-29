---
title: "使用 Helm SDK 实现 helm pull"
description: "Helm 官方提供了一个 go sdk，可以在 go 中自由的组合指令和行为"
publishDate: "2024/3/29"
updatedDate: ""
tags: ["go", "helm"]
---

## 先说在前

本人 go 是 c 老师教的，很多用法不一定准确，很多表述不一定专业，我期望更多的时候是能够给你一个实现思路，或者说是我想自己记录实现过程，而不是手把手教会你最准确的答案。

## 什么场景下要使用 Helm SDK？

正常情况下，helm 一般用于查找、分享和使用软件构建 k8s 应用，通常是通过 cli 的方式使用。

如果我们需要在 go 脚本中使用 helm 实现相关自动化操作时，通过 exec 或者 spawn 执行时往往需要通过 stdout 处理执行结果，并序列化 stdout 中数据的部分来获取数据，这个操作是麻烦且不易维护的，所以在这个时候，如果有一个 Helm SDK 来实现会更加的便捷。

## helm pull 是用来做什么的？

这个指令的作用是从仓库中下载 chart。

这对于获取包以进行检查、修改或重新打包非常有用。它还可用于在不安装图表的情况下执行图表的加密验证。

## Go 脚本实现

### 引入 helm sdk

我们需要在项目中引入相关依赖，这里我们使用官方提供的 [go sdk](https://helm.sh/docs/topics/advanced/#go-sdk)

```shell title="bash"
go get helm.sh/helm/v3
```

随后在 `go.mod` 和 `go.sum` 中确认相关依赖是否成功安装，如果没有请重新安装。

### 创建 settings

helm sdk 使用的时候依赖 2 个配置：

1. helm 执行时所需的环境配置，我们在这里称为 settings
2. helm 所有指令执行依赖的配置项，我们称为 config

知道了要做什么事情，那我们先来创建一个 settings 吧，以下是代码示例：

```go title="settings.go"
import (
  "log"
  "os"

  "helm.sh/helm/v3/pkg/cli"
)

func createSettings() *cli.EnvSettings {
  settings := cli.New()
  settings.SetNamespace("default")
  settings.RepositoryConfig = "https://custom-repository.pkg.go.com"

  return settings
}
```

从上边的代码我们可以看到，settings 的初始化很简单，正常分为 3 个步骤：

1. 通过 helm cli pkg 的 `New` 函数创建一个 `EnvSettings` struct
2. 指定 namespace，这个如果没有特殊需求可以不用设置
3. 指定 repository，这个如果没有特殊需求可以不用设置

### 创建 config

config 与 settings 的区别主要在于含义上，settings 准确应该叫做 env settings，config 应该叫做 action config，我们这里取简称。

通过 helm action pkg 可以创建一个 config：

```go title="config.go"
import (
  "log"
  "os"

  "helm.sh/helm/v3/pkg/action"
)

function createConfig(settings *cli.EnvSettings) *action.Configuration {
  logger := log.Default()

  config := new(action.Configuration)
  err := config.Init(
    settings.RESTClientGetter(),
		settings.Namespace(),
		os.Getenv("HELM_DRIVER"),
		logger.Printf
  )
  if err != nil {
    panic(err)
  }

  return config
}
```

创建 config 实例主要经历以下步骤：

1. 通过 `new` 创建一个 `action.Configuration` 实例，并初始化字段为对应类型的零值
2. 通过 `Init` 函数初始化 config
3. 处理 Init 的错误的执行结果

需要注意的是，`Init` 函数的第 3 个参数需要从环境变量中获取 `HELM_DRIVER` 变量的值，如无特殊改动，直接用 os pkg 获取即可。

### 初始化 helm client

创建的 client 是 action 执行时使用的，在其他地方也暂时用不到，所以我们直接在 config 中补充 client 实例化的逻辑：

```go title="config.go" ins={6,23-35}
import (
  "log"
  "os"

  "helm.sh/helm/v3/pkg/action"
  "helm.sh/helm/v3/pkg/registry"
)

function createConfig(settings *cli.EnvSettings) *action.Configuration {
  logger := log.Default()

  config := new(action.Configuration)
  err := config.Init(
    settings.RESTClientGetter(),
		settings.Namespace(),
		os.Getenv("HELM_DRIVER"),
		logger.Printf
  )
  if err != nil {
    panic(err)
  }

  clientOpts := []registry.ClientOption{
    registry.ClientOptDebug(settings.Debug),
		registry.ClientOptEnableCache(true),
		registry.ClientOptWriter(os.Stderr),
		registry.ClientOptCredentialsFile(settings.RegistryConfig),
  }

  client, err:= registry.NewClient(clientOpts...)
  if err != nil {
    panic(err)
  }

  config.RegistryClient = client

  return config
}
```

### 实现 pull

到上一个章节结束，我们完成了前期准备的工作，接下来我们需要用到 action pkg 实现 helm pull 的逻辑：

```go title="helm-pull.go" {9,15}
import (
  "helm.sh/helm/v3/pkg/action"
)

func Pull() {
  settings := createSettings()
  config := createConfig(settings)

  pullClient := action.NewPullWithOpts(action.WithConfig(config))

  pullClient.DestDir = "/dest-dir-path"
	pullClient.Settings = settings
	pullClient.Version = "1.0.0"

	_, err := pullClient.Run("oci://registry.chart.custom.com/project/release-name")
	if err != nil {
	  nil
	}
}
```

helm pull 的实现不复杂，主要是依赖前面创建的 settings 和 config，我觉得可能需要注意的是高亮的部分：

1. 使用 `action.NewPullWithOpts` 时一定要注意使用 `action.WithConfig` 函数转换 config
2. pull client 执行 `Run` 函数的时候要注意 chart 的路径，在 `3.8.0` 版本以上的仓库中使用 OCI 标准存储 chart 包，所以需要使用 `oci` 开头的 url 获取，相关资料可查看：
   1. [Use OCI-based registries](https://helm.sh/docs/topics/registries/)
   2. [Open Container Initiative](https://opencontainers.org)

## 结语

至此，我们完成了 helm pull 功能，在接下里的文章里，我将会继续实现 template 的渲染和解析，敬请期待哈～
