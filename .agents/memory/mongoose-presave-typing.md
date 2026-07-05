---
name: Mongoose pre-save hook typing
description: Async Mongoose pre-save hooks need explicit next parameter typing
---

TypeScript infers the `next` parameter in a Mongoose pre-save hook as `SaveOptions`, which has no call signature. Fix by importing and annotating the type explicitly:

```ts
import mongoose, { CallbackWithoutResultAndOptionalError } from "mongoose";

schema.pre("save", async function (next: CallbackWithoutResultAndOptionalError) {
  // ...
  next();
});
```

**Why:** Mongoose's overloaded `pre()` types don't narrow the callback's `next` parameter to a callable type when the async overload is used.

**How to apply:** Always annotate `next` in async pre-save hooks with `CallbackWithoutResultAndOptionalError`.
