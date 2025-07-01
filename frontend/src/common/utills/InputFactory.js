// Inputfactory.js
import React, { useState } from 'react';
import { getValidationMessage } from './translationHelpers';

export const TextField = ({ name, handleChange, value, placeholder }) => {
  const handleInput = (e) => {
    const newValue = e.target.value.replace(/[0-9]/g, '');
    handleChange(newValue, name);
  };
  return (
    <input
      type='text'
      name={name}
      onChange={(e) => handleInput(e)}
      value={value || ''}
      placeholder={placeholder}
      className='border-stroke px-4.5 dark:border-strokedark dark:bg-boxdark w-full rounded-sm border bg-white py-3 font-normal text-black focus:border-primary focus-visible:outline-none dark:text-white dark:focus:border-primary'
      maxLength={55}
    />
  );
};
export const NumberField = ({ name, handleChange, value, placeholder }) => {
  const handleInput = (e) => {
    const newValue = e.target.value;
    if (/^[0-9]*$/.test(newValue)) {
      handleChange(newValue, name);
    }
  };

  return (
    <input
      type='text'
      name={name}
      onChange={handleInput}
      value={value || ''}
      placeholder={placeholder}
      className='border-stroke px-4.5 dark:border-strokedark dark:bg-boxdark w-full rounded-sm border bg-white py-3 font-normal text-black focus:border-primary focus-visible:outline-none dark:text-white dark:focus:border-primary'
      maxLength={12}
    />
  );
};

export const EmailField = ({
  name,
  handleChange,
  value,
  placeholder,
  isRequired,
  originalName
}) => {
  return (
    <div>
      <input
        type='email'
        name={name}
        onChange={(e) => handleChange(e.target.value, name)}
        value={value || ''}
        placeholder={placeholder}
        className='border-stroke px-4.5 dark:border-strokedark dark:bg-boxdark w-full rounded-sm border bg-white py-3 font-normal text-black focus:border-primary focus-visible:outline-none dark:text-white dark:focus:border-primary'
      />
    </div>
  );
};

export const URLField = ({ name, handleChange, value, placeholder }) => {
  return (
    <div>
      <input
        type='text'
        name={name}
        onChange={(e) => handleChange(e.target.value, name)}
        value={value || ''}
        placeholder={placeholder}
        className='border-stroke px-4.5 dark:border-strokedark dark:bg-boxdark w-full rounded-sm border bg-white py-3 font-normal text-black focus:border-primary focus-visible:outline-none dark:text-white dark:focus:border-primary'
      />
    </div>
  );
};
export const SelectField = ({
  name,
  handleChange,
  value,
  selectType,
  options,
  handleRotateArrow,
  className
}) => {
  return (
    <select
      name={name}
      value={value || ''}
      onClick={() => handleRotateArrow(1)}
      onChange={(e) => handleChange(e.target.value, name)}
      className={className}
    >
      <option value='' disabled className='text-body dark:text-bodydark'>
        {selectType}
      </option>
      {options?.map((item, index) => (
        <option
          key={index}
          value={item?.type_name}
          className='text-body dark:text-bodydark'
        >
          {item?.type_name}
        </option>
      ))}
    </select>
  );
};

export const ToggleButtonField = ({ name, checked, handleChange }) => {
  return (
    <>
      <input
        name=''
        type='checkbox'
        className='peer sr-only'
        checked={checked}
        onChange={handleChange}
      />
      <div
        className="bg-stroke peer relative h-6 w-11 rounded-full after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"
        title={
          checked
            ? getValidationMessage('Disable Custom Field')
            : getValidationMessage('Enable Custom Field')
        }
      ></div>
    </>
  );
};
