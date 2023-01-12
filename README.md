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

The following examples are all in [Next.js](https://nextjs.org/) but this hook can be used in any React application.

First setup the context provider in your `_app.tsx` file.

```tsx
import { MatchMediaProvider } from "@buildinams/use-match-media";

const MyApp = ({ Component }) => {
  return (
    <MatchMediaProvider>
      <Component />
    </MatchMediaProvider>
  );
};

export default MyApp;
```

Then use the hook in your component.

```tsx
import useMatchMedia from "@buildinams/use-match-media";

const MyComponent = () => {
  const isTouch = useMatchMedia("(pointer: coarse)");
  ...
};
```

## Requirements

This library requires a minimum React version of `18.0.0`.

## Requests and Contributing

Found an issue? Want a new feature? Get involved! Please contribute using our guideline [here](https://github.com/buildinamsterdam/PACKAGE-NAME/blob/main/CONTRIBUTING.md).

[npm-image]: https://img.shields.io/npm/v/@buildinams/use-match-media.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@buildinams/use-match-media
[ci-image]: https://github.com/buildinamsterdam/use-match-media/workflows/test/badge.svg
[ci-url]: https://github.com/buildinamsterdam/use-match-media/actions
[npm-downloads-image]: https://img.shields.io/npm/dm/@buildinams/use-match-media.svg
[npm-downloads-url]: https://npmcharts.com/compare/@buildinams/use-match-media?minimal=true
