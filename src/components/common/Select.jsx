import { forwardRef, useId, useMemo } from 'react';
import ErrorMessage from './ErrorMessage';

const Select = forwardRef((
  {
    label, error, helpText, required = false, options = [], placeholder, id, className = '', ...rest
  },
  ref,
) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const helpTextId = `${selectId}-help`;
  const errorId = `${selectId}-error`;

  const describedBy = useMemo(() => {
    const ids = [];
    if (helpText) ids.push(helpTextId);
    if (error) ids.push(errorId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  }, [helpText, error, helpTextId, errorId]);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-xs font-normal text-error">(required)</span>}
      </label>
      <select
        ref={ref}
        id={selectId}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        className={`min-h-[44px] rounded-md border bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
          error ? 'border-error' : 'border-gray-300'
        }`}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && (
        <p id={helpTextId} className="text-sm text-gray-500">
          {helpText}
        </p>
      )}
      <ErrorMessage id={errorId} message={error} />
    </div>
  );
});

export default Select;
