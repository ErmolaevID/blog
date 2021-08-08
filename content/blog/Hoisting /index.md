---
title: Hoisting ⬆️
date: "2021-08-08T04:14:20.949Z"
description: Introductory article about hoisting in js
---
## Small Example
```javascript
console.log(x);
x = 5;
var x;
console.log(x);
```
<details>
  <summary>Show output</summary>
   undefined <br/>
   5
</details>

## Compiled or interpreted?
This article isn't about how JS engines work.
To understand how hoisting works, let me tell you about the work of the JS engine
in a simplified way. First, the code is compiled. The compiler finds and binds all 
declarations to the corresponding scopes. After that the code is executed

## What changes after compilation?
The JS compiler creates variable declarations to the top of their scope for optimization.
JS perceives `var x = 5;` as two commands. First - declare x, second - assign x the value 5.
So, all variables are declared before any value is assigned to them.
Let's go back to the example. Try to rewrite the code from the example as it
will look after compilation.
<details>
<summary>Show answer</summary>
<p>

```javascript
var x;
console.log(x); // undefined
x = 5;
console.log(x); // 5
```

</p>
</details>

## What about the functions?
Functions (**function declaration**) hoisting completely.
```javascript
testWithDeclaration() // Hoisted

function testWithDeclaration() {
  console.log("Hoisted");
}
```

<details>
<summary>Show code after compilation</summary>
<p>

```javascript
function testWithDeclaration() {
  console.log("Hoisted");
}

testWithDeclaration() // Hoisted
```

</p>
</details>
<br/>

**But**
```javascript
testWithExpression(); // TypeError

var testWithExpression = function() {
  console.log("Hoisted");
};
```

<details>
<summary>Show code after compilation</summary>
<p>

```javascript
var testWithExpression; // undefined

testWithExpression(); // undefined() - TypeError

var testWithExpression = function() {
  console.log("Hoisted");
};
```

</p>
</details>
<br/>

```javascript
testWithArrowFunc(); // TypeError

var testWithArrowFunc = () => console.log("Hoisted");
```

## Important 
Hoisting is performed at the scope level. So variable declarations hoisting
in their own scope and don't hoisting in another one. Let's look at an example.
```javascript
test();

function test() {
  console.log(x);
  var x = 5;
}
```
Try to rewrite the code from the example as it will look after compilation.
<details>
<summary>Show answer</summary>
<p>

```javascript
function test() {
  var x; // x hoisted in test function scope
  console.log(x); // undefined
  x = 5;
}

test();
```

</p>
</details>

## let & const
JS also hoisting variables declared via `let` and `const`, 
but doesn't initialize them with the `undefined` value, as it happens when using var
```javascript
console.log(x); // ReferenceError: Cannot access 'x' before initialization

const x = 5;
```
