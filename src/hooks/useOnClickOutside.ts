import React, { useEffect } from "react";

// Common Event type for mouse click and touch.
type Event = MouseEvent | TouchEvent;

/**
 * Custom hook to detect a click or a touch outside a element.
 *
 * @param ref Ref pointing to the element for which the outside click must be detected.
 * @param handler Function that is to be run on outside click.
 */
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements.
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      // If clicking outside, then call the handler.
      handler(event);
    };

    // Add listeners.
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Remove listeners.
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };

    // Reload only if ref or handler changes.
  }, [ref, handler]);
};