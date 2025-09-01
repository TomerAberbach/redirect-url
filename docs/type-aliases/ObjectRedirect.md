[**redirect-url**](../readme.md)

---

[redirect-url](../globals.md) / ObjectRedirect

# Type Alias: ObjectRedirect

> **ObjectRedirect** = `object`

Defined in:
[index.ts:192](https://github.com/TomerAberbach/redirect-url/blob/d8aef2e911ad779789410cadd16cafc472e6123a/src/index.ts#L192)

An object that specifies a redirect from a path pattern to a URL, optionally
with a status code for the redirection.

## Properties

### from

> **from**: `string`

Defined in:
[index.ts:203](https://github.com/TomerAberbach/redirect-url/blob/d8aef2e911ad779789410cadd16cafc472e6123a/src/index.ts#L203)

A string specifying the pattern a URL's path must match for this redirect to
apply to it.

The pattern must be a path (no host, query params, fragment, etc.) that follows
`path-to-regexp`'s syntax: https://github.com/pillarjs/path-to-regexp#parameters

Matching is case-insensitive and ignores trailing slashes.

---

### status?

> `optional` **status**: `number`

Defined in:
[index.ts:229](https://github.com/TomerAberbach/redirect-url/blob/d8aef2e911ad779789410cadd16cafc472e6123a/src/index.ts#L229)

The status code to use for the redirection.

Defaults to
[RedirectUrlOptions#defaultStatus](RedirectUrlOptions.md#defaultstatus) if not
specified.

---

### to

> **to**: `string`

Defined in:
[index.ts:222](https://github.com/TomerAberbach/redirect-url/blob/d8aef2e911ad779789410cadd16cafc472e6123a/src/index.ts#L222)

A string specifying the URL to redirect to.

The string may use parameters of the [ObjectRedirect#from](#from) path pattern
according to `path-to-regexp`'s syntax:
https://github.com/pillarjs/path-to-regexp#match

The string may be a path or a full URL. For the former, the URL returned by
[RedirectUrl](RedirectUrl.md) will use the host of the matching input URL. In
both cases, any query params or fragments present on an input URL matching the
[ObjectRedirect#from](#from) pattern are carried over to the redirect URL.

Trailing slashes are always stripped. Query params are always appended, even for
duplicate query param names, while the fragments always overwrite. Although,
note that servers don't receive fragments so that behavior only matters when
using this package on the client.
