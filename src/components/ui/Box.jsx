export default function Box({ children }) {
  return (
    <div className="border-lightBorder border-2 rounded-4xl shadow-md p-4 size-full">
      {children}
    </div>
  );
}
