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

import {
  compile as createParamsToPathFunction,
  match as createPathToParamsFunction,
} from 'path-to-regexp'
import type { ReadonlyDeep, RequiredDeep } from 'type-fest'

/**
 * Compiles and returns a {@link RedirectUrl} function from a redirects
 * specification string.
 *
 * The returned function computes its output based on the first redirect in
 * `redirects` that matches the input URL. If none match, then it returns null.
 *
 * For performance, do not call this function before each redirect computation.
 * Compile the {@link RedirectUrl} function once and reuse it.
 *
 * The syntax of the string loosely matches the syntax of Netlify's
 * `_redirects` file:
 * https://docs.netlify.com/routing/redirects#syntax-for-the-redirects-file
 *
 * Each line of the string can be either:
 * - Whitespace and/or comment (starting with `#`), in which case it the line is
 *   ignored.
 * - Whitespace separated {@link ObjectRedirect#from},
 *   {@link ObjectRedirect#to}, and optionally {@link ObjectRedirect#status}.
 *
 * See {@link Redirect} for how to specify redirects and
 * {@link RedirectUrlOptions} for options.
 *
 * @example
 * ```
 * # Nice :)
 * /bliss          https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *
 * # Other redirects...
 * /home           /          307
 * /:splat*.html   /:splat*
 * ```
 */
export const parseRedirectUrl = (
  redirects: string,
  options?: ReadonlyDeep<RedirectUrlOptions>,
): RedirectUrl =>
  createRedirectUrl(
    redirects.split(`\n`).flatMap(line => {
      const redirect = parseRedirect(line)
      return redirect ? [redirect] : []
    }),
    options,
  )

const parseRedirect = (line: string): Redirect | null => {
  line = line.trim()
  if (!line.length || line.startsWith(`#`)) {
    return null
  }

  const parts = line.split(WHITESPACE_REGEX)
  if (!(parts.length >= 2 && parts.length <= 3)) {
    throw new Error(`Bad part count:\n${line}`)
  }

  const [from, to, rawStatus] = parts
  let status
  if (rawStatus) {
    status = parseInt(rawStatus, 10)
    if (isNaN(status)) {
      throw new TypeError(`Bad status: ${rawStatus}`)
    }
  }

  return { from: from!, to: to!, status }
}

const WHITESPACE_REGEX = /\s+/u

/**
 * Compiles and returns a {@link RedirectUrl} function.
 *
 * The returned function computes its output based on the first {@link Redirect}
 * in `redirects` that matches the input URL. If none match, then it returns
 * null.
 *
 * For performance, do not call this function before each redirect computation.
 * Compile the {@link RedirectUrl} function once and reuse it.
 *
 * See {@link Redirect} for how to specify redirects and
 * {@link RedirectUrlOptions} for options.
 */
export const createRedirectUrl = (
  redirects: ReadonlyDeep<Redirect[]>,
  {
    defaultStatus = 301,
    encode = encodeURIComponent,
    decode = decodeURIComponent,
  }: ReadonlyDeep<RedirectUrlOptions> = {},
): RedirectUrl => {
  const options = { defaultStatus, encode, decode }
  const compiledRedirects = redirects.map(redirect =>
    compileRedirect(redirect, options),
  )
  return inputUrl => {
    const url = new URL(inputUrl)
    for (const redirect of compiledRedirects) {
      const newUrl = redirect.transform(url)
      if (newUrl) {
        return { url: newUrl, status: redirect.status }
      }
    }
    return null
  }
}

const compileRedirect = (
  redirect: ReadonlyDeep<Redirect>,
  {
    defaultStatus,
    encode,
    decode,
  }: ReadonlyDeep<RequiredDeep<RedirectUrlOptions>>,
): CompiledRedirect => {
  const { from, to, status = defaultStatus } = normalizeRedirect(redirect)
  if (!isPath(from)) {
    throw new Error(`Bad from path: ${from}`)
  }

  const pathToParams = createPathToParamsFunction(getPath(from), { decode })
  const paramsToPath = createParamsToPathFunction(getPath(to), { encode })

  return {
    transform: url => {
      const params = (pathToParams(getPath(url)) || null)?.params
      if (!params) {
        return null
      }

      const newUrl = new URL(to, url)
      newUrl.pathname = paramsToPath(params)
      for (const [name, value] of url.searchParams) {
        newUrl.searchParams.append(name, value)
      }
      if (url.hash) {
        newUrl.hash = url.hash
      }
      return String(newUrl)
    },
    status,
  }
}

type CompiledRedirect = {
  transform: (url: URL) => string | null
  status: number
}

const normalizeRedirect = (
  redirect: ReadonlyDeep<Redirect>,
): ReadonlyDeep<ObjectRedirect> => {
  if (`from` in redirect) {
    return redirect
  }

  const [from, to] = redirect
  return { from, to }
}

const isPath = (url: string): boolean => createUrl(url).pathname === url

const getPath = (url: string | URL): string =>
  removeTrailingSlash(createUrl(url).pathname)

const createUrl = (url: string | URL): URL =>
  new URL(url, `https://tomeraberba.ch`)

const removeTrailingSlash = (url: string): string =>
  url.endsWith(`/`) ? url.slice(0, -1) : url

/**
 * An object that specifies a redirect from a path pattern to a URL, optionally
 * with a status code for the redirection.
 *
 * See `ObjectRedirect` for more information.
 */
export type Redirect = TupleRedirect | ObjectRedirect

/**
 * A pair of strings that specifies a redirect from a path pattern (the first
 * string) to a URL (the second string).
 *
 * See `ObjectRedirect` for more information.
 */
export type TupleRedirect = [string, string]

/**
 * An object that specifies a redirect from a path pattern to a URL, optionally
 * with a status code for the redirection.
 */
export type ObjectRedirect = {
  /**
   * A string specifying the pattern a URL's path must match for this redirect
   * to apply to it.
   *
   * The pattern must be a path (no host, query params, fragment, etc.) that
   * follows `path-to-regexp`'s syntax:
   * https://github.com/pillarjs/path-to-regexp#parameters
   *
   * Matching is case-insensitive and ignores trailing slashes.
   */
  from: string

  /**
   * A string specifying the URL to redirect to.
   *
   * The string may use parameters of the {@link ObjectRedirect#from} path
   * pattern according to `path-to-regexp`'s syntax:
   * https://github.com/pillarjs/path-to-regexp#match
   *
   * The string may be a path or a full URL. For the former, the URL returned by
   * {@link RedirectUrl} will use the host of the matching input URL. In both
   * cases, any query params or fragments present on an input URL matching the
   * {@link ObjectRedirect#from} pattern are carried over to the redirect URL.
   *
   * Trailing slashes are always stripped. Query params are always appended,
   * even for duplicate query param names, while the fragments always overwrite.
   */
  to: string

  /**
   * The status code to use for the redirection.
   *
   * Defaults to {@link RedirectUrlOptions#defaultStatus} if not specified.
   */
  status?: number
}

/**
 * The options object for creating a {@link RedirectUrl} function.
 *
 * All properties are optional.
 */
export type RedirectUrlOptions = {
  /**
   * The default status to use for redirects when no particular status is
   * specified.
   *
   * Defaults to 301 ("Moved Permanently").
   */
  defaultStatus?: number

  /**
   * A function for encoding text as a valid component of a URI.
   *
   * Defaults to {@link encodeURIComponent}.
   */
  encode?: (component: string) => string

  /**
   * A function for decoding text that was decoded using
   * {@link RedirectUrlOptions#encode}.
   *
   * Defaults to {@link decodeURIComponent}.
   */
  decode?: (component: string) => string
}

/** The result of computing a redirect for a URL. */
export type RedirectUrlResult = {
  /** The URL to redirect to. */
  url: string

  /** The status code of the redirection. */
  status: number
}

/**
 * A function that returns the URL to redirect the input `url` to, along with a
 * status code for the redirection, or null if no mapping exists for the input
 * URL.
 */
export type RedirectUrl = (url: string) => RedirectUrlResult | null
