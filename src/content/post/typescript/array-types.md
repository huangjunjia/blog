---
title: "TypeScript - 数组的类型"
description: "数组的一些方法的参数也会根据数组在定义时约定的类型进行限制"
publishDate: "2023/5/21"
updatedDate: ""
tags: ["前端", "typescript"]
draft: false
---

## 数组的类型

## 「类型 + 方括号」表示法

使用 `类型 + 方括` 号 来表示数组

```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

数组的项中**不允许**出现其他的类型

```typescript
let fibonacci: number[] = [1, '1', 2, 3, 5];

// Type 'string' is not assignable to type 'number'.
```

数组的一些方法的参数也会根据数组在定义时约定的类型进行限制

```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5];
fibonacci.push('8');

// Argument of type '"8"' is not assignable to parameter of type 'number'.
```

## 数组泛型

使用数组泛型（Array Generic） `Array<elemType>` 来表示数组

```typescript
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

## 接口表示数组

用于描述数组时会比上述两种方法更加麻烦和复杂，但可以用于描述类数组

```typescript
interface NumberArray {
	[index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

## 类数组

类数组（Array-like Object）不是数组类型，比如 `arguments`，不能用普通的方式描述，而应该用接口

```typescript
function sum() {
	let args: number[] = arguments;
}

// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```

```typescript
function sum() {
	let args: {
		[index: number]: number;
		length: number;
		callee: Function;
	} = arguments;
}
```

常用的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等

```typescript
function sum() {
	let args: IArguments = arguments;
}
```

## any 在数组中的应用

用 `any` 表示数组中允许出现任意类型

```typescript
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```

