---
title: "TypeScript - 联合类型 Union Types"
description: "联合类型（Union Types）表示取值可以为多种类型中的一种，使用 `|` 分隔每个类型"
publishDate: "2023/4/16"
updatedDate: ""
tags: ["前端", "typescript"]
draft: false
---

## 联合类型 Union Types

## 定义

联合类型（Union Types）表示取值可以为多种类型中的一种，使用 `|` 分隔每个类型

例子：

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = true;

// index.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.
```

## 访问联合类型的属性或方法

当无法确定联合类型的变量是哪个类型的时候，**只能访问此联合类型的所有类型里共有的属性或方法**

```typescript
function getLength(something: string | number): number {
	return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

```typescript
function getString(something: string | number): string {
	return something.toString();
}
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

