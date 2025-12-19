import { createPortal } from "react-dom";
import useMobileToggle from "../hooks/useMobileToggle";

export default function Modal({ modalKey, children, onOutOfBoundClick }) {
  const isMobile = useMobileToggle();
  return createPortal(
    <div
      className={`fixed bg-black/50 w-screen h-screen flex flex-col items-center overflow-y-auto`}
      onClick={onOutOfBoundClick}
    >
      {/* Used margins instead of justify-content as a workaround for a known scrolling issues */}
      <div
        role="dialog"
        aria-modal
        className={`${
          isMobile
            ? "rounded-t-2xl w-screen mt-auto"
            : "rounded-2xl w-fit my-auto"
        } p-4 bg-white border-lightBorder flex flex-col gap-2`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
    modalKey
  );
}
