import { useLayoutEffect, useState } from "react";

export default function useMobileToggle() {
  const [isMobile, setMobile] = useState(innerWidth < 1024);

  useLayoutEffect(() => {
    function updateSize() {
      setMobile(innerWidth < 1024);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return isMobile;
}
