import {
  bg,
  textColor,
  sizes,
  radius,
  border,
} from "../../styles/tokensTailwind.js";

export default function Button({
  text,
  color,
  size,
  variant,
  radiusSize,
  width,
  onClick,
  disabled = false,
  logo,
  logoBeforeText = true,
  type = "button",
}) {
  const variants = {
    full: `${bg[color]} ${textColor.white} border border-lightBorder`,
    outline: `bg-transparent text-gray-500 border border-lightBorder`,
    ghost: `bg-transparent ${textColor[color]} border ${border[color]}`,
  };

  return (
    <button
      type={type}
      className={`${variants[variant]} ${sizes[size]} ${radius[radiusSize]} font-bold 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      style={{ width }}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center justify-center">
        {logo && logoBeforeText && <span className="mr-2">{logo}</span>}
        {text}
        {logo && !logoBeforeText && <span className="ml-2">{logo}</span>}
      </div>
    </button>
  );
}
