**redirect-url**

---

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
  <a href="https://github.com/sponsors/TomerAberbach">
    <img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor">
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

<!-- eslint-disable -->

```js
import { createRedirectUrl, parseRedirectUrl } from 'redirect-url'

let redirectUrl = createRedirectUrl([
  // Nice :)
  [`/bliss`, `https://www.youtube.com/watch?v=dQw4w9WgXcQ`],

  // Other redirects...
  { from: `/home`, to: `/`, status: 307 },
  [`/:splat*\\.html`, `/:splat*`],
])
// OR
redirectUrl = parseRedirectUrl(`
  # Nice :)
  /bliss            https://www.youtube.com/watch?v=dQw4w9WgXcQ

  # Other redirects...
  /home             /          307
  /:splat*\\.html   /:splat*
`)

console.log(redirectUrl(`https://example.com/bliss`))
//=> { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', status: 302 }
console.log(redirectUrl(`https://example.com/home`))
//=> { url: 'https://example.com', status: 307 }
console.log(redirectUrl(`https://example.com/about-me.html`))
//=> { url: 'https://example.com/about-me', status: 302 }
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

### React Router

[**entry.server.tsx**](https://reactrouter.com/api/framework-conventions/entry.server.tsx):

<!-- eslint-disable consistent-return -->

```js
const handleRequest = request => {
  const result = redirectUrl(request.url)
  if (result) {
    return redirect(result.url, result.status)
  }

  // ...
}

export default handleRequest
```

## API

[See here!](https://github.com/TomerAberbach/redirect-url/blob/main/docs/globals.md)

## Contributing

Stars are always welcome!

For bugs and feature requests,
[please create an issue](https://github.com/TomerAberbach/redirect-url/issues/new).

## License

[MIT](https://github.com/TomerAberbach/redirect-url/blob/main/license-mit) ©
[Tomer Aberbach](https://github.com/TomerAberbach) \
[Apache 2.0](https://github.com/TomerAberbach/redirect-url/blob/main/license-apache) ©
[Google](https://github.com/TomerAberbach/redirect-url/blob/main/notice-apache)
