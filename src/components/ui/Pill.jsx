import { bg } from "@/styles/tokensTailwind";

export default function Pill({ content, theme }) {
  return (
    <span className={`rounded-md ${bg[theme]} text-white px-2 py-1 text-sm`}>
      {content}
    </span>
  );
}
