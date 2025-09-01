[**redirect-url**](../readme.md)

---

[redirect-url](../globals.md) / parseRedirectUrl

# Function: parseRedirectUrl()

> **parseRedirectUrl**(`redirects`, `options?`):
> [`RedirectUrl`](../type-aliases/RedirectUrl.md)

Defined in:
[index.ts:40](https://github.com/TomerAberbach/redirect-url/blob/d8aef2e911ad779789410cadd16cafc472e6123a/src/index.ts#L40)

Compiles and returns a [RedirectUrl](../type-aliases/RedirectUrl.md) function
from a redirects specification string.

The returned function computes its output based on the first redirect in
`redirects` that matches the input URL. If none match, then it returns null.

For performance, do not call this function before each redirect computation.
Compile the [RedirectUrl](../type-aliases/RedirectUrl.md) function once and
reuse it.

The syntax of the string loosely matches the syntax of Netlify's `_redirects`
file: https://docs.netlify.com/routing/redirects#syntax-for-the-redirects-file

Each line of the string can be either:

- Whitespace and/or comment (starting with `#`), in which case it the line is
  ignored.
- Whitespace separated
  [ObjectRedirect#from](../type-aliases/ObjectRedirect.md#from),
  [ObjectRedirect#to](../type-aliases/ObjectRedirect.md#to), and optionally
  [ObjectRedirect#status](../type-aliases/ObjectRedirect.md#status).

See [Redirect](../type-aliases/Redirect.md) for how to specify redirects and
[RedirectUrlOptions](../type-aliases/RedirectUrlOptions.md) for options.

## Parameters

### redirects

`string`

### options?

`ReadonlyObjectDeep`\<[`RedirectUrlOptions`](../type-aliases/RedirectUrlOptions.md)\>

## Returns

[`RedirectUrl`](../type-aliases/RedirectUrl.md)

## Example

```
# Nice :)
/bliss          https://www.youtube.com/watch?v=dQw4w9WgXcQ

# Other redirects...
/home           /          307
/:splat*.html   /:splat*
```
