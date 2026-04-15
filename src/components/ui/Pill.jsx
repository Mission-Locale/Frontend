import { bg } from "@/styles/tokensTailwind";

const sizes = {
  sm: "px-2 py-1",
  md: "px-4 py-1.5",
};

export default function Pill({
  content,
  theme,
  size = "sm",
  onClick = undefined,
}) {
  return (
    <span
      className={`rounded-md ${bg[theme]} text-white ${sizes[size]} text-sm ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {content}
    </span>
  );
}
