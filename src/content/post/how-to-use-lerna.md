---
title: "如何使用 Lerna"
description: "在日常开发中，我们该如何使用 Lerna 来管理我们的 monorepo 项目"
publishDate: "2023/2/21"
updatedDate: ""
tags: ["Lerna", "Monorepo", "前端"]
draft: false
---

## Lerna

[官网](https://github.com/lerna/lerna)

## 定义

> Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.

官方定义是：

Lerna是一个工具，可以使用Git和NPM管理管理多包存储库的工作流程。

## 目录结构

```text
my-lerna-repo/
  package.json
  packages/
	package-1/
	  package.json
	package-2/
	  package.json
```

## 工作模式

### Fixed/Locked mode (default)

根据工程根目录下的 `lerna.json` 文件中的 `version` 字段控制版本，当运行 `lerna publish` 或者子模块有版本更新，都会更新 `version`，这意味着只需要在需要时发布一个新版本的包。

### Independent mode

使用 `lerna init --independent` 初始化工程，或者将 `lerna.json` 的 version 字段修改为 `version: "independent"` ，每次publish时，您都将得到一个提示符，提示每个已更改的包，以指定是补丁、次要更改、主要更改还是自定义更改。

![Image](https://image.junjia.fun/uPic/hVDij2.png)

## 初始化

```shell
# 全局安装或局部安装
npm install -g lerna
# npm install lerna -D

# 初始化配置文件
npx lerna init
```

## 相关配置 lerna.json

- npmClient：设置 npm 客户端，默认是 npm
- useWorkspaces：设置是否使用工作空间，默认 false

## 重要指令

### lerna create <name> [loc]

创建一个由 lerna 管理的包，默认放在 packages 目录下

### lerna add <package>[@version] [--dev] [--exact] [--peer]

添加远程或者本地的包至当前 lerna repo 的依赖中

```shell
# Adds the module-1 package to the packages in the 'prefix-' prefixed folders
lerna add module-1 packages/prefix-*

# Install module-1 to module-2
lerna add module-1 --scope=module-2

# Install module-1 to module-2 in devDependencies
lerna add module-1 --scope=module-2 --dev

# Install module-1 to module-2 in peerDependencies
lerna add module-1 --scope=module-2 --peer

# Install module-1 in all modules except module-1
lerna add module-1

# Install babel-core in all modules
lerna add babel-core
```

### lerna boostrap

安装当前 lerna repo 的依赖，包括 packages 内的 modules 的依赖

### lerna list

列出 packages 目录下符合规范的 module

### lerna publish

会打tag，上传git,上传npm。 如果你的包名是带scope的例如：`"name": "@gp0320/gpwebpack"`，那需要在packages.json添加

```json
"publishConfig": {
  "access": "public"
},
```

### lerna clean

清除所有子 package 的 node_modules

