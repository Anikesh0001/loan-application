import {
  forwardRef, useEffect, useId, useState,
} from 'react';
import ErrorMessage from './ErrorMessage';
import { formatINR, parseINR } from '../../utils/formatters';

/**
 * Displays a live en-IN grouped value (e.g. "10,50,000") while storing a raw
 * number in form state. Because the displayed text and the stored value
 * differ, this must be used as a controlled input — pair it with RHF's
 * <Controller> rather than a plain register() spread.
 */
const CurrencyInput = forwardRef((
  {
    label, error, helpText, required = false, id, name, className = '', value, onChange, onBlur, ...rest
  },
  ref,
) => {
  const generatedId = useId();
  const inputId = id || name || generatedId;
  const helpTextId = `${inputId}-help`;
  const errorId = `${inputId}-error`;
  const describedBy = [helpText && helpTextId, error && errorId].filter(Boolean).join(' ') || undefined;

  const [displayValue, setDisplayValue] = useState(
    () => (value === null || value === undefined ? '' : formatINR(value)),
  );

  useEffect(() => {
    setDisplayValue(value === null || value === undefined ? '' : formatINR(value));
  }, [value]);

  const handleChange = (event) => {
    const { value: rawText } = event.target;
    const parsed = parseINR(rawText);
    setDisplayValue(rawText === '' ? '' : formatINR(parsed ?? 0));
    if (onChange) onChange(parsed);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-xs font-normal text-error">(required)</span>}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
          ₹
        </span>
        <input
          ref={ref}
          id={inputId}
          name={name}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onBlur={onBlur}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          aria-required={required || undefined}
          className={`min-h-[44px] w-full rounded-md border py-2 pl-7 pr-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
            error ? 'border-error' : 'border-gray-300'
          }`}
          {...rest}
        />
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

export default CurrencyInput;
