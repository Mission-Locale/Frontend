import { selectThemes } from "@/styles/tokensTailwind";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import HeaderLinkList from "./HeaderLinkList";

export default function HeaderDropdown({
  label,
  links = [],
  theme = "brandBlue",
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
    <div ref={selectRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
            w-full px-2 flex items-center gap-0.5 justify-between rounded-md
            ${selectThemes[theme].trigger}
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
