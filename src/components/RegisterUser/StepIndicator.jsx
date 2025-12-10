export default function StepIndicator({ step, currentStep, isLast }) {
  const isActive = step.id === currentStep;
  const isCompleted = step.id < currentStep;

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold border-2 transition-all ${
            isActive
              ? "bg-white text-brandBlue border-white"
              : isCompleted
              ? "bg-white text-brandBlue border-white"
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
            isCompleted
              ? "bg-white"
              : "bg-white/20"
          }`}
        />
      )}
    </div>
  );
}
