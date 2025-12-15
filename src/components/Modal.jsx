import { createPortal } from "react-dom";
import useMobileToggle from "../hooks/useMobileToggle";

export default function Modal({ key, childrens, onOutOfBoundClick }) {
  const isMobile = useMobileToggle();
  return createPortal(
    <div
      className={`fixed bg-black opacity-50 w-screen h-screen flex flex-col ${
        isMobile ? "justify-end" : "justify-center"
      } justify-items-center`}
      onClick={onOutOfBoundClick}
    >
      <div
        role="dialog"
        aria-modal
        className={`${
          isMobile ? "rounded-t-lg" : "rounded-lg"
        } bg-white border-lightBorder w-screen flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {childrens}
      </div>
    </div>,
    document.body,
    key
  );
}
