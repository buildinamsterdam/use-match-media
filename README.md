# use-match-media

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

Stateful hook that uses the matchMedia API.

## Introduction

Most match media hooks create a new listener for each use of the hook. This hook instead only creates a new listener if a given query has not been used before. This prevents unnecessary listeners from being created and allows for a more efficient use of the match media API. To achieve this, this hook utilizes a global match media provider to manage queries.

This library is also SSR safe.

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
  const isTouch = useMatchMedia("coarse");
  ...
};
```

[npm-image]: https://img.shields.io/npm/v/@buildinams/use-match-media.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@buildinams/use-match-media
[ci-image]: https://github.com/buildinamsterdam/use-match-media/workflows/test/badge.svg
[ci-url]: https://github.com/buildinamsterdam/use-match-media/actions
[npm-downloads-image]: https://img.shields.io/npm/dm/@buildinams/use-match-media.svg
[npm-downloads-url]: https://npmcharts.com/compare/@buildinams/use-match-media?minimal=true
