import React, { forwardRef } from 'react';

export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon: Icon,
      endIcon: EndIcon,
      onEndIconClick,
      type = 'text',
      className = '',
      id,
      placeholder,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-zinc-300 tracking-wide">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-3.5 pointer-events-none text-zinc-400">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`w-full rounded-xl bg-[#18181B] border text-zinc-100 placeholder-zinc-500 text-sm py-2.5 px-3.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
              Icon ? 'pl-10' : ''
            } ${EndIcon ? 'pr-10' : ''} ${
              error
                ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                : 'border-zinc-800 hover:border-zinc-700 focus:border-indigo-500'
            } ${className}`}
            {...props}
          />
          {EndIcon && (
            <button
              type="button"
              onClick={onEndIconClick}
              className="absolute right-3.5 text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none"
            >
              <EndIcon className="w-4 h-4" />
            </button>
          )}
        </div>
        {error && <span className="text-xs font-medium text-red-400 mt-0.5">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-zinc-500 mt-0.5">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
