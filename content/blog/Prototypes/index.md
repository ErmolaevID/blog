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

<img width="206" alt="Screenshot 2021-10-13 at 14 56 18" src="https://user-images.githubusercontent.com/57585370/137111487-2cfae2a6-450d-40e2-973a-c49a8cb05a8a.png">

Object `a` has `[[Prototype]]` . What is it? It’s just a hidden property. Value of this property is link to an object. 
In our case value of `[[Prototype]]` is link to `Object.prototype`. What is `Object.prototype`?
<img width="379" alt="Screenshot 2021-10-13 at 14 58 17" src="https://user-images.githubusercontent.com/57585370/137111789-c4ccb0b4-9b8c-49f7-bf8a-2fd4c0882d4a.png">

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

## __proto__
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
