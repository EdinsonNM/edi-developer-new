import { useEffect, useState, useRef } from "react";

const REFERENCE_WIDTH = 1920;
const MOBILE_THRESHOLD = 990;
const RESIZE_DEBOUNCE_MS = 150;

export const useMobile = () => {
  const [scaleFactor, setScaleFactor] = useState(
    typeof window !== "undefined" ? window.innerWidth / REFERENCE_WIDTH : 1
  );
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.innerWidth <= MOBILE_THRESHOLD
      : false
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const w = window.innerWidth;
        setScaleFactor(w / REFERENCE_WIDTH);
        setIsMobile(w <= MOBILE_THRESHOLD);
        timeoutRef.current = null;
      }, RESIZE_DEBOUNCE_MS);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    scaleFactor,
    isMobile,
  };
};
