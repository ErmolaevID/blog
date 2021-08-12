---
title: Overloading in JS/TS 
date: "2021-08-12T10:00:05.620Z"
description: Does it exist?
---
There are no overloads in JS in the form in which they exist in Java or C#.
But I'll show you an examples of using "overloads"

1. [Rest Parameters in functions](#rpf)
2. [Rest Parameters in constructors](#rpc)
3. [Overloading in constructors, TS](#tsc)
4. [Overloading in functions, TS](#tsf)
5. [Arguments object (Don't use it)](#obj)

## Rest Parameters in functions <a name="rpf" />
```javascript
const sum = (...args) => {
  let counter = 0;
  for (let i = 0; i < args.length; i++) {
    counter += args[i];
  }
  return counter;
};

sum(1, 2) // 3
sum(2, 3, 5); // 10
```
`...args` - is an additional parameters
```javascript
const example = (a, b, ...args) => {
  // args[0] - is third parameter
  // args[1] - is fourth parameter
  // etc
  
  return a + args[0];
};

example(1, 4, 5) // 6
example(1, 4) // NaN
```

## Rest Parameters in constructors <a name="rpc" />
```javascript
class Point {
  constructor(...args) {
    this.x = args[0] ?? 0;
    this.y = args[1] ?? 0;
  }

  printСoordinates() {
    console.log(this.x, this.y);
  }
}

const p = new Point(1, 2);
const p1 = new Point(1, 2, 3); // third parameter will be ignored

p.printСoordinates(); // 1 2
p1.printСoordinates(); // 1 2
```

## Overloading in constructors, TS <a name="tsc" />
TS gives us a new syntax for overloads
```typescript
class Point {
  #x: number;
  #y: number;

  constructor();
  constructor(x: number);
  constructor(x: number, y: number);
  constructor(...args: number[]) {
    this.#x = args[0] ?? 0;
    this.#y = args[1] ?? 0;
  }

  printСoordinates = () => {
    console.log(this.#x, this.#y);
  }
}

const p = new Point(1);
const p1 = new Point(1, 2, 3); // Expected 0-2 arguments, but got 3
p.printСoordinates(); // 1 0
```
and suitable tips <br/>
![ezgif-3-69195a6f51ce](https://user-images.githubusercontent.com/57585370/128887149-8327ac4a-712e-4f9b-849d-580863c99243.gif)

## Overloading in functions, TS <a name="tsf" />
```typescript
class MyClass {
  method(): void;
  method(a: number): void;
  method(a: number, b: number): void;
  method(a: number, b: number, c: number): void;
  method(...args: number[]): void {
    // logic
  }
}
```

## Arguments object <a name="obj" />
### **Use rest parameters instead of arguments object!!!** <br/>
`arguments` - an object that is similar to an array. It has indexes `arguments[0]`
and `.length`. Also `arguments` doesn't work with arrow functions
```javascript
function sum() {
  let acc = 0;
  for (let i = 0; i < arguments.length; i++) {
    acc += arguments[i];
  }
  return acc;
}

sum(2, 3, 5); // 10

function example(a, b) {
  // arguments[0] = a
  // arguments[1] = b
  return arguments[2];
}

example(1, 2, 3); // 3
```
