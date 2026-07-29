import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Failed to load requested data. Please check your network connection and try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 bg-red-500/5 border border-red-500/20 rounded-2xl my-6">
      <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-zinc-100 mb-1">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-md mb-5">{message}</p>
      {onRetry && (
        <Button variant="secondary" icon={RefreshCw} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
