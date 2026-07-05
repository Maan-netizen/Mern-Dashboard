---
name: Orval query hook queryKey typing
description: Generated React Query hooks require explicit queryKey when passing a query options object
---

When using orval-generated hooks like `useGetDashboardStats({ query: { enabled: !!token } })`, TypeScript requires the `queryKey` field even though the hook defaults it internally. The fix is to always pass the corresponding query key helper:

```ts
useGetDashboardStats({
  query: {
    enabled: !!token,
    queryKey: getGetDashboardStatsQueryKey(),
  }
});
```

**Why:** The generated `UseQueryOptions` type marks `queryKey` as required in the options object. The default fallback only applies at runtime, not at the type level.

**How to apply:** Whenever adding `{ query: { ... } }` to any generated hook, always include `queryKey: get<HookName>QueryKey()`.
