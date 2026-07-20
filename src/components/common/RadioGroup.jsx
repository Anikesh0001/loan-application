import { forwardRef, useId, useMemo } from 'react';
import ErrorMessage from './ErrorMessage';

const RadioGroup = forwardRef((
  {
    label,
    name,
    options = [],
    error,
    helpText,
    required = false,
    className = '',
    value,
    defaultValue,
    onChange,
    onBlur,
    ...rest
  },
  ref,
) => {
  const generatedId = useId();
  const groupId = name || generatedId;
  const helpTextId = `${groupId}-help`;
  const errorId = `${groupId}-error`;

  const describedBy = useMemo(() => {
    const ids = [];
    if (helpText) ids.push(helpTextId);
    if (error) ids.push(errorId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  }, [helpText, error, helpTextId, errorId]);

  return (
    <fieldset
      className={`flex flex-col gap-2 ${className}`}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy}
      aria-required={required || undefined}
    >
      <legend className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-xs font-normal text-error">(required)</span>}
      </legend>
      <div className="flex flex-col gap-2">
        {options.map((option, index) => {
          const optionId = `${groupId}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className="flex min-h-[44px] items-center gap-2 text-sm text-gray-800"
            >
              <input
                ref={index === 0 ? ref : undefined}
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={value !== undefined ? value === option.value : undefined}
                defaultChecked={value === undefined ? defaultValue === option.value : undefined}
                onChange={onChange}
                onBlur={onBlur}
                className="h-5 w-5 border-gray-300 text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                {...rest}
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {helpText && (
        <p id={helpTextId} className="text-sm text-gray-500">
          {helpText}
        </p>
      )}
      <ErrorMessage id={errorId} message={error} />
    </fieldset>
  );
});

export default RadioGroup;
