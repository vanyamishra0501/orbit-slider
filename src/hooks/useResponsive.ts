import { useEffect, useState } from "react";

export type ScreenSize =
  | "mobile"
  | "tablet"
  | "desktop";

export function useResponsive(): ScreenSize {
  const getScreenSize = (): ScreenSize => {
    if (window.innerWidth < 768) {
      return "mobile";
    }

    if (window.innerWidth < 1024) {
      return "tablet";
    }

    return "desktop";
  };

  const [screenSize, setScreenSize] =
    useState<ScreenSize>(getScreenSize);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return screenSize;
}