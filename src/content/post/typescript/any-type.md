---
title: "TypeScript - 任意值 Any"
description: "在 TypeScript 中有一个 Any 类型，我们该如何使用"
publishDate: "2023/3/16"
updatedDate: ""
tags: ["前端", "typescript"]
draft: false
---

## 任意值 Any

## 定义

用于表示允许赋值为任意类型

普通类型在赋值过程中不允许改变类型

```typescript
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

如果是 any 类型，则可以在赋值过程中改变类型

```typescript
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```

**::声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值::**

## 未声明类型的变量

**变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型**

```typescript
let something;
something = 'seven';
something = 7;

something.setName('Tom');
```

等同于

```typescript
let something: any;
something = 'seven';
something = 7;

something.setName('Tom');
```

