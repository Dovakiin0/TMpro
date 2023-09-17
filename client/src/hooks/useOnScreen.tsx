import { RefObject, useState, useMemo, useEffect } from "react";

// custom hook to check if an element in the document is visible on screen
export default function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting),
      ),
    [ref],
  );

  useEffect(() => {
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}
