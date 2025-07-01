import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useController, Control } from 'react-hook-form'; // Import Control type
import { classNames } from '@/common/utills/utilities';
import { cn } from '@/libs/utils';

interface Option {
  label: string;
  value: string | number;
}

interface MultiSelectSearchDropdownProps {
  options: Option[];
  value?: string | string[] | number; // Added number type
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiSelect?: boolean;
  width?: string;
  title?: string;
  isMandatory?: boolean;
  keyName: string;
  control: Control<any>; // Use Control type
  isSearchable?: boolean;
  searchQuery?: (query: string) => void;
}

interface SelectedItem {
  label: string;
  value: string | number;
}

export function MultiSelectSearchDropdown({
  options: rawOptions = [],
  value = '',
  placeholder = 'Select ...',
  disabled = false,
  className = '',
  multiSelect = false,
  width = 'w-full',
  title,
  isMandatory = false,
  keyName,
  control,
  isSearchable = false,
  searchQuery = (query: string) => {}
}: MultiSelectSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Fetch field value and methods using useController
  const {
    field,
    fieldState: { error }
  } = useController({
    name: keyName,
    control,
    defaultValue: multiSelect ? [] : ''
  });

  const index = keyName?.match(/\[(\d+)\]/)?.[1];
  const mainKeyName = keyName?.match(/([^[]+)/)?.[1] || '';
  const childKeyName = keyName?.match(/\.([^.]+)$/)?.[1] || '';

  // Filter out duplicate options based on value
  const options = useMemo(
    () =>
      Array.from(new Map(rawOptions.map((opt) => [opt.value, opt])).values()),
    [rawOptions]
  );

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (
    optionValue: string | number,
    optionLabel: string
  ) => {
    if (optionValue === '' && optionLabel === 'none') {
      setSelectedItems([]);
      field.onChange(multiSelect ? [] : ''); // Update react-hook-form value
      return;
    }

    if (multiSelect) {
      const newValues = field.value ? [...field.value] : [];
      const newItems = [...selectedItems];

      const valueIndex = newValues.indexOf(optionValue.toString());
      const itemIndex = newItems.findIndex((item) => item.value == optionValue);

      if (valueIndex === -1) {
        newValues.push(optionValue.toString());
        newItems.push({ label: optionLabel, value: optionValue });
      } else {
        newValues.splice(valueIndex, 1);
        newItems.splice(itemIndex, 1);
      }

      const uniqueItems = Array.from(
        new Map(newItems.map((item) => [item.value, item])).values()
      );

      setSelectedItems(uniqueItems);
      field.onChange(newValues); // Update react-hook-form value
    } else {
      setSelectedItems([{ label: optionLabel, value: optionValue }]);
      field.onChange(optionValue.toString()); // Update react-hook-form value
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!options || !options?.length || !value) {
      setSelectedItems([]);
      return;
    }

    if (multiSelect && Array.isArray(value)) {
      const selectedOptions = options.filter((option) =>
        value.map((elm) => elm.toString()).includes(option.value.toString())
      );

      const newItems = selectedOptions.map((option) => ({
        label: option.label,
        value: option.value
      }));

      setSelectedItems(newItems);
    } else {
      const selectedOption = options?.find(
        (option) => option.value.toString() == value.toString()
      );

      setSelectedItems(
        selectedOption
          ? [{ label: selectedOption.label, value: selectedOption.value }]
          : []
      );
    }
  }, [value, options, multiSelect]);

  return (
    <div>
      {title && (
        <label className='mb-2 block font-medium text-black dark:text-white'>
          {title} {isMandatory && <span className='text-red-500'>*</span>}
        </label>
      )}
      <div ref={dropdownRef} className={`relative w-full bg-white`}>
        <button
          type='button'
          name={keyName}
          id={keyName}
          className={classNames(
            `${width} flex h-[40px] w-full min-w-[100px] appearance-none items-center justify-between rounded px-3 py-2 text-gray-500 placeholder:text-gray-400 sm:leading-6 ${disabled ? 'cursor-not-allowed bg-[#eff2f7]' : 'bg-transparent'} border-stroke dark:border-strokedark dark:bg-form-input border transition focus:border-primary active:border-primary`,
            className
          )}
          onClick={toggleDropdown}
          disabled={disabled}
        >
          <span className='flex flex-1 flex-wrap truncate'>
            {selectedItems.length > 0 ? (
              <span className='w-[95%] truncate text-left text-sm text-black dark:text-white'>
                {multiSelect
                  ? selectedItems.map((item) => item.label).join(', ')
                  : selectedItems[0].label}
              </span>
            ) : (
              <span className='truncate text-gray-400'>{placeholder}</span>
            )}
          </span>
          <svg
            className={`transition-transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            fill='none'
            style={{ width: '24px', height: '16px' }}
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            ></path>
          </svg>
        </button>

        {isOpen && (
          <div
            className='border-stroke scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 absolute left-1/2 mt-1 max-h-[300px] w-full min-w-[125px] -translate-x-1/2 overflow-y-auto overflow-x-hidden rounded border bg-white shadow-md'
            style={{ zIndex: 99999 }}
          >
            {isSearchable && (
              <div className='sticky top-0 bg-white p-2'>
                <input
                  type='text'
                  className='border-stroke w-full rounded border px-3 py-2 focus:border-primary focus:outline-none'
                  placeholder='Search...'
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    searchQuery(e.target.value);
                  }}
                />
              </div>
            )}
            {filteredOptions.length === 0 ? (
              <div className='block w-full px-3 py-2 text-left text-gray-500'>
                No option available
              </div>
            ) : (
              <>
                <div className='flex items-center'>
                  <button
                    type='button'
                    className={`hover:bg-disabled flex-grow px-3 py-2 text-left text-sm hover:bg-accent hover:text-black focus:outline-none`}
                    onClick={() => handleOptionSelect('', 'none')}
                  >
                    None
                  </button>
                </div>
                {filteredOptions.map((option, index) => {
                  const isSelected = multiSelect
                    ? selectedItems.some((item) => item.label == option.label)
                    : selectedItems[0]?.label === option.label;
                  return (
                    <div key={index} className='flex items-center'>
                      <button
                        type='button'
                        className={`flex-grow px-3 py-2 text-left text-sm hover:bg-accent hover:text-black focus:outline-none ${isSelected ? 'bg-gray-100' : ''}`}
                        onClick={() =>
                          handleOptionSelect(option.value, option.label)
                        }
                      >
                        {multiSelect && (
                          <input
                            type='checkbox'
                            checked={isSelected}
                            onChange={() => {}}
                            className='mr-2'
                          />
                        )}
                        {option.label?.length > 60
                          ? `${option.label.slice(0, 60)}...`
                          : option.label}
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p
          className={cn(
            'text-[0.8rem] font-medium text-destructive',
            className
          )}
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
