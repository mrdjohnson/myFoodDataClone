import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

import _ from "lodash";

const MOBILE_BREAKPOINT = 768;

export const isMobileState = atom({
  key: "isMobileState",
  default: window.innerWidth < MOBILE_BREAKPOINT,
});

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);

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
