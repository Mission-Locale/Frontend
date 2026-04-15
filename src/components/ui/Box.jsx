export default function Box({ color = "", children }) {
  return (
    <div
      className={`border-lightBorder border-2 rounded-4xl shadow-md p-4 size-full bg-${color}`}
    >
      {children}
    </div>
  );
}
