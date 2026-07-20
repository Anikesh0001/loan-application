import { forwardRef, useId } from 'react';
import ErrorMessage from './ErrorMessage';

const Checkbox = forwardRef((
  {
    label, error, helpText, required = false, id, className = '', ...rest
  },
  ref,
) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;
  const helpTextId = `${checkboxId}-help`;
  const errorId = `${checkboxId}-error`;
  const describedBy = [helpText && helpTextId, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex min-h-[44px] items-center gap-2">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          aria-required={required || undefined}
          className="h-5 w-5 rounded border-gray-300 text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
          {...rest}
        />
        <label htmlFor={checkboxId} className="text-sm text-gray-800">
          {label}
          {required && <span className="ml-1 text-xs font-normal text-error">(required)</span>}
        </label>
      </div>
      {helpText && (
        <p id={helpTextId} className="text-sm text-gray-500">
          {helpText}
        </p>
      )}
      <ErrorMessage id={errorId} message={error} />
    </div>
  );
});

export default Checkbox;
