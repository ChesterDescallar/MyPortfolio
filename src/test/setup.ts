import "@testing-library/jest-dom";

// Stub Web Audio API (used by useSound)
class AudioContextMock {
  state = "suspended";
  resume = vi.fn().mockResolvedValue(undefined);
  createGain = vi.fn(() => ({
    gain: { value: 1 },
    connect: vi.fn(),
  }));
  createBufferSource = vi.fn(() => ({
    buffer: null,
    connect: vi.fn(),
    start: vi.fn(),
    onended: null,
  }));
  decodeAudioData = vi.fn().mockResolvedValue({});
  destination = {};
}

Object.defineProperty(window, "AudioContext", { value: AudioContextMock, writable: true });
Object.defineProperty(window, "webkitAudioContext", { value: AudioContextMock, writable: true });

// Stub fetch (sound files)
global.fetch = vi.fn().mockResolvedValue({
  arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(0)),
});

// Stub window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Stub ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => { cb(0); return 0; });
global.cancelAnimationFrame = vi.fn();
