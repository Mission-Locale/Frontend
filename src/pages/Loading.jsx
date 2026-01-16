import logo from "/assets/img/Logo_Mission_Locale.webp";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-40 mx-auto mb-6">
          <img src={logo} alt="Logo" className="w-full" />
        </div>

        <h2 className="text-gray-600">
          Veuillez patienter quelques instants...
        </h2>

        <div className="flex justify-center gap-2 mt-6">
          <div
            className="w-2 h-2 bg-brandBlue rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-brandBlue rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-brandBlue rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
