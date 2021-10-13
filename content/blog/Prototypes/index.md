---
title: Prototypes
date: "2021-10-13T09:54:07.473Z"
description: Prototypes
---
Useful links:
- [You Don’t Know JS Eng](https://www.amazon.com/You-Dont-Know-JS-Prototypes/dp/1491904151)
- [You Don’t Know JS Rus](https://www.ozon.ru/products/211426247/?sh=5gcVqwqG&suggestion_type=searchSuggestions&from=share_ios)
- [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
- [W3](https://www.w3schools.com/js/js_object_prototypes.asp)
- [Learn JS Rus](https://learn.javascript.ru/prototype-inheritance)

## Beginning
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

## getPrototypeOf / setPrototypeOf
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

## \_\_proto\_\_
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

## Object.create
`Object.create(...);` creates a new object associated with the object we specified.
`const B = Object.create(A);` - prototype of B is A.

## Prototype chains
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

## Function prototypes
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

### Prototype inheritance
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

