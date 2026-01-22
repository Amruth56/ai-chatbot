import { useEffect, useRef } from "react";

export function useAutoScroll<T>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  });

  return ref;
}
