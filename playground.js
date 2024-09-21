import { createRedirectUrl, parseRedirectUrl } from './dist/index.min.js'

const redirectUrl1 = createRedirectUrl([
  [`/bliss`, `https://www.youtube.com/watch?v=dQw4w9WgXcQ`],
  { from: `/home`, to: `/`, status: 307 },
  [`/:splat*\\.html`, `/:splat*`],
])
// OR
const redirectUrl2 = parseRedirectUrl(`
  # Nice :)
  /bliss            https://www.youtube.com/watch?v=dQw4w9WgXcQ

  # Other redirects...
  /home             /          307
  /:splat*\\.html   /:splat*
`)

console.log(redirectUrl1(`https://example.com/bliss`))
// => { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', status: 302 }
console.log(redirectUrl1(`https://example.com/home`))
// => { url: 'https://example.com', status: 307 }
console.log(redirectUrl1(`https://example.com/about-me.html`))
// => { url: 'https://example.com/about-me', status: 302 }
console.log(redirectUrl1(`https://example.com/spaghetti`))
// => null

console.log(redirectUrl2(`https://example.com/bliss`))
// => { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', status: 302 }
console.log(redirectUrl2(`https://example.com/home`))
// => { url: 'https://example.com', status: 307 }
console.log(redirectUrl2(`https://example.com/about-me.html`))
// => { url: 'https://example.com/about-me', status: 302 }
console.log(redirectUrl2(`https://example.com/spaghetti`))
// => null
