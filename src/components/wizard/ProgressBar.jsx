export default function ProgressBar({ steps, currentStepId }) {
  const currentIndex = steps.findIndex((step) => step.id === currentStepId);
  const currentStep = steps[currentIndex];
  const total = steps.length;
  const stepNumber = currentIndex + 1;
  const percent = total > 0 ? Math.round((stepNumber / total) * 100) : 0;

  return (
    <div className="w-full">
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Step ${stepNumber} of ${total}: ${currentStep ? currentStep.title : ''}`}
        className="h-2 w-full overflow-hidden rounded-full bg-gray-200"
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {`Step ${stepNumber} of ${total}: ${currentStep ? currentStep.title : ''}`}
      </p>
    </div>
  );
}
