import React, { useEffect } from 'react';
import { useToast, ToastType } from '../context/ToastContext';

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && toasts.length > 0) {
        removeToast(toasts[0].id);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [toasts, removeToast]);

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2" role="region" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastStyles(toast.type)} px-4 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-[300px] max-w-md transition-all duration-200`}
          role="alert"
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
