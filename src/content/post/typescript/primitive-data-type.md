---
title: "TypeScript - 原始数据类型"
description: "在 TypeScript 中原始数据类型有哪些"
publishDate: "2023/3/13"
updatedDate: ""
tags: ["前端", "TypeScript"]
draft: false
---

# 原始数据类型

## 布尔值

使用 `boolean` 定义布尔值类型

```typescript
let isDone: boolean = false;
```

#### ::注意：通过 `new Boolean` 创造的对象不是布尔值，直接调用 `Boolean` 函数返回的是布尔值，其他类型同理::

## 数值

使用 `number` 定义数值类型

```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

## 字符串

使用 `string` 定义字符串类型

```typescript
let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
```

## 空值

使用 `void` 表示没有任何返回值的函数

```typescript
function alertName(): void {
	alert('My name is Tom');
}
```

声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`

```typescript
let unusable: void = undefined;
```

## Null 和 Undefined

使用 `null` 和 `undefined` 来定义这两个原始数据类型

```typescript
let u: undefined = undefined;
let n: null = null;
```

---

## null、undefined 与 void 的区别

`undefined` 和 `null` 是所有类型的子类型，如 `undefined` 类型可以赋值给 `number` 类型，而 `void` 类型不能赋值给 `number` 类型

