import { textColor, bg } from "@/styles/tokensTailwind";

export default function StepIndicator({
  step,
  isLast,
  currentStep,
  branding,
  isMobile,
}) {
  const isActive = step.id === currentStep;
  const isCompleted = step.id < currentStep;

  if (isMobile) {
    return (
      <>
        <div className="flex items-center shrink-0">
          <div
            className={`size-9 rounded-full flex justify-center items-center text-lg font-bold transition-all ${
              isActive
                ? `${bg[branding]} text-white`
                : isCompleted
                ? `${bg[branding]} text-white`
                : "bg-gray-400 border border-gray-600 text-gray-700"
            }`}
          >
            {step.id}
          </div>
          {isActive && (
            <p className="text-sm text-center text-slate-900 font-semibold mx-3">
              {step.label}
            </p>
          )}
        </div>
        {!isLast && !isActive && (
          <div
            className={`flex-1 h-0.5 min-w-2 ${
              isCompleted ? bg[branding] : "bg-gray-400"
            }`}
          />
        )}
      </>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold border-2 transition-all ${
            isActive
              ? "bg-white " + textColor[branding] + " border-white"
              : isCompleted
              ? "bg-white " + textColor[branding] + " border-white"
              : "bg-transparent border-white/30 text-white/70"
          }`}
        >
          {step.id}
        </div>
        <div className="flex-1">
          <p
            className={`text-sm ${
              isActive ? "text-white font-bold" : "text-white/70"
            }`}
          >
            {step.label}
          </p>
        </div>
      </div>
      {!isLast && (
        <div
          className={`absolute left-7 top-14 h-20 w-0.5 ${
            isCompleted ? "bg-white" : "bg-white/20"
          }`}
        />
      )}
    </div>
  );
}
