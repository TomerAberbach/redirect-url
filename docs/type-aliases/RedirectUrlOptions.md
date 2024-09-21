[**redirect-url**](../readme.md) • **Docs**

---

[redirect-url](../globals.md) / RedirectUrlOptions

# Type Alias: RedirectUrlOptions

> **RedirectUrlOptions**: `object`

The options object for creating a [RedirectUrl](RedirectUrl.md) function.

All properties are optional.

## Type declaration

### decode()?

> `optional` **decode**: (`component`) => `string`

A function for decoding text that was decoded using RedirectUrlOptions#encode.

Defaults to decodeURIComponent.

#### Parameters

• **component**: `string`

#### Returns

`string`

### defaultStatus?

> `optional` **defaultStatus**: `number`

The default status to use for redirects when no particular status is specified.

Defaults to 302 ("Found").

### encode()?

> `optional` **encode**: (`component`) => `string`

A function for encoding text as a valid component of a URI.

Defaults to encodeURIComponent.

#### Parameters

• **component**: `string`

#### Returns

`string`

## Defined in

[index.ts:237](https://github.com/TomerAberbach/redirect-url/blob/4ea3b1ff21e8531a6e9e3b9c316a108c443a4f1f/src/index.ts#L237)
