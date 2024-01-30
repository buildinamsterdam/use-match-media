import { renderHook } from "@testing-library/react";
import MatchMediaMock from "jest-matchmedia-mock";

import useMatchMedia from "../dist";

let matchMedia: MatchMediaMock;

describe("The hook", () => {
	beforeEach(() => {
		matchMedia = new MatchMediaMock();
	});

	afterEach(() => {
		matchMedia.clear();
	});

	it("should return 'false' if query doesn't match", () => {
		matchMedia.useMediaQuery("(pointer: fine)");

		const { result } = renderHook(() => useMatchMedia("(pointer: coarse)"));

		expect(result.current).toEqual(false);
	});

	it("should return default value 'true' if query doesn't match", () => {
		const { result } = renderHook(() =>
			useMatchMedia("(pointer: coarse)", {
				defaultValue: true,

				// Under the hood, the hook instantly runs 'useEffect' in tests so we
				// need to disable it to be able to test the default value
				isEnabled: false,
			}),
		);

		expect(result.current).toEqual(true);
	});

	it("should return default value 'null' if query doesn't match", () => {
		const { result } = renderHook(() =>
			useMatchMedia("(pointer: coarse)", {
				defaultValue: null,

				// Under the hood, the hook instantly runs 'useEffect' in tests so we
				// need to disable it to be able to test the default value
				isEnabled: false,
			}),
		);

		expect(result.current).toEqual(null);
	});

	it("should return default value 'undefined' if query doesn't match", () => {
		const { result } = renderHook(() =>
			useMatchMedia("(pointer: coarse)", {
				defaultValue: undefined,

				// Under the hood, the hook instantly runs 'useEffect' in tests so we
				// need to disable it to be able to test the default value
				isEnabled: false,
			}),
		);

		expect(result.current).toEqual(undefined);
	});

	it("should return 'true' if query matches", () => {
		matchMedia.useMediaQuery("(pointer: coarse)");

		const { result } = renderHook(() => useMatchMedia("(pointer: coarse)"));

		expect(result.current).toEqual(true);
	});

	it("should only create one listener for the same query", async () => {
		const query = "(pointer: coarse)";

		renderHook(() => useMatchMedia(query));
		renderHook(() => useMatchMedia(query));

		expect(matchMedia.getListeners(query).length).toEqual(1);
	});

	it("should cleanup after unmounting", () => {
		const query = "(pointer: coarse)";

		const { unmount } = renderHook(() => useMatchMedia("(pointer: coarse)"));

		expect(matchMedia.getListeners(query).length).toEqual(1);

		unmount();

		expect(matchMedia.getListeners(query).length).toEqual(0);
	});

	it("doesn't add event listener if listen is set to 'false' on mount", () => {
		const query = "(pointer: coarse)";

		renderHook(() => useMatchMedia(query, { isEnabled: false }));

		expect(matchMedia.getListeners(query).length).toEqual(0);
	});
});
