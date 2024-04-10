redirect-url / [Exports](modules.md)

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

- **Flexible:** completely framework agnostic
- **Powerful:** specify redirects using
  [`path-to-regexp` patterns](https://github.com/pillarjs/path-to-regexp?tab=readme-ov-file#parameters)
- **Readable:** configure using a
  [Netlify `_redirects`](https://docs.netlify.com/routing/redirects#syntax-for-the-redirects-file)-like
  syntax

## Install

```sh
$ npm i redirect-url
```

## Usage

```js
import { createRedirectUrl, parseRedirectUrl } from 'redirect-url'

let redirectUrl = createRedirectUrl([
  // Nice :)
  [`/bliss`, `https://www.youtube.com/watch?v=dQw4w9WgXcQ`],

  // Other redirects...
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

This package can be used with any server or framework, but see some example
integrations below. Feel free to send pull requests for more examples!

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
export const handleDocumentRequest = request => {
  const result = redirectUrl(request.url)
  if (result) {
    throw redirect(result.url, result.status)
  }

  // ...
}
```

## API

See the
[TSDoc comments](https://github.com/TomerAberbach/redirect-url/blob/main/src/index.ts).

## Contributing

Stars are always welcome!

For bugs and feature requests,
[please create an issue](https://github.com/TomerAberbach/redirect-url/issues/new).

For pull requests, please read the
[contributing guidelines](https://github.com/TomerAberbach/redirect-url/blob/main/contributing.md).

## License

[Apache License 2.0](https://github.com/TomerAberbach/redirect-url/blob/main/license)

This is not an official Google product.
