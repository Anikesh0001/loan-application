import { forwardRef, useId, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { maskValue } from '../../utils/formatters';

/**
 * Shows only the last `visibleChars` characters (e.g. "XXXXXX1234") until the
 * field is focused, at which point the full raw value is revealed for
 * editing. The raw (unmasked) value is always what's reported via onChange.
 */
const MaskedInput = forwardRef((
  {
    label,
    error,
    helpText,
    required = false,
    id,
    name,
    className = '',
    value,
    defaultValue = '',
    visibleChars = 4,
    onChange,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) => {
  const generatedId = useId();
  const inputId = id || name || generatedId;
  const helpTextId = `${inputId}-help`;
  const errorId = `${inputId}-error`;
  const describedBy = [helpText && helpTextId, error && errorId].filter(Boolean).join(' ') || undefined;

  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value ?? defaultValue);

  const currentValue = value !== undefined ? value : internalValue;
  const displayValue = isFocused ? currentValue : maskValue(String(currentValue ?? ''), visibleChars);

  const handleChange = (event) => {
    if (value === undefined) {
      setInternalValue(event.target.value);
    }
    if (onChange) onChange(event);
  };

  const handleFocus = (event) => {
    setIsFocused(true);
    if (onFocus) onFocus(event);
  };

  const handleBlur = (event) => {
    setIsFocused(false);
    if (onBlur) onBlur(event);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-xs font-normal text-error">(required)</span>}
      </label>
      <input
        ref={ref}
        id={inputId}
        name={name}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        className={`min-h-[44px] rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
          error ? 'border-error' : 'border-gray-300'
        }`}
        {...rest}
      />
      {helpText && (
        <p id={helpTextId} className="text-sm text-gray-500">
          {helpText}
        </p>
      )}
      <ErrorMessage id={errorId} message={error} />
    </div>
  );
});

export default MaskedInput;
