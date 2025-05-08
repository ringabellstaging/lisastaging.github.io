import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createTextMorpher({
  from,
  to,
  onUpdate,
  delay = 0,
  frameDelay = 50,
}: {
  from: string;
  to: string;
  onUpdate: (text: string) => void;
  delay?: number;
  frameDelay?: number;
}): Promise<void> {
  return new Promise((resolve) => {
    const maxLen = Math.max(from.length, to.length);
    let frame = 0;

    const run = () => {
      const next = Array.from({ length: maxLen }, (_, i) => {
        if (i < frame) return to[i] || '';
        return from[i] || '';
      }).join('');

      onUpdate(next);
      frame++;

      if (frame <= maxLen) {
        setTimeout(run, frameDelay);
      } else {
        resolve();
      }
    };

    setTimeout(run, delay);
  });
}