import React, { forwardRef } from 'react';
import { classNames } from 'utils/className';

const variants = {
  default: 'bg-black text-white',
  outline: 'border border-black'
};

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-md',
  lg: 'py-4 px-8 text-lg'
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          'flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
