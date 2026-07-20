export default function StepNavigation({
  onPrev, onNext, onSaveDraft, isFirstStep, isLastStep, nextDisabled,
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirstStep}
        className="min-h-[44px] min-w-[44px] rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <button
        type="button"
        onClick={onSaveDraft}
        className="min-h-[44px] min-w-[44px] rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary"
      >
        Save Draft
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        aria-disabled={nextDisabled}
        className="min-h-[44px] min-w-[44px] rounded-md bg-primary px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLastStep ? 'Submit' : 'Next'}
      </button>
    </div>
  );
}
