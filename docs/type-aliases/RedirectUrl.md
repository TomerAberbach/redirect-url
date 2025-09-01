[**redirect-url**](../readme.md)

---

[redirect-url](../globals.md) / RedirectUrl

# Type Alias: RedirectUrl()

> **RedirectUrl** = (`url`) => [`RedirectUrlResult`](RedirectUrlResult.md) \|
> `null`

Defined in:
[index.ts:276](https://github.com/TomerAberbach/redirect-url/blob/d8aef2e911ad779789410cadd16cafc472e6123a/src/index.ts#L276)

A function that returns the URL to redirect the input `url` to, along with a
status code for the redirection, or null if no mapping exists for the input URL.

## Parameters

### url

`string`

## Returns

[`RedirectUrlResult`](RedirectUrlResult.md) \| `null`
