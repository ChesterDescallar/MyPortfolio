/**
 * Unit tests — src/lib/sound.tsx
 * Tests the SoundProvider context and useSound hook in isolation.
 */
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { SoundProvider, useSound } from "@/lib/sound";
import { describe, it, expect, beforeEach } from "vitest";

function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(SoundProvider, null, children);
}

describe("useSound hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides default volume of 0.5", () => {
    const { result } = renderHook(() => useSound(), { wrapper });
    expect(result.current.volume).toBe(0.5);
  });

  it("updates volume via setVolume", () => {
    const { result } = renderHook(() => useSound(), { wrapper });
    act(() => result.current.setVolume(0.8));
    expect(result.current.volume).toBe(0.8);
  });

  it("setVolume clamps to 0", () => {
    const { result } = renderHook(() => useSound(), { wrapper });
    act(() => result.current.setVolume(0));
    expect(result.current.volume).toBe(0);
  });

  it("exposes a play function", () => {
    const { result } = renderHook(() => useSound(), { wrapper });
    expect(typeof result.current.play).toBe("function");
  });

  it("play does not throw when volume is 0", () => {
    const { result } = renderHook(() => useSound(), { wrapper });
    act(() => result.current.setVolume(0));
    expect(() => result.current.play("click")).not.toThrow();
  });

  it("play does not throw for all sound keys", () => {
    const { result } = renderHook(() => useSound(), { wrapper });
    const keys = ["click", "hover", "toggle-on", "toggle-off", "xp", "terminal", "error"] as const;
    keys.forEach((key) => {
      expect(() => result.current.play(key)).not.toThrow();
    });
  });

  it("returns the same play reference across re-renders", () => {
    const { result, rerender } = renderHook(() => useSound(), { wrapper });
    const first = result.current.play;
    rerender();
    expect(result.current.play).toBe(first);
  });
});
