/**
 * Shared test utilities and mock wrappers
 */
import React from "react";
import { SoundProvider } from "@/lib/sound";

/** Wraps children in all required context providers */
export function AllProviders({ children }: { children: React.ReactNode }) {
  return <SoundProvider>{children}</SoundProvider>;
}

/** Mock play fn — returned by vi.fn() so tests can assert calls */
export const mockPlay = vi.fn();

vi.mock("@/lib/sound", () => ({
  SoundProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useSound: () => ({ play: mockPlay, volume: 0.5, setVolume: vi.fn() }),
}));

// Framer-motion: render children immediately, skip animations
vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line react/display-name
        React.forwardRef(({ children, ...rest }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }, ref: React.Ref<HTMLElement>) =>
          React.createElement(tag, { ...rest, ref }, children)
        ),
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
