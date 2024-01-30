export type Config = {
	/**
	 * Fallback value that is returned in SSR and first match of any unique query.
	 * Defaults to `false`.
	 */
	defaultValue?: boolean | null;

	/** Whether or not to listen to events. Defaults to `true`. */
	isEnabled?: boolean;

	/**
	 * Whether or not to use `useLayoutEffect` instead of `useEffect` on client.
	 * Defaults to `false`.
	 */
	layoutEffect?: boolean;
};

export type EventHandler = (event: MediaQueryListEvent) => void;

export type Query = {
	matchMedia: MediaQueryList;
	existingListeners: EventHandler[];
	eventHandler: EventHandler;
};
