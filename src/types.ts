export type EventHandler = (event: MediaQueryListEvent) => void;

export interface Query {
  matchMedia: MediaQueryList;
  existingListeners: EventHandler[];
  eventHandler: EventHandler;
}
