"use client";

import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

interface SoundContextValue {
  volume: number;
  setVolume: (v: number) => void;
  play: (sound: SoundKey) => void;
}

export type SoundKey = "click" | "hover" | "toggle-on" | "toggle-off" | "xp" | "terminal" | "error";

const SOUNDS: Record<SoundKey, string> = {
  click:        "/sounds/click.wav",
  hover:        "/sounds/hover.wav",
  "toggle-on":  "/sounds/toggle-on.wav",
  "toggle-off": "/sounds/toggle-off.wav",
  xp:           "/sounds/xp.wav",
  terminal:     "/sounds/terminal.wav",
  error:        "/sounds/error.wav",
};

const SoundContext = createContext<SoundContextValue>({
  volume: 0.5,
  setVolume: () => {},
  play: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [volume, setVolumeState] = useState(0.5);
  const volumeRef = useRef(0.5);
  const cache = useRef<Map<SoundKey, AudioBuffer>>(new Map());
  const ctx = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctx.current) ctx.current = new AudioContext();
    return ctx.current;
  }, []);

  // Pre-load all sounds
  useEffect(() => {
    const ac = getCtx();
    Object.entries(SOUNDS).forEach(([key, url]) => {
      fetch(url)
        .then((r) => r.arrayBuffer())
        .then((ab) => ac.decodeAudioData(ab))
        .then((buf) => cache.current.set(key as SoundKey, buf))
        .catch(() => {});
    });
  }, [getCtx]);

  const setVolume = useCallback((v: number) => {
    volumeRef.current = v;
    setVolumeState(v);
  }, []);

  const play = useCallback((sound: SoundKey) => {
    if (volumeRef.current === 0) return;
    try {
      const ac = getCtx();
      if (ac.state === "suspended") ac.resume();
      const buf = cache.current.get(sound);
      if (!buf) return;
      const src = ac.createBufferSource();
      src.buffer = buf;
      const gain = ac.createGain();
      gain.gain.value = volumeRef.current;
      src.connect(gain);
      gain.connect(ac.destination);
      src.start();
    } catch {}
  }, [getCtx]);

  return (
    <SoundContext.Provider value={{ volume, setVolume, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
