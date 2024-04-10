/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
