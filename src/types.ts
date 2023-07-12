export type EventHandler = (event: MediaQueryListEvent) => void;

export interface Query {
  matchMedia: MediaQueryList;
  existingListeners: EventHandler[];
  eventHandler: EventHandler;
}

export interface Config {
  /**
   * Fallback value that is returned in SSR and first match of any unique query.
   * Defaults to `false`.
   */
  defaultValue?: boolean;

  /**
   * This can be used to conditionally enable / disable the event listener.
   * Defaults to `true`.
   */
  isEnabled?: boolean;
}
