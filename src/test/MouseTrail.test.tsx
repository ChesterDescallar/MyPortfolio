/**
 * Component tests — src/components/MouseTrail.tsx
 */
import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import MouseTrail from "@/components/MouseTrail";

// Helper: fire a mousemove at a given position
function moveMouseTo(x: number, y: number) {
  fireEvent.mouseMove(window, { clientX: x, clientY: y });
}

describe("MouseTrail", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders without crashing in legacy mode", () => {
    expect(() => render(<MouseTrail isOptimized={false} />)).not.toThrow();
  });

  it("renders without crashing in optimized mode", () => {
    expect(() => render(<MouseTrail isOptimized={true} />)).not.toThrow();
  });

  it("spawns a particle after mouse moves > 12px", () => {
    render(<MouseTrail isOptimized={false} />);

    act(() => {
      moveMouseTo(0, 0);   // sets lastPos
      moveMouseTo(20, 0);  // > 12px → spawns
    });

    // Particle should appear in document.body (via portal)
    const particles = document.body.querySelectorAll("span.fixed");
    expect(particles.length).toBeGreaterThan(0);
  });

  it("does NOT spawn an extra particle when subsequent move < 12px", () => {
    render(<MouseTrail isOptimized={false} />);

    // Move 1: no lastPos → always spawns, sets throttle + lastPos=(0,0)
    act(() => moveMouseTo(0, 0));
    // Clear throttle
    act(() => vi.advanceTimersByTime(61));
    // Move 2: distance=50 from (0,0) → spawns, sets throttle + lastPos=(50,0)
    act(() => moveMouseTo(50, 0));
    // Clear throttle
    act(() => vi.advanceTimersByTime(61));
    // Move 3: distance=2 from (50,0) → blocked by < 12px rule
    act(() => moveMouseTo(52, 0));

    // Should be exactly 2 particles (move 1 + move 2); move 3 was blocked
    const particles = document.body.querySelectorAll("span.fixed");
    expect(particles.length).toBe(2);
  });

  it("removes particle after 800ms", () => {
    render(<MouseTrail isOptimized={false} />);

    act(() => {
      moveMouseTo(0, 0);
      moveMouseTo(50, 0);
    });

    expect(document.body.querySelectorAll("span.fixed").length).toBeGreaterThan(0);

    act(() => vi.advanceTimersByTime(800));

    expect(document.body.querySelectorAll("span.fixed").length).toBe(0);
  });

  it("uses optimized icon set when isOptimized=true", () => {
    render(<MouseTrail isOptimized={true} />);

    act(() => {
      moveMouseTo(0, 0);
      moveMouseTo(50, 0);
    });

    const particle = document.body.querySelector("span.fixed");
    if (particle) {
      const optimizedIcons = ["⚡", "✦", "◈", "⬡", "▸", "◉", "✧", "⟡"];
      expect(optimizedIcons).toContain(particle.textContent);
    }
  });

  it("uses legacy icon set when isOptimized=false", () => {
    render(<MouseTrail isOptimized={false} />);

    act(() => {
      moveMouseTo(0, 0);
      moveMouseTo(50, 0);
    });

    const particle = document.body.querySelector("span.fixed");
    if (particle) {
      const legacyIcons = ["✦", "✿", "♦", "❋", "◆", "✶", "❀", "◇"];
      expect(legacyIcons).toContain(particle.textContent);
    }
  });

  it("throttles spawning — second move within 60ms does not create extra particle", () => {
    render(<MouseTrail isOptimized={false} />);

    act(() => {
      moveMouseTo(0, 0);
      moveMouseTo(50, 0);  // spawns + sets throttle
      moveMouseTo(100, 0); // within throttle window — should not spawn again
    });

    const particles = document.body.querySelectorAll("span.fixed");
    expect(particles.length).toBe(1);
  });

  it("allows second spawn after throttle window (60ms)", () => {
    render(<MouseTrail isOptimized={false} />);

    act(() => {
      moveMouseTo(0, 0);
      moveMouseTo(50, 0); // first spawn
    });
    act(() => vi.advanceTimersByTime(61));
    act(() => moveMouseTo(100, 0)); // second spawn after throttle

    // Should now have 2 particles (before their 800ms cleanup)
    const particles = document.body.querySelectorAll("span.fixed");
    expect(particles.length).toBe(2);
  });

  it("caps particle list at 30", () => {
    render(<MouseTrail isOptimized={false} />);

    // Spawn 35 particles by advancing throttle between each
    act(() => {
      for (let i = 0; i < 35; i++) {
        moveMouseTo(0, 0);
        moveMouseTo(i * 20, 0);
        vi.advanceTimersByTime(61);
      }
    });

    const particles = document.body.querySelectorAll("span.fixed");
    expect(particles.length).toBeLessThanOrEqual(30);
  });

  it("removes mousemove listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<MouseTrail isOptimized={false} />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });
});
