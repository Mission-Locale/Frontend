import { bg, textColor, sizes, radius } from "../../styles/tokensTailwind.js";

export default function Button({
  text,
  color,
  size,
  variant,
  radiusSize,
  width,
  onClick,
  disabled,
}) {
  const variants = {
    full: `${bg[color]} ${textColor.white} border border-lightBorder`,
    outline: `bg-transparent text-gray-500 border border-lightBorder`,
    ghost: `bg-transparent ${textColor[color]}`,
  };

  return (
    <button
      className={`${variants[variant]} ${sizes[size]} ${radius[radiusSize]} font-bold cursor-pointer`}
      style={{ width }}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}