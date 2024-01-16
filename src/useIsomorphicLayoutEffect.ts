import { useEffect, useLayoutEffect } from "react";

const IS_BROWSER = typeof window !== "undefined";

/**
 * Small hook to run `useLayoutEffect` on the browser and `useEffect` on the
 * server. This is useful for SSR, where `useLayoutEffect` will throw an error.
 */
export const useIsomorphicLayoutEffect = IS_BROWSER
	? useLayoutEffect
	: useEffect;
