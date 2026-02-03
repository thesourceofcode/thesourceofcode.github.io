---
layout: single
title: "Backend 101 - Caching"
excerpt: "Caching fundamentals for backend engineers"
tags:
  - Backend
  - Caching
---

Blueprint

- bhoomika
- caching simple explanation
- analogies
- examples of caching, cdn, browser
- cache policies:
- invalidation policy (write policy)
- read policy
- eviction policy

each example should have real world use case

Caching can be briefly described as - "Storing data that you anticipate will be used in the future in an easily
accessible place".

A real-world analogy to understand caching is - the grocery store and your kitchen.

If you anticipate that you will use some ingredient in cooking, you fetch that ingredient from the
grocery store and cache it in your kitchen. Because it is much faster to retrieve an ingredient from the
kitchen vs a grocery store, we save time by storing items in the kitchen.

Another analogy, to people familiar with Data Structures and Algorithms is the technique of Dynamic Programming

Caching is used in a variety of systems for performance benefits. From browsers caching HTML pages to CDNs caching data.

This article is primarily about how caching is used in backend systems.

Let's think of some scenarios where we might want to use caching:

- We want to reduce load on a database, such that read queries should hit the cache instead of the DB
- There is an API that requires an expensive computation. To reduce the computation cost, we cache its results
- We have certain latency requirements and the DB is not meeting them, so we need a cache

Where can we place the cache?

1. In-process cache:
This cache is placed in the process of the application. This is extremely fast with no network overhead required
but it cannot be scaled independently from the application and is limited in memory. It also needs careful handling in case of
distributed systems, we need to use consistent hashing to ensure API requests reach the application
holding the cache

2. db cache:
In this case the DB itself has some cache. It is slower than in-process cache as it requires a network call
but it reduces implementation burden on the application.

3. global cache:
This is a separate cache. Its benefit is that it can be scaled independently from the application

We will focus on the global cache.

By definition, cache is a faster location than your primary storage. In the real world it means that the cache
hardware is more expensive than primary storage and as a result we have less of it.

This means that we have to be smart about how we utilize this limited cache space.

We do this by implementing a cache policies. A cache policy is generally made of two parts:

- Cache Invalidation Policy: How do we handle updation of data in the cache.
- Cache eviction policy: What data do we remove when the cache becomes full and we need to make space for new entries

# Cache Hit & Miss

## Cache Invalidation Policy

- Write Around Cache:
In this, we always write to the DB. The cache can then be notified that the data is invalidated and it will then
fetch the updated data on the next cache miss. This increases DB load as we have cache misses, but keeps the cache
lean by ensuring only the actually accessed values are stored in the cache. There is no effect on write latency
but read latency is significantly improved.

- Write Through Cache:
In this, we write data to the cache, and the cache proxies the write request to the DB. Only after both systems
have acknowledged the write is the write completed. This makes the writes quite slow.
However it ensures that there are no cache misses and the data in the cache is always consistent.

- Write Back Cache:
Similar to the above, we write first to the cache. But the writes are propagated asynchronously to the DB.
This approach allows for the fastest writes while keeping the data in the cache consistent. At the cost of
the risk of losing data if the cache goes down without flushing all of its data to the DB

## Cache eviction Policy:

- FIFO: Simple, the item inserted first is removed first. Rarely the right choice
- LRU: Most frequently used in production. Remove the item that was accessed the longest time ago.
- LFU: Remove the least frequently used item, eve if it was accessed recently. an example would be the emoji list in your Keyboard
- TTL: Expire after fixed time

Others:
- Random
- MRU: tinder

## Cache Architecture:

- Cache Aside
- Read Through

Problems that arise with caching:

## Thundering herd problem:
When a cache key expires and a lot of requests try to fetch it. Leading to increased DB load.

Solution: Locking at the level of cache, prefetching

## Hot Key Problem:
When a key is extremely popular

Solution: Keep the key in multiple shards

## Cache avalanche:
When multiple hot keys expire in cache

Solution: Prefetching


## When should you not use caching
- Volatile, non repeated data
- not much DB load -> caching adds complexity