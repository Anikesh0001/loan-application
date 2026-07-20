import { forwardRef, useEffect } from 'react';

const Toast = forwardRef(({ message, onDismiss, duration = 2000 }, ref) => {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => {
      if (onDismiss) onDismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md bg-primary px-4 py-3 text-sm text-white shadow-lg"
    >
      {message}
    </div>
  );
});

export default Toast;
