[**redirect-url**](../readme.md)

---

[redirect-url](../globals.md) / RedirectUrlOptions

# Type Alias: RedirectUrlOptions

> **RedirectUrlOptions** = `object`

Defined in:
[index.ts:237](https://github.com/TomerAberbach/redirect-url/blob/d8aef2e911ad779789410cadd16cafc472e6123a/src/index.ts#L237)

The options object for creating a [RedirectUrl](RedirectUrl.md) function.

All properties are optional.

## Properties

### decode()?

> `optional` **decode**: (`component`) => `string`

Defined in:
[index.ts:259](https://github.com/TomerAberbach/redirect-url/blob/d8aef2e911ad779789410cadd16cafc472e6123a/src/index.ts#L259)

A function for decoding text that was decoded using
[RedirectUrlOptions#encode](#encode).

Defaults to decodeURIComponent.

#### Parameters

##### component

`string`

#### Returns

`string`

---

### defaultStatus?

> `optional` **defaultStatus**: `number`

Defined in:
[index.ts:244](https://github.com/TomerAberbach/redirect-url/blob/d8aef2e911ad779789410cadd16cafc472e6123a/src/index.ts#L244)

The default status to use for redirects when no particular status is specified.

Defaults to 302 ("Found").

---

### encode()?

> `optional` **encode**: (`component`) => `string`

Defined in:
[index.ts:251](https://github.com/TomerAberbach/redirect-url/blob/d8aef2e911ad779789410cadd16cafc472e6123a/src/index.ts#L251)

A function for encoding text as a valid component of a URI.

Defaults to encodeURIComponent.

#### Parameters

##### component

`string`

#### Returns

`string`
