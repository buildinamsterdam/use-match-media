# use-match-media

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

Stateful hook that uses the matchMedia [API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).

## Introduction

This hook optimizes the use of the match media API by only creating a new listener when a unique query is made, avoiding the creation of unnecessary listeners and increasing efficiency.

This library is also SSR safe, and a default value can be provided for the initial render.

## Installation

Install this package with `npm`.

```bash
npm i @buildinams/use-match-media
```

## Usage

To use the library simply import the hook and pass any custom media query.

```tsx
import useMatchMedia from "@buildinams/use-match-media";

const MyComponent = () => {
  const isTouch = useMatchMedia("(pointer: coarse)");
  ...
};
```

You can even use multiple queries in a single call. Though we recommend using separate hooks for each query to maximize performance.

```tsx
import useMatchMedia from "@buildinams/use-match-media";

const MyComponent = () => {
  const isTouchAndPortrait = useMatchMedia("(pointer: coarse) and (orientation: portrait)");
   ...
};
```

## Using 'defaultValue'

If you want to provide a default value for the initial render (and in server), you can pass it as `defaultValue` within the _optional_ config object.

```tsx
import useMatchMedia from "@buildinams/use-match-media";

const MyComponent = () => {
  const isMobile = useMatchMedia("(max-width: 768px)", { defaultValue: true });
  ...
};
```

Couple things to **note**:

- The default value will only be used on the initial render and SSR. By the second render, the hook will use the actual value matched.
- If left `undefined`, the default value will be `false`.

## Conditionally Listening to Events

You can conditionally listen to events by passing a `isEnabled` prop in the config object. This accepts a `boolean` value, and will only listen to events if the value is `true` (default). For example:

```tsx
import useMatchMedia from "@buildinams/use-match-media";

const MyComponent = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const isMobile = useMatchMedia("(max-width: 768px)", { isEnabled });
  ...
};
```

## Requirements

This library requires a minimum React version of `17.0.0`.

## Requests and Contributing

Found an issue? Want a new feature? Get involved! Please contribute using our guideline [here](https://github.com/buildinamsterdam/use-match-media/blob/main/CONTRIBUTING.md).

[npm-image]: https://img.shields.io/npm/v/@buildinams/use-match-media.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@buildinams/use-match-media
[ci-image]: https://github.com/buildinamsterdam/use-match-media/actions/workflows/test.yml/badge.svg
[ci-url]: https://github.com/buildinamsterdam/use-match-media/actions
[npm-downloads-image]: https://img.shields.io/npm/dm/@buildinams/use-match-media.svg
[npm-downloads-url]: https://npmcharts.com/compare/@buildinams/use-match-media?minimal=true
