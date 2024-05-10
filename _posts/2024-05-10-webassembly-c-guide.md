---
layout: single
title: "Beginner's guide to WebAssembly and C"
excerpt: "This will be a guide to compiling and running C programs in the browser using wasm"
tags:
  - WebAssembly
  - C
---

**The blog post is Under Construction**
{: .notice--danger}

WebAssembly is cool stuff. You can run C code in the browser using it.
First off, let's create a minimal WebAssembly prototype.


```c
// test.c
int truth() {
  return 42;
}
```

Compile it using:
```sh
clang --target=wasm32 -nostdlib -Wl,--export=truth -Wl,--no-entry -o test.wasm test.c
```

| `--target=wasm32` | Sets the compilation target to WebAssembly |
| `-nostdlib`       | Says that libc is not available|
| `--export=truth`  | Linker flag, Make the `truth` function visible to JavaScript|
| `--no-entry`      | Linker flag, Don't look for a `main` function.|


Now, create file `index.html` like so:
```html
<!DOCTYPE html>

<script type="module">
  async function init() {
    const { instance } = await WebAssembly.instantiateStreaming(
      fetch("./test.wasm")
    );
    console.log("The truth is " + instance.exports.truth());
  }
  init();
</script>
```

To run it, use python http server or VS Code Live server extension.

Open developer console in your browser, you should see

```The truth is 42```


## How does this work?
C compiles to wasm and your browser loads this wasm file. Its been in works for about a decade now. Still under active development. 

It supports multiple languages, including C++ and Rust. We can dissect a wasm file using `wasm-objdump` 

```bash
wasm-objdump -x test.wasm
```

<details>
<summary markdown="span">
<strong>Output</strong> (Click to expand)
</summary>

```python
test.wasm:      file format wasm 0x1

Section Details:

Type[1]:
 - type[0] () -> i32
Function[1]:
 - func[0] sig=0 <truth>
Memory[1]:
 - memory[0] pages: initial=2
Global[1]:
 - global[0] i32 mutable=1 <__stack_pointer> - init i32=66560
Export[2]:
 - memory[0] -> "memory"
 - func[0] <truth> -> "truth"
Code[1]:
 - func[0] size=11 <truth>
Custom:
 - name: "name"
 - func[0] <truth>
 - global[0] <__stack_pointer>
Custom:
 - name: "producers"
Custom:
 - name: "target_features"
  - [+] mutable-globals
  - [+] sign-ext
```
</details>


As you can see:
```python
Function[1]:
 - func[0] sig=0 <truth>
```

The function `truth` is visible in the wasm binary.

Now lets try some other stuff

## Passing arguments to WASM
Modify the test program like so:

```c
// test.c
int add(int a, int b) {
  return a + b;
}
```

Compile it with:
```sh
clang --target=wasm32 -nostdlib -Wl,--export=add -Wl,--no-entry -o test.wasm test.c
```

Change the line in `index.html`:

```javascript
console.log("The sum of 12 and 13 is " + instance.exports.add(12, 13));
```

In your browser console, you should see:

```The sum of 12 and 13 is 25```

As you can see, the add function takes two parameters of type `int` and returns their sum.

Passing the arguments from JavaScript is as simple as a normal function call.

Now, let's try multiple functions:


```c
// test.c
int add(int a, int b) {
  return a + b;
}

int mul(int a, int b) {
  return a * b;
}
```

Compile it with:
```sh
clang --target=wasm32 \
      -nostdlib \
      -Wl,--export=add \
      -Wl,--export=mul \
      -Wl,--no-entry \
      -o test.wasm 
      test.c
```
Notice how we have added an extra line to export `mul`, more on that later.

Add this line in `index.html`:

```javascript
console.log("The product of 90 and 100 is " + instance.exports.mul(90, 100));
```

In your browser console, you should see:

```The product of 90 and 100 is 9000```

## Exporting properly
In the previous example we had to supply `-Wl,--export=mul` to `clang` to properly export the `mul` function that we added.
Clearly, doing this for every function we use will be pretty inconvenient, instead `clang` provides a couple of ways to export functions
without modifying build options.

#### 1. With `--export-dynamic`
You can mark the function with  `__attribute__ ((visibility ("default")))` and specity `-Wl,--export-dynamic` on the `clang` command line

```c
// test.c
__attribute__ ((visibility ("default")))
int add(int a, int b) {
  return a + b;
}
```

```sh
clang --target=wasm32 -nostdlib -Wl,--export-dynamic -Wl,--no-entry -o test.wasm test.c
```

#### 2. Without `--export-dynamic`
If you don't want to affect the command line at all, you can instead mark your functions with `__attribute__((export_name("exported_name")))`

```c
// test.c
__attribute__ ((export_name("add")))
int add(int a, int b) {
  return a + b;
}
```

```sh
clang --target=wasm32 -nostdlib -Wl,--no-entry -o test.wasm test.c
```

Notice that you can change the name of the function while exporting it, so you could export `add` as `mul` instead. Don't do that though.

You can use preprocessor macros to make this more convenient:

```c
#define WASM_EXPORT_AS(name) __attribute__((export_name(name)))
#define WASM_EXPORT(symbol) WASM_EXPORT_AS(#symbol) symbol

int WASM_EXPORT(add)(int a, int b) {
    return a + b;
}
```

Now, let's try passing in floats, add the following function to `test.c`:
```c
float root(float num){
  float ans = 0.0f;
  int count = 0;
  float adder = 1.0f;
  while(count++ < 5){
    while(ans * ans < num){
      ans += adder;
    }
    ans -= adder;
    adder /= 10;
  }
  return ans;
}
```

Compile it with:
```sh
clang --target=wasm32 \
      -nostdlib \
      -Wl,--export=add \
      -Wl,--export=mul \
      -Wl,--export=root \
      -Wl,--no-entry \
      -o test.wasm \
      test.c
```

Modify `index.html` with:
```javascript
console.log("The square root of 1127 is " + instance.exports.root(1127.0));
```

In your browser console, you should see:

```The square root of 1127 is 33.57077407836914```

As you can see, it is pretty cumbersome to add an extra `-Wl,--export` statement for each function we want to use, instead there is a better way to specify this in the C source file itself.

## Exporting properly

Falana Dhimka

1. Wasm basic intro
2. Tools we gonna use
3. Minimum program
4. Just compile
5. Inspect
6. Link
7. Inspect
8. Multifile compile
9. Export function
10. Static library, shared library
11. Inspect
12. Optimization
13. Marshalling different types ofdata
