import { forwardRef, useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const Modal = forwardRef((
  {
    isOpen, onClose, title, children, className = '',
  },
  ref,
) => {
  const dialogRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    previousActiveElementRef.current = document.activeElement;
    const dialogNode = dialogRef.current;
    const focusableElements = dialogNode
      ? Array.from(dialogNode.querySelectorAll(FOCUSABLE_SELECTOR))
      : [];

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else if (dialogNode) {
      dialogNode.focus();
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || focusableElements.length === 0) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElementRef.current instanceof HTMLElement) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={(node) => {
          dialogRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            // eslint-disable-next-line no-param-reassign
            ref.current = node;
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`w-full max-w-md rounded-lg bg-white p-6 shadow-lg focus:outline-none ${className}`}
      >
        {title && <h2 className="mb-4 text-lg font-semibold text-primary">{title}</h2>}
        {children}
      </div>
    </div>
  );
});

export default Modal;
