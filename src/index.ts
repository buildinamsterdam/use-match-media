import { useEffect, useState } from "react";

import { EventHandler, Query } from "./types";

const queries = new Map<string, Query>();

const getExistingMatch = (query: string, defaultValue = false) => {
  const matchedQuery = queries.get(query);

  // If query already exists, return its matched value, else default value
  return matchedQuery ? matchedQuery.matchMedia.matches : defaultValue;
};

const createEventHandler = (query: string) => (event: MediaQueryListEvent) => {
  const matchedQuery = queries.get(query);

  if (matchedQuery) {
    matchedQuery.existingListeners.forEach((listener) => listener(event));
  }
};

const addListener = (query: string, listener: EventHandler) => {
  const matchedQuery = queries.get(query);

  // If query already exists, add this new listener to existing array
  if (matchedQuery) {
    matchedQuery.existingListeners.push(listener);
    return matchedQuery.matchMedia.matches;
  }

  // Else, first query, so create it...
  const newQuery = {
    matchMedia: window.matchMedia(query),
    existingListeners: [listener],
    eventHandler: createEventHandler(query),
  };
  queries.set(query, newQuery);

  // Listen to changes with fallback
  const currentMatchMedia = newQuery.matchMedia;
  if (!currentMatchMedia.addEventListener) {
    currentMatchMedia.addListener(newQuery.eventHandler);
  } else {
    currentMatchMedia.addEventListener("change", newQuery.eventHandler);
  }

  return newQuery.matchMedia.matches;
};

const removeListener = (query: string, listener: EventHandler) => {
  const matchedQuery = queries.get(query);

  // If this matches, filter out this listener from existing array
  if (matchedQuery) {
    matchedQuery.existingListeners = matchedQuery.existingListeners.filter(
      (l) => l !== listener
    );
  }

  // Ignore unsubscribe below if theres any more existing listeners
  if (!matchedQuery || matchedQuery.existingListeners.length > 0) return;

  // Unsubscribe from changes with fallback
  const currentMatchMedia = matchedQuery.matchMedia;
  if (!currentMatchMedia.removeEventListener) {
    currentMatchMedia.removeListener(matchedQuery.eventHandler);
  } else {
    currentMatchMedia.removeEventListener("change", matchedQuery.eventHandler);
  }

  queries.delete(query);
};

/**
 * Stateful hook that uses the matchMedia API.
 *
 * @param query - The query to match for.
 *
 * @param defaultValue - Fallback value that is returned in SSR and first match
 * of any unique query. Defaults to `false`.
 *
 * @example
 * useMatchMedia("(pointer: coarse)") -> Checks if the browser matches coarse;
 * device of limited accuracy (touch).
 *
 * @example useMatchMedia("(min-width: 600px)") -> Checks if the browser
 * matches a minimum width of 600px.
 *
 * @returns matches - `true` / `false` if the device matches the query, or
 * `defaultValue` as fallback.
 */
const useMatchMedia = (query: string, defaultValue = false) => {
  const [matches, setMatches] = useState(getExistingMatch(query, defaultValue));

  useEffect(() => {
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    const matches = addListener(query, listener);
    setMatches(matches);

    return () => {
      removeListener(query, listener);
    };
  }, [query]);

  return matches;
};

export default useMatchMedia;

export type { EventHandler, Query };
