import { renderHook } from "@testing-library/react";
import MatchMediaMock from "jest-matchmedia-mock";

import useMatchMedia, { MatchMediaProvider } from "../lib";

let matchMedia: MatchMediaMock;

/**
 * Small helper function that simply returns `renderHook` for `useMatchMedia`
 * with `MatchMediaProvider` as a wrapper.
 */
const renderUseMatchMedia = (query: string, defaultValue?: boolean) => {
  return renderHook(() => useMatchMedia(query, defaultValue), {
    wrapper: MatchMediaProvider,
  });
};

describe("The hook", () => {
  beforeEach(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it("should return 'false' if query doesn't match", () => {
    matchMedia.useMediaQuery("(pointer: fine)");

    const { result } = renderUseMatchMedia("(pointer: coarse)");

    expect(result.current).toEqual(false);
  });

  it("should return 'true' if query matches", () => {
    matchMedia.useMediaQuery("(pointer: coarse)");

    const { result } = renderUseMatchMedia("(pointer: coarse)");

    expect(result.current).toEqual(true);
  });

  it("should cleanup after unmounting", () => {
    const query = "(pointer: coarse)";

    const { unmount } = renderUseMatchMedia(query);

    expect(matchMedia.getListeners(query).length).toEqual(1);

    unmount();

    expect(matchMedia.getListeners(query).length).toEqual(0);
  });
});
