import { createPortal } from "react-dom";
import useMobileToggle from "../hooks/useMobileToggle";

export default function Modal({ modalKey, children, onOutOfBoundClick }) {
  const isMobile = useMobileToggle();
  return createPortal(
    <div
      className={`fixed inset-0 bg-black/50 w-screen h-screen flex flex-col items-center overflow-y-auto z-50`}
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
        } p-4 bg-white border-lightBorder shadow-md shadow-black/75 flex flex-col gap-2 relative z-50`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
    modalKey,
  );
}
