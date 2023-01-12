import { memo, useMemo, useRef } from "react";
import MatchMediaContext from "./MatchMediaContext";
import { EventHandler, ProviderProps, Queries } from "./types";

const MatchMediaProvider = ({ children }: ProviderProps) => {
  const queries = useRef<Queries>({});

  const contextValue = useMemo(() => {
    const createEventHandler =
      (query: string) => (event: MediaQueryListEvent) => {
        const current = queries.current[query];
        current?.existingListeners.forEach((listener) => listener(event));
      };

    return {
      addListener: (query: string, listener: EventHandler) => {
        let current = queries.current[query];

        // If query already exists, add this new listener to existing array
        if (current) {
          current.existingListeners.push(listener);
          return current.matchMedia.matches;
        }

        // Else, first query, so create it...
        current = queries.current[query] = {
          matchMedia: window.matchMedia(query),
          existingListeners: [listener],
          eventHandler: createEventHandler(query),
        };

        // Listen to changes with fallback
        const currentMatchMedia = current.matchMedia;
        if (!currentMatchMedia.addEventListener) {
          currentMatchMedia.addListener(current.eventHandler);
        } else {
          currentMatchMedia.addEventListener("change", current.eventHandler);
        }

        return current.matchMedia.matches;
      },

      removeListener: (query: string, listener: EventHandler) => {
        const current = queries.current[query];

        // If this matches, filter out this listener from existing array
        if (current) {
          current.existingListeners = current.existingListeners.filter(
            (l) => l !== listener
          );
        }

        // Ignore unsubscribe below if theres any more existing listeners
        if (!current || current.existingListeners.length > 0) return;

        // Unsubscribe from changes with fallback
        const currentMatchMedia = current.matchMedia;
        if (!currentMatchMedia.removeEventListener) {
          currentMatchMedia.removeListener(current.eventHandler);
        } else {
          currentMatchMedia.removeEventListener("change", current.eventHandler);
        }

        queries.current[query] = undefined;
      },

      getMatchQuery: (query: string, defaultValue = false) => {
        return queries.current?.[query]?.matchMedia.matches || defaultValue;
      },
    };
  }, []);

  return (
    <MatchMediaContext.Provider value={contextValue}>
      {children}
    </MatchMediaContext.Provider>
  );
};

/** Provider for `useMatchMedia` hook. */
export default memo(MatchMediaProvider);
