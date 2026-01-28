---
layout: single
title: "Coding something every week of 2026 (Build52) - Week 1 to 4"
excerpt: "What I worked on in January 2026"
tags:
  - Rust
  - C
  - Linux
  - Build52
---

To improve my programming skills I have decided to code something every week in 2026.
I have given this project the name `build52`.

I am planning to have a particular topic for 4 week chunks and work on projects
relevant to that topic in that time.

The topic for January was `Linux`. Here is what I built and learnt:


# Week 1 (1 - 4 Jan)
The first week I decided to work on a clone of `echo`, built using Rust.

This was fairly straightforward. The primary learning was how to read
command line arguments passed to the binary in Rust.

Implementing this made me curious about how the "big boys" do it, and while
reading the code of `echo` in `uutils`, I noticed scope for reducing memory
usage. So I raised a [PR](https://github.com/uutils/coreutils/pull/10090), that ended up reducing maximum memory usage by
around 36% and total memory allocation by 50% in cases with a large argument list.

I wouldn't even consider myself a "pro" at Rust. Just being curious and applying
careful thought can lead to wonderful results.


# Week 2 (5 - 11 Jan)
Emboldened by the first week's success, I increased the scope and decided to build a
shell clone.

This was a great learning experience. I learned about the history of terminals, terminal emulators,
processes, context switching, signals, syscalls and many other things.

The highlight of this week was learning about the `fork` syscall. The interesting thng about
this syscall is that "it is called once, but returns twice", once in the parent process and
again in the child process. It took a while to wrap my head around this concept.

Turns out Rust has nice abstractions to launch other processes and I didn't need to deal with
`fork` and `exec` directly. Still it was nice to learn about how things work in the vast
majority of programs.

# Week 3 (12 - 18 Jan)
This week I created a Linux kernel module in C.

It creates a file under `/proc` and returns a random fortune when read.

I have wanted to contribute to the Linux kernel for a long time and this project gave me
confidence that I can actually do that in the near future.

I learned how to create a simple Linux module, get random numbers from the kernel, load and
unload it using `insmod` and `rmmod`


# Week 4 (19 - 25 Jan)
I decided to translate my Linux kernel module to Rust. The support for Rust inside the
Linux kernel has reached an advanced stage and Rust drivers are already being used in production.

I tried using the Rust for Linux out of tree example as a starting point. Getting it to compile
was an uphill battle, but once everything was set up the development experience provided by Rust
seemed very pleasant.

I found out Rust-for-Linux does not have abstractions for dealing with `/proc`, so changed my code
to expose a misc. device instead.


# Retrospective
This has been a great learning experience so far. Now that I have verified I can be consistent with
working on this project, I will try to increase the scope of work a bit and try to write more detailed
blog posts.