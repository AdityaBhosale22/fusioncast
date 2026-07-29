import React from 'react';
import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: '#18181B',
          color: '#FAFAFA',
          border: '1px solid #27272A',
          borderRadius: '0.75rem',
          fontSize: '0.875rem',
          padding: '0.75rem 1rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
        },
        success: {
          iconTheme: {
            primary: '#22C55E',
            secondary: '#18181B',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#18181B',
          },
        },
      }}
    />
  );
};

export default ToastProvider;
