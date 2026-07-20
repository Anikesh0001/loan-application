import {
  createContext, forwardRef, useContext, useId, useMemo,
} from 'react';
import ErrorMessage from './ErrorMessage';

const InputContext = createContext(null);

function useInputContext(componentName) {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error(`${componentName} must be rendered within <Input>`);
  }
  return context;
}

export const InputLabel = forwardRef(({ children, className = '' }, ref) => {
  const { id, label, required } = useInputContext('Input.Label');
  const content = children ?? label;
  if (!content) return null;

  return (
    <label ref={ref} htmlFor={id} className={`text-sm font-medium text-gray-700 ${className}`}>
      {content}
      {required && <span className="ml-1 text-xs font-normal text-error">(required)</span>}
    </label>
  );
});

export const InputField = forwardRef(({ className = '', ...rest }, ref) => {
  const {
    id, error, describedBy, required,
  } = useInputContext('Input.Field');

  return (
    <input
      ref={ref}
      id={id}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy}
      aria-required={required || undefined}
      className={`min-h-[44px] rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
        error ? 'border-error' : 'border-gray-300'
      } ${className}`}
      {...rest}
    />
  );
});

export const InputHelpText = forwardRef(({ children, className = '' }, ref) => {
  const { helpText, helpTextId } = useInputContext('Input.HelpText');
  const content = children ?? helpText;
  if (!content) return null;

  return (
    <p ref={ref} id={helpTextId} className={`text-sm text-gray-500 ${className}`}>
      {content}
    </p>
  );
});

export const InputError = forwardRef(({ className = '' }, ref) => {
  const { error, errorId } = useInputContext('Input.Error');
  return <ErrorMessage ref={ref} id={errorId} message={error} className={className} />;
});

const Input = forwardRef((
  {
    label, error, helpText, required = false, id, name, className = '', children, ...rest
  },
  ref,
) => {
  const generatedId = useId();
  const inputId = id || name || generatedId;
  const helpTextId = `${inputId}-help`;
  const errorId = `${inputId}-error`;

  const describedBy = useMemo(() => {
    const ids = [];
    if (helpText) ids.push(helpTextId);
    if (error) ids.push(errorId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  }, [helpText, error, helpTextId, errorId]);

  const contextValue = useMemo(
    () => ({
      id: inputId, label, error, helpText, helpTextId, errorId, describedBy, required,
    }),
    [inputId, label, error, helpText, helpTextId, errorId, describedBy, required],
  );

  return (
    <InputContext.Provider value={contextValue}>
      {children ?? (
        <div className={`flex flex-col gap-1 ${className}`}>
          <InputLabel />
          <InputField ref={ref} name={name} {...rest} />
          <InputHelpText />
          <InputError />
        </div>
      )}
    </InputContext.Provider>
  );
});

Input.Label = InputLabel;
Input.Field = InputField;
Input.HelpText = InputHelpText;
Input.Error = InputError;

export default Input;
