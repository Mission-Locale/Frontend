import { useEffectEvent, useLayoutEffect, useState } from "react";

export default function useMobileToggle(
  width,
  widthGetter = () => window.innerWidth
) {
  const [isMobileMode, setMobileMode] = useState(widthGetter() < width);

  const onSizeUpdate = useEffectEvent((width) =>
    setMobileMode(widthGetter() < width)
  );

  useLayoutEffect(() => {
    function updateSize() {
      onSizeUpdate(width);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [width]);

  return isMobileMode;
}
