---
title: "TypeScript - 对象的类型 —— 接口 Interfaces"
description: "在面向对象语言中，接口（Interfaces）是对行为的抽象，而具体行动则由类（classes）去实现（implement）"
publishDate: "2023/5/11"
updatedDate: ""
tags: ["前端", "typescript"]
draft: false
---

## 对象的类型 —— 接口 Interfaces

## 定义

使用接口（Interfaces）来定义对象的类型

## 概念

在面向对象语言中，接口（Interfaces）是对行为的抽象，而具体行动则由类（classes）去实现（implement）

在 TypeScript 中除了可以用对类的一部分行为进行抽象外，也常用于对 ::对象的形状（Shape）:: 进行描述

```typescript
interface Person {
	name: string;
	age: number;
}

let tom: Person = {
	name: 'Tom',
	age: 25
};
```

接口名称一般首字母大写，部分编程语言会建议加上 `I` 作为前缀

在声明一个变量时不能比接口多一些属性也不能比接口少一些属性，**赋值的时候，变量的形状必须和接口的形状保持一致**

```typescript
interface Person {
	name: string;
	age: number;
}

let tom: Person = {
	name: 'Tom'
};

// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
//   Property 'age' is missing in type '{ name: string; }'.
```

## 可选属性

当希望变量不需要与接口形状完全一致时可使用可选属性，可选属性的含义是该属性可以不存在，但是**仍然不被允许添加接口未定义的属性**

```typescript
interface Person {
	name: string;
	age?: number;
}

let tom: Person = {
	name: 'Tom'
};
```

```typescript
interface Person {
	name: string;
	age?: number;
}

let tom: Person = {
	name: 'Tom',
	age: 25
};
```

## 任意属性

当希望接口有任意的属性时，可以使用 `[propName: string] : any` 定义任意属性

```typescript
interface Person {
	name: string;
	age?: number;
	[propName: string]: any;
}

let tom: Person = {
	name: 'Tom',
	gender: 'male'
};
```

**::注意：一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集::**

```typescript
interface Person {
	name: string;
	age?: number;
	[propName: string]: string;
}

let tom: Person = {
	name: 'Tom',
	age: 25,
	gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//	 Type 'string | number' is not assignable to type 'string'.
//	   Type 'number' is not assignable to type 'string'.
```

**一个接口中只能定义一个任意属性**。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型

```typescript
interface Person {
	name: string;
	age?: number;
	[propName: string]: string | number;
}

let tom: Person = {
	name: 'Tom',
	age: 25,
	gender: 'male'
};
```

## 只读属性

当对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性

```typescript
interface Person {
	readonly id: number;
	name: string;
	age?: number;
	[propName: string]: any;
}

let tom: Person = {
	id: 89757,
	name: 'Tom',
	gender: 'male'
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

**::注意：只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候::**

```typescript
interface Person {
	readonly id: number;
	name: string;
	age?: number;
	[propName: string]: any;
}

let tom: Person = {
	name: 'Tom',
	gender: 'male'
};

tom.id = 89757;

// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

