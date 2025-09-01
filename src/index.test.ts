import { expect, test } from 'vitest'
import { createRedirectUrl, parseRedirectUrl } from './index.ts'
import type { RedirectUrlResult } from './index.ts'

test.each([
  [`https://tomeraberba.ch`, [`https://tomeraberba.ch/0`, 302]],
  [`https://tomeraberba.ch/`, [`https://tomeraberba.ch/0`, 302]],

  [`https://tomeraberba.ch/a`, [`https://tomeraberba.ch/1`, 302]],
  [`https://tomeraberba.ch/a/`, [`https://tomeraberba.ch/1`, 302]],

  [`https://tomeraberba.ch/b`, [`https://tomeraberba.ch/2`, 302]],
  [`https://tomeraberba.ch/b/`, [`https://tomeraberba.ch/2`, 302]],

  [`https://tomeraberba.ch/c`, [`https://tomeraberba.ch/3`, 302]],
  [`https://tomeraberba.ch/c/`, [`https://tomeraberba.ch/3`, 302]],

  [`https://tomeraberba.ch/d`, [`https://tomeraberba.ch/4`, 302]],
  [`https://tomeraberba.ch/d/`, [`https://tomeraberba.ch/4`, 302]],

  [`https://tomeraberba.ch/e`, null],
  [`https://tomeraberba.ch/e/`, null],

  [`https://tomeraberba.ch/e/x`, [`https://tomeraberba.ch/5/x`, 302]],
  [`https://tomeraberba.ch/e/x/`, [`https://tomeraberba.ch/5/x`, 302]],

  [`https://tomeraberba.ch/x`, [`https://tomeraberba.ch/y`, 307]],
  [`https://tomeraberba.ch/x/`, [`https://tomeraberba.ch/y`, 307]],

  [`https://tomeraberba.ch?a=b`, [`https://tomeraberba.ch/0?a=b`, 302]],
  [`https://tomeraberba.ch/?a=b`, [`https://tomeraberba.ch/0?a=b`, 302]],
  [`https://tomeraberba.ch#x`, [`https://tomeraberba.ch/0#x`, 302]],
  [`https://tomeraberba.ch/#x`, [`https://tomeraberba.ch/0#x`, 302]],
  [`https://tomeraberba.ch?a=b#x`, [`https://tomeraberba.ch/0?a=b#x`, 302]],
  [`https://tomeraberba.ch/?a=b#x`, [`https://tomeraberba.ch/0?a=b#x`, 302]],

  [`https://tomeraberba.ch/f`, [`https://tomeraberba.ch/6?a=b`, 302]],
  [`https://tomeraberba.ch/f/`, [`https://tomeraberba.ch/6?a=b`, 302]],
  [`https://tomeraberba.ch/f?a=c`, [`https://tomeraberba.ch/6?a=b&a=c`, 302]],
  [`https://tomeraberba.ch/f/?a=c`, [`https://tomeraberba.ch/6?a=b&a=c`, 302]],
  [`https://tomeraberba.ch/f?x=y`, [`https://tomeraberba.ch/6?a=b&x=y`, 302]],
  [`https://tomeraberba.ch/f/?x=y`, [`https://tomeraberba.ch/6?a=b&x=y`, 302]],
  [`https://tomeraberba.ch/f#x`, [`https://tomeraberba.ch/6?a=b#x`, 302]],
  [`https://tomeraberba.ch/f/#x`, [`https://tomeraberba.ch/6?a=b#x`, 302]],

  [`https://tomeraberba.ch/g`, [`https://tomeraberba.ch/7#x`, 302]],
  [`https://tomeraberba.ch/g/`, [`https://tomeraberba.ch/7#x`, 302]],
  [`https://tomeraberba.ch/g?x=y`, [`https://tomeraberba.ch/7?x=y#x`, 302]],
  [`https://tomeraberba.ch/g/?x=y`, [`https://tomeraberba.ch/7?x=y#x`, 302]],
  [`https://tomeraberba.ch/g#y`, [`https://tomeraberba.ch/7#y`, 302]],
  [`https://tomeraberba.ch/g/#y`, [`https://tomeraberba.ch/7#y`, 302]],
  [`https://tomeraberba.ch/g?x=y#y`, [`https://tomeraberba.ch/7?x=y#y`, 302]],
  [`https://tomeraberba.ch/g/?x=y#y`, [`https://tomeraberba.ch/7?x=y#y`, 302]],

  [`https://tomeraberba.ch/i/wow`, [`https://tomeraberba.ch/wow`, 302]],
  [`https://tomeraberba.ch/i/wow.html`, [`https://tomeraberba.ch/wow`, 302]],
] as const)(`createRedirectUrl - %p -> %p (%p)`, (url, result) => {
  const redirectUrl = createRedirectUrl([
    [`/`, `/0`],
    [`/a/`, `/1`],
    [`/a`, `/never1`],
    [`/b`, `/2/`],
    [`/b/`, `/never2`],
    [`/c`, `/3`],
    [`/d/`, `/4/`],
    [`/e/:splat+`, `/5/:splat+`],
    { from: `/x`, to: `/y`, status: 307 },
    [`/f`, `/6?a=b`],
    [`/g`, `/7/#x`],
    [`/h`, `/8?a=b#x`],
    [`/i/:splat*(\\.html)?`, `/:splat*`],
  ])

  expect(redirectUrl(url)).toStrictEqual(createResult(result))
})

const createResult = (
  result: readonly [string, number] | null,
): RedirectUrlResult | null => result && { url: result[0], status: result[1] }

test(`createRedirectUrl - default status`, () => {
  const redirectUrl = createRedirectUrl([[`/`, `/hello`]], {
    defaultStatus: 307,
  })

  expect(redirectUrl(`https://tomeraberba.ch`)).toStrictEqual({
    url: `https://tomeraberba.ch/hello`,
    status: 307,
  })
})

test(`parseRedirectUrl - too few parts in line`, () => {
  expect(() => parseRedirectUrl(`/`)).toThrow(new Error(`Bad part count:\n/`))
})

test(`parseRedirectUrl - too many parts in line`, () => {
  expect(() => parseRedirectUrl(`/ /hello 307 HELLO`)).toThrow(
    new Error(`Bad part count:\n/ /hello 307 HELLO`),
  )
})

test(`parseRedirectUrl - bad status`, () => {
  expect(() => parseRedirectUrl(`/ /hello howdy`)).toThrow(
    new TypeError(`Bad status: howdy`),
  )
})

test(`parseRedirectUrl - success`, () => {
  const redirectUrl = parseRedirectUrl(`
    /a /b
    # comment

    /c /d?x=2#x 307
  `)

  expect(redirectUrl(`https://tomeraberba.ch/a`)).toStrictEqual({
    url: `https://tomeraberba.ch/b`,
    status: 302,
  })
  expect(redirectUrl(`https://tomeraberba.ch/c`)).toStrictEqual({
    url: `https://tomeraberba.ch/d?x=2#x`,
    status: 307,
  })
})
