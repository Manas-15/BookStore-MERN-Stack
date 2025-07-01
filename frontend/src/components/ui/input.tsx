import * as React from 'react';
import { cn } from '@/libs/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue: any = e.target.value;
      // Check if the input type is 'number' and convert the value to a number
      if (type === 'number') {
        inputValue = inputValue ? Number(inputValue) : ''; // Convert to number (or empty string)
      }

      // Pass the updated value to onChange handler with the correct value
      onChange?.({
        ...e,
        target: {
          ...e.target,
          value: inputValue // Ensure the updated value is passed
        }
      });
    };

    return (
      <div className='flex flex-row items-center'>
        <input
          type={type}
          className={cn(
            'mr-2 flex h-9 rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            type === 'checkbox' ? '' : 'w-full',
            className
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          {...props}
        />
        <span className='text-sm'>{props?.title}</span>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
