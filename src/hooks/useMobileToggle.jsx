import { useLayoutEffect, useState } from "react";

export default function useMobileToggle() {
  const [isMobile, setMobile] = useState(innerWidth < innerHeight);

  useLayoutEffect(() => {
    function updateSize() {
      setMobile(innerWidth < innerHeight);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return isMobile;
}
