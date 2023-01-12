import { ReactNode } from "react";

export type EventHandler = (event: MediaQueryListEvent) => void;

export interface Query {
  matchMedia: MediaQueryList;
  existingListeners: EventHandler[];
  eventHandler: EventHandler;
}

export interface Queries {
  [query: string]: Query | undefined;
}

export interface ContextProps {
  addListener: (query: string, listener: EventHandler) => boolean;
  removeListener: (query: string, listener: EventHandler) => void;
  getMatchQuery: (query: string, defaultValue?: boolean) => boolean;
}

export interface ProviderProps {
  children: ReactNode;
}
