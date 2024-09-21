[**redirect-url**](../readme.md) • **Docs**

---

[redirect-url](../globals.md) / createRedirectUrl

# Function: createRedirectUrl()

> **createRedirectUrl**(`redirects`, `__namedParameters`):
> [`RedirectUrl`](../type-aliases/RedirectUrl.md)

Compiles and returns a [RedirectUrl](../type-aliases/RedirectUrl.md) function.

The returned function computes its output based on the first
[Redirect](../type-aliases/Redirect.md) in `redirects` that matches the input
URL. If none match, then it returns null.

For performance, do not call this function before each redirect computation.
Compile the [RedirectUrl](../type-aliases/RedirectUrl.md) function once and
reuse it.

See [Redirect](../type-aliases/Redirect.md) for how to specify redirects and
[RedirectUrlOptions](../type-aliases/RedirectUrlOptions.md) for options.

## Parameters

• **redirects**: readonly
(`ReadonlyObjectDeep`\<[`ObjectRedirect`](../type-aliases/ObjectRedirect.md)\>
\| readonly [`string`, `string`])[]

• **\_\_namedParameters**:
`ReadonlyObjectDeep`\<[`RedirectUrlOptions`](../type-aliases/RedirectUrlOptions.md)\>
= `{}`

## Returns

[`RedirectUrl`](../type-aliases/RedirectUrl.md)

## Defined in

[index.ts:90](https://github.com/TomerAberbach/redirect-url/blob/4ea3b1ff21e8531a6e9e3b9c316a108c443a4f1f/src/index.ts#L90)
