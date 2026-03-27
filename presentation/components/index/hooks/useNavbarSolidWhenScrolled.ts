import { useState, useEffect } from "react";

/**
 * true cuando el scroll supera `threshold` (p. ej. fondo sólido en la barra).
 */
export function useNavbarSolidWhenScrolled(thresholdPx = 32) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > thresholdPx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholdPx]);

  return isScrolled;
}
