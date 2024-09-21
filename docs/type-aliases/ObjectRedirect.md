[**redirect-url**](../readme.md) • **Docs**

---

[redirect-url](../globals.md) / ObjectRedirect

# Type Alias: ObjectRedirect

> **ObjectRedirect**: `object`

An object that specifies a redirect from a path pattern to a URL, optionally
with a status code for the redirection.

## Type declaration

### from

> **from**: `string`

A string specifying the pattern a URL's path must match for this redirect to
apply to it.

The pattern must be a path (no host, query params, fragment, etc.) that follows
`path-to-regexp`'s syntax: https://github.com/pillarjs/path-to-regexp#parameters

Matching is case-insensitive and ignores trailing slashes.

### status?

> `optional` **status**: `number`

The status code to use for the redirection.

Defaults to RedirectUrlOptions#defaultStatus if not specified.

### to

> **to**: `string`

A string specifying the URL to redirect to.

The string may use parameters of the ObjectRedirect#from path pattern according
to `path-to-regexp`'s syntax: https://github.com/pillarjs/path-to-regexp#match

The string may be a path or a full URL. For the former, the URL returned by
[RedirectUrl](RedirectUrl.md) will use the host of the matching input URL. In
both cases, any query params or fragments present on an input URL matching the
ObjectRedirect#from pattern are carried over to the redirect URL.

Trailing slashes are always stripped. Query params are always appended, even for
duplicate query param names, while the fragments always overwrite. Although,
note that servers don't receive fragments so that behavior only matters when
using this package on the client.

## Defined in

[index.ts:192](https://github.com/TomerAberbach/redirect-url/blob/4ea3b1ff21e8531a6e9e3b9c316a108c443a4f1f/src/index.ts#L192)
