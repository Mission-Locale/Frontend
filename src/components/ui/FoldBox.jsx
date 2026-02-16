import { textColor } from "@/styles/tokensTailwind";
import { Triangle } from "lucide-react";
import { useState } from "react";

export default function FoldBox({
  header,
  children,
  theme = "brandBlue",
  startOpen = false,
}) {
  const [isOpen, setOpen] = useState(startOpen);

  return (
    <div className="rounded-lg border-2 border-lightBg w-fit">
      <div
        className={`flex flex-row items-end gap-1 px-1 ${isOpen ? "bg-lightBg rounded-t-md" : "bg-white rounded-md"}`}
        onClick={() => setOpen(!isOpen)}
      >
        <p className="font-bold">{header}</p>
        <Triangle
          fill="currentColor"
          transform="scale(1 0.6)"
          className={`w-4 h-4 object-fill transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          } ${textColor[theme]}`}
        />
      </div>
      {isOpen && <div className="rounded-b-md px-1">{children}</div>}
    </div>
  );
}
