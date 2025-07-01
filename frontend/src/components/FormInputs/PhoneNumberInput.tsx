import React from 'react';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../ui/form'; // Adjust imports based on your project structure
import { Input } from '../ui/input';

interface PhoneNumberInputProps {
  control: any; // React Hook Form control object
  name: string;
  label?: string;
  isRequired?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  control,
  name,
  label = '',
  isRequired = false
}) => {
  const { t } = useTranslation();

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
            <div className='border-stroke flex w-full items-center rounded border bg-white px-1 py-[1px] focus-within:border-primary active:border-primary'>
              <PhoneInput
                defaultCountry='in'
                value={field.value.country_code || ''}
                onChange={(value) => {
                  const countryCode = value.split(' ')[0];
                  field.onChange(countryCode);
                }}
                onBlur={field.onBlur}
                className='relative z-[9999] h-[40px] max-w-full appearance-none border border-none bg-white p-0 text-black outline-none transition dark:text-white'
                inputProps={{
                  disabled: false
                }}
              />
              <input
                {...field}
                type='text'
                placeholder={t('vendor.Enter Phone Number')}
                maxLength={10}
                className='relative z-20 h-[40px] w-full appearance-none border border-none bg-transparent bg-white p-2 text-black outline-none transition dark:text-white'
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  field.onChange(value);
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneNumberInput;
