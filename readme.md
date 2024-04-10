<h1 align="center">
  redirect-url
</h1>

<div align="center">
  <a href="https://npmjs.org/package/redirect-url">
    <img src="https://badgen.net/npm/v/redirect-url" alt="version" />
  </a>
  <a href="https://github.com/TomerAberbach/redirect-url/actions">
    <img src="https://github.com/TomerAberbach/redirect-url/workflows/CI/badge.svg" alt="CI" />
  </a>
  <a href="https://unpkg.com/redirect-url/dist/index.min.js">
    <img src="https://deno.bundlejs.com/?q=redirect-url&badge" alt="gzip size" />
  </a>
  <a href="https://unpkg.com/redirect-url/dist/index.min.js">
    <img src="https://deno.bundlejs.com/?q=redirect-url&config={%22compression%22:{%22type%22:%22brotli%22}}&badge" alt="brotli size" />
  </a>
</div>

<div align="center">
  Simple rule-based redirecting from one URL to another.
</div>

## Features

- **Wow:** so amazing
- **Amazing:** so wow
- **Fancy:** has a tie and everything

## Install

```sh
$ npm i redirect-url
```

## Usage

```js
import { createRedirectUrl, parseRedirectUrl } from 'redirect-url'

let redirectUrl = createRedirectUrl([
  [`/bliss`, `https://www.youtube.com/watch?v=dQw4w9WgXcQ`],
  { from: `/home`, to: `/`, status: 307 },
  [`/:splat*.html`, `/:splat*`],
])
// OR
redirectUrl = parseRedirectUrl(`
  # Nice :)
  /bliss          https://www.youtube.com/watch?v=dQw4w9WgXcQ

  # Other redirects...
  /home           /          307
  /:splat*.html   /:splat*
`)

console.log(redirectUrl(`https://example.com/bliss`))
//=> { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', status: 301 }
console.log(redirectUrl(`https://example.com/home`))
//=> { url: 'https://example.com', status: 307 }
console.log(redirectUrl(`https://example.com/about-me.html`))
//=> { url: 'https://example.com/about-me', status: 301 }
console.log(redirectUrl(`https://example.com/spaghetti`))
//=> null
```

This package can be used in any server or framework, but see some examples
below. Feel free to send pull requests for more examples!

### Express

```js
const redirectsMiddleware = (req, res, next) => {
  const result = redirectUrl(req.url)
  if (result) {
    res.redirect(result.status, result.url)
  }
  next()
}

app.all(`*`, redirectsMiddleware)
```

### Remix

[**entry.server**](https://remix.run/docs/en/main/file-conventions/entry.server):

```js
export const handleDataRequest = (response, { request, params, context }) => {
  const result = redirectUrl(request.url)
  if (result) {
    throw redirect(result.url, result.status)
  }

  // ...
}
```

## Contributing

Stars are always welcome!

For bugs and feature requests,
[please create an issue](https://github.com/TomerAberbach/redirect-url/issues/new).

For pull requests, please read the
[contributing guidelines](https://github.com/TomerAberbach/redirect-url/blob/main/contributing.md).

## License

[Apache License 2.0](https://github.com/TomerAberbach/redirect-url/blob/main/license)

This is not an official Google product.
