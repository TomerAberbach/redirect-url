[redirect-url](readme.md) / Exports

# redirect-url

## Table of contents

### Type Aliases

- [ObjectRedirect](modules.md#objectredirect)
- [Redirect](modules.md#redirect)
- [RedirectUrl](modules.md#redirecturl)
- [RedirectUrlOptions](modules.md#redirecturloptions)
- [RedirectUrlResult](modules.md#redirecturlresult)
- [TupleRedirect](modules.md#tupleredirect)

### Functions

- [createRedirectUrl](modules.md#createredirecturl)
- [parseRedirectUrl](modules.md#parseredirecturl)

## Type Aliases

### ObjectRedirect

Ƭ **ObjectRedirect**: `Object`

An object that specifies a redirect from a path pattern to a URL, optionally
with a status code for the redirection.

#### Type declaration

| Name      | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :-------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`    | `string` | A string specifying the pattern a URL's path must match for this redirect to apply to it. The pattern must be a path (no host, query params, fragment, etc.) that follows `path-to-regexp`'s syntax: https://github.com/pillarjs/path-to-regexp#parameters Matching is case-insensitive and ignores trailing slashes.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `status?` | `number` | The status code to use for the redirection. Defaults to [RedirectUrlOptions#defaultStatus](modules.md#defaultstatus) if not specified.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `to`      | `string` | A string specifying the URL to redirect to. The string may use parameters of the [ObjectRedirect#from](modules.md#from) path pattern according to `path-to-regexp`'s syntax: https://github.com/pillarjs/path-to-regexp#match The string may be a path or a full URL. For the former, the URL returned by [RedirectUrl](modules.md#redirecturl) will use the host of the matching input URL. In both cases, any query params or fragments present on an input URL matching the [ObjectRedirect#from](modules.md#from) pattern are carried over to the redirect URL. Trailing slashes are always stripped. Query params are always appended, even for duplicate query param names, while the fragments always overwrite. |

#### Defined in

[index.ts:214](https://github.com/TomerAberbach/redirect-url/blob/c61d5294f77a29d28888a1c571e0761927c87c6d/src/index.ts#L214)

---

### Redirect

Ƭ **Redirect**: [`TupleRedirect`](modules.md#tupleredirect) \|
[`ObjectRedirect`](modules.md#objectredirect)

An object that specifies a redirect from a path pattern to a URL, optionally
with a status code for the redirection.

See `ObjectRedirect` for more information.

#### Defined in

[index.ts:200](https://github.com/TomerAberbach/redirect-url/blob/c61d5294f77a29d28888a1c571e0761927c87c6d/src/index.ts#L200)

---

### RedirectUrl

Ƭ **RedirectUrl**: (`url`: `string`) =>
[`RedirectUrlResult`](modules.md#redirecturlresult) \| `null`

A function that returns the URL to redirect the input `url` to, along with a
status code for the redirection, or null if no mapping exists for the input URL.

#### Type declaration

▸ (`url`): [`RedirectUrlResult`](modules.md#redirecturlresult) \| `null`

##### Parameters

| Name  | Type     |
| :---- | :------- |
| `url` | `string` |

##### Returns

[`RedirectUrlResult`](modules.md#redirecturlresult) \| `null`

#### Defined in

[index.ts:296](https://github.com/TomerAberbach/redirect-url/blob/c61d5294f77a29d28888a1c571e0761927c87c6d/src/index.ts#L296)

---

### RedirectUrlOptions

Ƭ **RedirectUrlOptions**: `Object`

The options object for creating a [RedirectUrl](modules.md#redirecturl)
function.

All properties are optional.

#### Type declaration

| Name             | Type                                | Description                                                                                                            |
| :--------------- | :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `decode?`        | (`component`: `string`) => `string` | -                                                                                                                      |
| `defaultStatus?` | `number`                            | The default status to use for redirects when no particular status is specified. Defaults to 301 ("Moved Permanently"). |
| `encode?`        | (`component`: `string`) => `string` | -                                                                                                                      |

#### Defined in

[index.ts:257](https://github.com/TomerAberbach/redirect-url/blob/c61d5294f77a29d28888a1c571e0761927c87c6d/src/index.ts#L257)

---

### RedirectUrlResult

Ƭ **RedirectUrlResult**: `Object`

The result of computing a redirect for a URL.

#### Type declaration

| Name     | Type     | Description                         |
| :------- | :------- | :---------------------------------- |
| `status` | `number` | The status code of the redirection. |
| `url`    | `string` | The URL to redirect to.             |

#### Defined in

[index.ts:283](https://github.com/TomerAberbach/redirect-url/blob/c61d5294f77a29d28888a1c571e0761927c87c6d/src/index.ts#L283)

---

### TupleRedirect

Ƭ **TupleRedirect**: [`string`, `string`]

A pair of strings that specifies a redirect from a path pattern (the first
string) to a URL (the second string).

See `ObjectRedirect` for more information.

#### Defined in

[index.ts:208](https://github.com/TomerAberbach/redirect-url/blob/c61d5294f77a29d28888a1c571e0761927c87c6d/src/index.ts#L208)

## Functions

### createRedirectUrl

▸ **createRedirectUrl**(`redirects`, `«destructured»?`):
[`RedirectUrl`](modules.md#redirecturl)

Compiles and returns a [RedirectUrl](modules.md#redirecturl) function.

The returned function computes its output based on the first
[Redirect](modules.md#redirect) in `redirects` that matches the input URL. If
none match, then it returns null.

For performance, do not call this function before each redirect computation.
Compile the [RedirectUrl](modules.md#redirecturl) function once and reuse it.

See [Redirect](modules.md#redirect) for how to specify redirects and
[RedirectUrlOptions](modules.md#redirecturloptions) for options.

#### Parameters

| Name             | Type                                                                                                                |
| :--------------- | :------------------------------------------------------------------------------------------------------------------ |
| `redirects`      | readonly (`ReadonlyObjectDeep`\<[`ObjectRedirect`](modules.md#objectredirect)\> \| readonly [`string`, `string`])[] |
| `«destructured»` | `ReadonlyObjectDeep`\<[`RedirectUrlOptions`](modules.md#redirecturloptions)\>                                       |

#### Returns

[`RedirectUrl`](modules.md#redirecturl)

#### Defined in

[index.ts:106](https://github.com/TomerAberbach/redirect-url/blob/c61d5294f77a29d28888a1c571e0761927c87c6d/src/index.ts#L106)

---

### parseRedirectUrl

▸ **parseRedirectUrl**(`redirects`, `options?`):
[`RedirectUrl`](modules.md#redirecturl)

Compiles and returns a [RedirectUrl](modules.md#redirecturl) function from a
redirects specification string.

The returned function computes its output based on the first redirect in
`redirects` that matches the input URL. If none match, then it returns null.

For performance, do not call this function before each redirect computation.
Compile the [RedirectUrl](modules.md#redirecturl) function once and reuse it.

The syntax of the string loosely matches the syntax of Netlify's `_redirects`
file: https://docs.netlify.com/routing/redirects#syntax-for-the-redirects-file

Each line of the string can be either:

- Whitespace and/or comment (starting with `#`), in which case it the line is
  ignored.
- Whitespace separated [ObjectRedirect#from](modules.md#from),
  [ObjectRedirect#to](modules.md#to), and optionally
  [ObjectRedirect#status](modules.md#status).

See [Redirect](modules.md#redirect) for how to specify redirects and
[RedirectUrlOptions](modules.md#redirecturloptions) for options.

#### Parameters

| Name        | Type                                                                          |
| :---------- | :---------------------------------------------------------------------------- |
| `redirects` | `string`                                                                      |
| `options?`  | `ReadonlyObjectDeep`\<[`RedirectUrlOptions`](modules.md#redirecturloptions)\> |

#### Returns

[`RedirectUrl`](modules.md#redirecturl)

**`Example`**

```
# Nice :)
/bliss  https://www.youtube.com/watch?v=dQw4w9WgXcQ

# Other redirects...
/a      /b
/x/y/z  /a/b/c
```

#### Defined in

[index.ts:56](https://github.com/TomerAberbach/redirect-url/blob/c61d5294f77a29d28888a1c571e0761927c87c6d/src/index.ts#L56)
