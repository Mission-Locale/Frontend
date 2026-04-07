import { selectThemes } from "@/styles/tokensTailwind";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import HeaderLinkList from "./HeaderLinkList";

export default function HeaderDropdown({
  label = "brandBlue",
  links = [],
  theme,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative w-full mb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
            w-full flex items-center justify-between rounded-md
            ${selectThemes[theme].trigger}
            focus:outline-none focus:ring-2 focus:ring-offset-2
            transition-all duration-200 cursor-pointer
          `}
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && <HeaderLinkList links={links} theme={theme} />}
    </div>
  );
}
