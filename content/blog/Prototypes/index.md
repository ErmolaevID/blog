---
title: Prototypes
date: "2021-10-13T09:54:07.473Z"
description: Prototypes
stage: ready
---
## Useful links:
- [You Don’t Know JS Eng](https://www.amazon.com/You-Dont-Know-JS-Prototypes/dp/1491904151)
- [You Don’t Know JS Rus](https://www.ozon.ru/products/211426247/?sh=5gcVqwqG&suggestion_type=searchSuggestions&from=share_ios)
- [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
- [W3](https://www.w3schools.com/js/js_object_prototypes.asp)
- [Learn JS Rus](https://learn.javascript.ru/prototype-inheritance)

## Table of contents
1. [Beginning](#beginning)
2. [getPrototypeOf / setPrototypeOf](#prototypeOf)
3. [\_\_proto__](#proto)
4. [Object.create](#create)
5. [Prototype chains](#chains)
6. [Function prototypes](#fproto)
7. [Prototype inheritance](#inheritance)
8. [Global Objects](#gobj)
9. [ES6 Classes](#es6)
10. [Extensions](#ext)
11. [Quiz](#quiz)

## Beginning <a name="beginning"></a>
``` JS
const a = {};
```
What properties does this object have?
None? Let’s try to log it in browser.
<img width="206" alt="Screenshot 2021-10-13 at 14 56 18" src="https://user-images.githubusercontent.com/57585370/137111487-2cfae2a6-450d-40e2-973a-c49a8cb05a8a.png"><br>
Object `a` has `[[Prototype]]` . What is it? It’s just a hidden property. Value of this property is link to an object. 
In our case value of `[[Prototype]]` is link to `Object.prototype`. What is `Object.prototype`?
<img width="379" alt="Screenshot 2021-10-13 at 14 58 17" src="https://user-images.githubusercontent.com/57585370/137111789-c4ccb0b4-9b8c-49f7-bf8a-2fd4c0882d4a.png"><br>
Just an object that’s have methods like `toString()` and etc (check photo).
What does this connection between object `a` and `Object.prototype` mean?
``` JS
const a = {};
console.log(a.toString());
```
Will there be a mistake? No. Why? JS engine like
Okay I should execute `toString` in `a`. Let’s check `a`. `a` doesn’t have field `toString`, so let’s go to prototype of `a` object.
It’s link to `Object.prototype`. Okay, I found `toString` in `Object.prototype`, let’s execute it. Engine checks all prototype chain. 
If object doesn’t have some field, engine go to prototype. If prototype doesn’t have filed - engine will check prototype of prototype until it finds
this field or the prototype will be `null`. Prototype of Object.prototype is null. Don’t believe me? How to see prototype of something via JS but not dev tools? 

## getPrototypeOf / setPrototypeOf <a name="prototypeOf"></a>
These methods appeared in ES5. `getPrototypeOf(obj)` returns prototype of `obj`. `setPrototypeOf(obj, anotherObj)`, now prototype of `obj` is `anotherObj`
``` JS
const a = {
	print: () => console.log("Hello")
}

const b = {};

console.log(Object.getPrototypeOf(a) === Object.getPrototypeOf(b));
Object.setPrototypeOf(b, a);
console.log(Object.getPrototypeOf(a) === Object.getPrototypeOf(b));
b.print();
```
<details>
  <summary>Show output</summary>
   true <br/>
   false <br />
   Hello
</details>

## \_\_proto\_\_ <a name="proto"></a>
This property appeared in ES6. Use it instead of `getPrototypeOf/setPrototypeOf`.
``` js
const a = {
	print: () => console.log("Hello")
}

const b = {};

console.log(a.__proto__ === b.__proto__);
b.__proto__ = a;
console.log(a.__proto__ === b.__proto__);
b.print();
```
<details>
  <summary>Show output</summary>
   true <br/>
   false <br />
   Hello
</details>

## Object.create <a name="create"></a>
`Object.create(...);` creates a new object associated with the object we specified.
`const B = Object.create(A);` - prototype of B is A.

## Prototype chains <a name="chains"></a>
Thanks to prototype, we can delegate behaviour to someone with whom we are connected by a prototype
``` JS
const Parent = {
  name: "Parent",
  doSomething: function() {
    console.log("Method from Parent, but name is taken from " + this.name)
  }
}

const ChildOfParent = Object.create(Parent);
ChildOfParent.name = "Child of Parent";

const ChildOfChild = Object.create(ChildOfParent);
ChildOfChild.name = "Child of Child";

ChildOfChild.doSomething();
```
<details>
  <summary>Show output</summary>
   Method from Parent, but name is taken from Child of Child
</details>

## Function prototypes <a name="fproto"></a>
By default, all functions have a public, non-enumerable property called `prototype`.
``` JS
function Foo() {
  // ...
}

Foo.prototype; // { }
```
Not a very good name. The prototype field (`Foo.prototype`) that appears in the function 
and the prototype of the function itself (`Foo.__proto__`) are different things
``` JS
function Foo() {
  // ...
}

console.log(Foo.prototype === Foo.__proto__); // False!!!!!
```
Each object that is constructed via `new FunctionName()` syntax is given a link to the function
prototype (`FunctionName.prototype`) by the its prototype (`constructedObject.__proto__`)
``` JS
function Person() {}

const person = new Person();

console.log(person.__proto__ === Person.prototype);
```
<img width="100%" src="https://user-images.githubusercontent.com/57585370/137113380-fd21e527-3e78-4506-a5a6-46c54dd6a24e.png">

Person.prototype also has a constructor filed references the function itself
<img width="100%" src="https://user-images.githubusercontent.com/57585370/137113463-31024c9a-e665-43ee-9a9a-cf4111545ec6.png">


We want the person object to have a name
``` JS
function Person(name) {
	this.name = name;
}

const person = new Person("Ksenia");

console.log(person);
console.log(Person.prototype);
```
<img width="100%" src="https://user-images.githubusercontent.com/57585370/137113557-1e415754-2ac9-490e-8f16-45b49310d6ac.png" >
Each object will have a `name` field inside itself.

But we want each instance of Person to have a greeting method
``` JS
function Person(name) {
	this.name = name;
}

Person.prototype.sayHello = function() {
	console.log("Hello, my name is " + this.name);
}

const person = new Person("Ksenia");

console.log(person);
console.log(person.sayHello());
console.log(Person.prototype);
```
<img width="100%" src="https://user-images.githubusercontent.com/57585370/137113666-1fb68248-ea8b-4e79-a1a7-304114ef671d.png">

### Prototype inheritance <a name="inheritance"></a>
``` js
function Person(name, age) {
	this.name = name;
	this.age = age;
}

Person.prototype.mainInfo = function() {
	console.log(`Main info: ${this.name}, ${this.age}`);
}

function Student(name, age, department) {
	Person.call(this, name, age);
	this.department = department;
}

Student.prototype = Object.create(Person.prototype);
// There is no constructor property in Student. you need
// to create it yourself
// Student.prototype.constructor = Student;

Student.prototype.educationInfo = function() {
	console.log(`Education info: ${this. department}`);
}

const p = new Person("Ksenia", 19);
const s = new Student("Ksenia", 19, "Languages");

p.educationInfo() // error
s.educationInfo() // ok
```

### Global objects <a name="gobj"></a>
There are [built-in objects in js](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects) (Object, Array, RegExp, Number, etc.)
```js
const a = []; // Equal to const a = new Array();
```
When we create an instance of such "classes", the `__proto__` object refers to
`Class.prototype`. And each `Class.prototype` refers to `Object.prototype`
```js
const a = [];
console.log(a.__proto__ === Array.prototype); // true
console.log(a.__proto__.__proto__ === Object.prototype); // true

const b = 43;
console.log(b.__proto__ === Number.prototype); // true
console.log(b.__proto__.__proto__ === Object.prototype); // true
```
If you can't understand why primitive have `__proto__` check [this](https://developer.mozilla.org/en-US/docs/Glossary/Primitive#primitive_wrapper_objects_in_javascript)

## ES6 Classes <a name="es6"></a>
Just syntactic sugar for prototypes. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## Extensions <a name="ext"></a>
- Loop
```js
const a = {};
a.__proto__ = a; // TypeError: Cyclic __proto__ value
```
- Right constructor
```js
function Foo() {
  /* .. */
}

Foo.prototype = {
  /* .. */
};

Object.defineProperty(Foo.prototype, "constructor", {
  enumerable: false,
  writable: true,
  configurable: true,
  value: Foo,
});
```

## Quiz <a name="quiz"></a>
1. True or false
``` js
const a = {};
const b = {};

console.log(a.__proto__ === b.__proto__);
```
<details>
  <summary>Show answer</summary>
   True
</details>

2. True or false
``` js
const a = {};
const b = [];

console.log(a.__proto__ === b.__proto__);
```
<details>
  <summary>Show answer</summary>
   False
</details>

3. True or false
```js
const a = {};
const b = [];

console.log(a.__proto__ === b.__proto__.__proto__);
```
<details>
  <summary>Show answer</summary>
   True
</details>

4. True or false
```js
class A {};
function B() {};

console.log(A.__proto__ === B.__proto__);
```
<details>
  <summary>Show answer</summary>
   True
</details>

5. True or false
```js
function Kek() {
	this.hello = function() {
		console.log("hello");
  }
}

const a = new Kek();
const b = new Kek();

console.log(a.hello === b.hello);
```
<details>
  <summary>Show answer</summary>
   False
</details>

6. True or false
```js
function Kek() {}

Kek.prototype.hello = function() {
	console.log("Hello");
}

const a = new Kek();
const b = new Kek();

console.log(a.hello === b.hello);
```
<details>
  <summary>Show answer</summary>
   True
</details>

7. True or false
```js
function Kek() {
	this.hello = function() {
		console.log("hello");
  }
}

Kek.prototype.hello = function() {
	console.log("Hello");
}

const a = new Kek();
const b = new Kek();

console.log(a.hello === b.hello);
```
<details>
  <summary>Show answer</summary>
   False
</details>

8. Console output
``` js
Object.prototype.toString = function() { console.log("KEK") }
const a = {};
a.toString();
```
<details>
  <summary>Show answer</summary>
   KEK
</details>

9. Console output
``` js
Object.prototype.toString = function() { console.log("KEK") }
const a = {
	toString: () => console.log("LOL"),
};
a.toString();
```
<details>
  <summary>Show answer</summary>
   LOL
</details>

10. Console output
``` js
Object.prototype.toString = () => console.log("KEK");
const a = [1, 2, 3];
console.log(a.toString());
```
<details>
  <summary>Show answer</summary>
   1, 2, 3
</details>

11. Console output
```js
Array.prototype.toString = () => console.log("KEK");
const a = [1, 2, 3];
a.toString();
```
<details>
  <summary>Show answer</summary>
   KEK
</details>
