"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:";

// Scrambles from startText to endText when `triggered` flips, and back when
// it clears. Once settled on endText, renders as a link if href is given.
export function TextScramble({
  startText,
  endText,
  triggered,
  className,
  href,
}: {
  startText: string;
  endText: string;
  triggered: boolean;
  className?: string;
  href?: string;
}) {
  const [display, setDisplay] = useState(startText);
  const [isEnd, setIsEnd] = useState(false);
  const frameRef = useRef(0);
  const prevTriggered = useRef(false);

  const scrambleTo = useCallback(
    (from: string, to: string) => {
      cancelAnimationFrame(frameRef.current);

      const maxLength = Math.max(from.length, to.length);
      const duration = 30;
      let frame = 0;

      const step = () => {
        frame++;
        const progress = frame / duration;

        let result = "";
        for (let i = 0; i < maxLength; i++) {
          if (i >= to.length) {
            if (progress > 0.5 + (i / maxLength) * 0.5) {
              continue;
            }
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          } else if (progress > (i / to.length) * 0.8 + 0.2) {
            result += to[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplay(result);

        if (frame < duration) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          setDisplay(to);
          setIsEnd(to === endText);
        }
      };

      frameRef.current = requestAnimationFrame(step);
    },
    [endText],
  );

  useEffect(() => {
    if (triggered && !prevTriggered.current) {
      scrambleTo(startText, endText);
    } else if (!triggered && prevTriggered.current) {
      scrambleTo(endText, startText);
    }
    prevTriggered.current = triggered;

    return () => cancelAnimationFrame(frameRef.current);
  }, [triggered, startText, endText, scrambleTo]);

  // Keep the resting text in sync while untriggered (e.g. a ticking clock).
  useEffect(() => {
    if (!triggered && !prevTriggered.current) {
      setDisplay(startText);
    }
  }, [startText, triggered]);

  if (isEnd && href) {
    return (
      <a
        href={href}
        className={`transition-opacity hover:opacity-100 ${className ?? ""}`}
      >
        {display}
      </a>
    );
  }

  return <span className={className}>{display}</span>;
}
