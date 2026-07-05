---
name: Mongoose async pre-save hooks — no next()
description: Async Mongoose pre-save hooks must NOT call next(); just return the promise
---

In Mongoose v9, async pre-save hooks must not accept or call `next`. Mongoose detects the async function and awaits the returned promise itself. Calling `next()` throws `TypeError: next is not a function` at runtime.

```ts
// CORRECT
schema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// WRONG — crashes with "next is not a function"
schema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next(); // ❌
});
```

**Why:** Mongoose's async middleware overload does not pass `next` as a callable; it resolves on promise fulfillment. The old callback-style `next()` pattern only works in sync hooks.

**How to apply:** Every async pre/post hook: no `next` parameter, no `next()` call, just `return` or throw.
