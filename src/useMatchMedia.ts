import { useContext, useEffect, useState } from "react";
import MatchMediaContext from "./MatchMediaContext";

/**
 * Stateful hook that uses the matchMedia API.
 *
 * @param query - The query to match for.
 *
 * @param defaultValue - Fallback value that is returned in SSR and first match
 * of any unique query. Defaults to `false`.
 *
 * @example
 * useMatchMedia('(pointer: coarse)') -> Checks if the browser matches coarse;
 * device of limited accuracy (touch).
 *
 * @example useMatchMedia('(min-width: 600px)') -> Checks if the browser
 * matches a minimum width of 600px.
 *
 * @returns matches - `true` / `false` if the device matches the query, or
 * `defaultValue` as fallback.
 */
const useMatchMedia = (query: string, defaultValue = false) => {
  const { getMatchQuery, addListener, removeListener } =
    useContext(MatchMediaContext);

  const [matches, setMatches] = useState(getMatchQuery(query, defaultValue));

  useEffect(() => {
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    const queryMatches = addListener(query, listener);
    setMatches(queryMatches);

    return () => {
      removeListener(query, listener);
    };
  }, [query, addListener, removeListener]);

  return matches;
};

export default useMatchMedia;
