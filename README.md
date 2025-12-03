# Functions & Scope Review - Student Guide

## Learning Goals
By the end of this lesson, you will be able to:
- Predict what value a function call resolves to
- Trace how functions execute using the callstack
- Identify which scope a variable belongs to
- Debug scope-related errors using technical terminology

---

## Part 1: Expression Resolution & Return

### Key Concept: Function Calls Are Expressions

Every function call is an **expression** that resolves to a value. Without a `return` statement, a function implicitly resolves to `undefined`.

**Example:**
```javascript
const calculatePrice = (basePrice) => {
  const tax = basePrice * 0.08;
  basePrice + tax;  // This line calculates but doesn't return!
}

const total = calculatePrice(100);
console.log(total);  // What prints here?
```

**Predict:** What will be the output of this code?

**Rule:** The `return` keyword does two things:
1. Exits the function immediately
2. Determines what value the function call resolves to

---

## Part 2: The Callstack

### What Is the Callstack?

The **callstack** is how JavaScript keeps track of which functions are currently running. Think of it like a stack of trays in a cafeteria:
- When a function is called, it gets added to the top of the stack
- When a function returns, it gets removed from the top of the stack
- JavaScript can only execute the function on top of the stack

### Tracing Code with the Callstack

**Code to trace:**
```javascript
const greet = (name) => {
  const greeting = makeGreeting(name);
  return greeting + "!";
}

const makeGreeting = (name) => {
  return "Hello, " + name;
}

const message = greet("Maya");
console.log(message);
```

### How to Trace

Use this template to track the callstack and variables:

```
Callstack:          
---------           
[         ]




Variables:
----------
Global: 
- greet = ?
- makeGreeting = ?
- message = ?

greet():
- name = ?
- greeting = ?

makeGreeting():
- name = ?
```

### Instructions for Tracing

**Step 1: Start with Global**
- Write `[ Global ]` in the callstack
- List all variables declared in global scope. Their values start as `undefined` until assigned (except `function` declarations)

**Step 2: When a function is called**
- Add the function name to the top of the callstack (above what's already there)
- List all parameters and local variables for that function
- Parameters get the values passed in immediately
- Local variables start as `undefined` until assigned

**Step 3: When a function returns**
- Remove that function from the top of the callstack
- The function call expression (like `makeGreeting(name)`) becomes the returned value
- Update the variable that receives the return value in the calling function

**Step 4: Track variable updates**
- When a variable gets assigned a value, update it in your diagram
- Make sure to update variables in the correct scope (which function are you currently in?)
- Mark when you're waiting for a return value (the variable won't update until the called function returns)

**Step 5: Repeat**
- Continue this process line by line through the code
- Always execute the function at the top of the callstack
- When the callstack is empty except for `[ Global ]`, you're done

### Key Takeaways
1. **Parameters are local variables**: Notice how `name` appears in both `greet` and `makeGreeting` scopes—they're separate variables even though they have the same name.
2. **Function calls resolve to values**: When `makeGreeting(name)` returns, that entire expression becomes `"Hello, Maya"`.
3. **Execution pauses**: When `greet` calls `makeGreeting`, `greet` pauses and waits—its variables stay in memory but execution doesn't continue until `makeGreeting` returns.
4. **Stack is LIFO**: Last In, First Out. `makeGreeting` was called most recently, so it completes and gets removed first.
5. **Return values flow back**: The return value from `makeGreeting` flows into `greet`, then the return value from `greet` flows into the global scope.

### Practice

Now, trace the callstack on your own:

```js
const step1 = (temp) => {
  const timesNineFifths = temp * (9/5);
  return step2(timesNineFifths)
}

const step2 = (temp) => {
  return temp + 32;
}

const convertCelsiusToFahrenheit = (c) => {
  return step1(c);
}

console.log(convertCelsiusToFahrenheit(100));
```

---

## Part 3: Lexical Scope

### What Is Lexical Scope?

**Lexical scope** means that variables are accessible based on where they're **written** in the code, not where functions are **called**.

### The Golden Rules of Scope

1. **Inner scopes can access outer scope variables**
   - A function can access variables declared outside of it
   
2. **Outer scopes CANNOT access inner scope variables**
   - Variables declared inside a function are not accessible outside that function

3. **Each function creates its own scope**
   - Variables declared inside a function only exist within that function

### Debugging Practice

Try to find and fix the bugs in these examples. For each one:
1. Identify the bug
2. Explain WHY it's a bug using scope terminology
3. Fix it

---

**Example 1: Variable Not in Scope**
```javascript
const sendEmail = (recipient) => {
  const subject = "Welcome!";
  composeMessage();
  return `Email sent to ${recipient}`;
}

const composeMessage = () => {
  return `Subject: ${subject}`;  // Bug here!
}

sendEmail("user@example.com");
```

**Questions to ask yourself:**
- Where is `subject` declared?
- Where is it being accessed?
- Can `composeMessage` see variables declared inside `sendEmail`?

---

**Example 2: Shadowing**
```javascript
let count = 10;

const updateCount = () => {
  let count = 5;
  count = count + 1;
  console.log(count);  // What prints here?
}

updateCount();
console.log(count);  // What prints here?
```

**Questions to ask yourself:**
- How many `count` variables exist in this code?
- Which `count` is being modified inside `updateCount`?
- Does the function change the global `count` variable?

---

**Example 3: Temporal Dead Zone**
```javascript
const processOrder = () => {
  console.log(status);  // Bug here!
  const status = "pending";
  return status;
}

processOrder();
```

**Questions to ask yourself:**
- Where is `status` declared?
- Where are we trying to access it?
- Can you access a variable before it's declared with `const`?

---

## Part 4: Reflection

Make sure you can use these terms accurately:

| Term              | Definition                                                             | Example                                                      |
| ----------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Expression**    | Code that resolves to a value                                          | `calculatePrice(100)` resolves to a number                   |
| **Return**        | Keyword that exits a function and determines what value it resolves to | `return total;`                                              |
| **Callstack**     | The ordered list of functions currently executing                      | When `greet` calls `makeGreeting`, both are on the callstack |
| **Scope**         | The area of code where a variable is accessible                        | Variables inside a function are in that function's scope     |
| **Lexical scope** | Variables are accessible based on where they're written in code        | Inner functions can access outer variables                   |
| **Parameter**     | A variable that receives a value when a function is called             | In `greet(name)`, `name` is a parameter                      |
| **Invoke/Call**   | To execute a function                                                  | `greet("Maya")` invokes the `greet` function                 |

### Reflection Questions

Before the end of class, answer these questions:

1. **The thing I'm most confident about with functions and scope is...**

2. **One thing I'm still confused about or want more practice with is...**

3. **In my own words, what does it mean for a function call to "resolve to a value"?**


---

## Practice Problems

### Problem 1: Predict the Output
```javascript
const double = (num) => {
  num * 2;
}

const calculate = (x) => {
  const result = double(x);
  return result + 10;
}

console.log(calculate(5));
```

**What will print? Why?**

---

### Problem 2: Trace the Callstack
```javascript
const add = (a, b) => {
  return a + b;
}

const multiply = (x, y) => {
  const sum = add(x, y);
  return sum * 2;
}

const result = multiply(3, 4);
```

**Draw the callstack at the moment when `add` is executing.**

---

### Problem 3: Debug the Scope Error
```javascript
const getDiscount = () => {
  if (isPremium) {
    const discount = 0.2;
  }
  return discount;
}

const isPremium = true;
const saved = getDiscount();
```

**What's the bug? How do you fix it? Explain using scope terminology.**

---

## Need More Help?

**Common struggles and where to focus:**

- **If you're confused about return values:** Practice writing functions that call other functions and trace what value each function call resolves to.

- **If the callstack is tricky:** Draw it out by hand for every code example. Physically seeing the stack grow and shrink helps.

- **If scope rules don't click yet:** For each variable, ask yourself: "Where was this declared?" That determines where it's accessible.

- **If you can fix bugs but can't explain them:** You understand the mechanics but need vocabulary practice. Try explaining examples out loud using the terms from the vocabulary table.
