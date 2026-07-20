import { forwardRef } from 'react';

const ErrorMessage = forwardRef(({ message, id, className = '' }, ref) => {
  if (!message) return null;

  return (
    <p
      ref={ref}
      id={id}
      role="alert"
      aria-live="polite"
      className={`text-sm text-error ${className}`}
    >
      {message}
    </p>
  );
});

export default ErrorMessage;
