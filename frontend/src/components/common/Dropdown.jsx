import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Dropdown = ({
  trigger,
  items = [],
  align = 'right',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignStyles = align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${alignStyles} mt-2 w-56 rounded-xl bg-[#18181B] border border-zinc-800 shadow-2xl z-50 py-1.5 backdrop-blur-md bg-opacity-95 overflow-hidden`}
          >
            {items.map((item, index) => {
              if (item.divider) {
                return <div key={index} className="my-1 border-t border-zinc-800" />;
              }
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors ${
                    item.danger
                      ? 'text-red-400 hover:bg-red-500/10'
                      : 'text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
