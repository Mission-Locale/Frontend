import { bg, textColor, sizes, radius, border } from "../../styles/tokensTailwind.js";

export default function Button({
  text,
  color,
  size,
  variant,
  radiusSize,
  width,
  onClick,
  disabled = false,
  type = "button"
}) {

    const variants = {
    full: `${bg[color]} ${textColor.white} border border-lightBorder`,
    outline: `bg-transparent text-gray-500 border border-lightBorder`,
    ghost: `bg-transparent ${textColor[color]} border ${border[color]}`,
  }

  return (
    <button
      type={type}
      className={`${variants[variant]} ${sizes[size]} ${radius[radiusSize]} font-bold ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer'
      }`}
      style={{ width }}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}