import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../ui/form'; // Ensure these imports are correct
import { Input } from '../ui/input'; // Ensure Input is imported correctly

interface EmailInputProps {
  control: any; // React Hook Form control object
  name: string;
  label?: string;
  isRequired?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
  control,
  name,
  label,
  isRequired = false
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {isRequired && <span className='mx-2 text-red-500'>*</span>}
          </FormLabel>
          <FormControl>
            <Input type='email' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailInput;
