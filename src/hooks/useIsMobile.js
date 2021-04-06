import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT
  );

  // run on mount only
  useEffect(() => {
    function isMobileListener() {
      const nextIsMobile = window.innerWidth < MOBILE_BREAKPOINT;

      if (nextIsMobile !== isMobile) {
        setIsMobile(nextIsMobile);
      }
    }

    window.addEventListener("resize", isMobileListener);

    return () => window.removeEventListener("resize", isMobileListener);
  }, [isMobile, setIsMobile]);

  return isMobile;
}
