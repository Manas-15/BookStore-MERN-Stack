// import CryptoJS from 'crypto-js';
import { toast } from 'sonner';
import colorCode from './colorCode.json';
// import moment from 'moment';
import React from 'react';
// export const hashProjectId = (projectId) => {
//   // Generate a full SHA-256 hash
//   const fullHash = CryptoJS.SHA256(projectId).toString();

//   // Truncate to the first 10 characters
//   return fullHash.substring(0, 15);
// };

export function generateArray(length) {
  return Array.from({ length }, (_, index) => index + 1);
}

export function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + ' ..';
  }
  return text;
}
export function capitalize(str) {
  return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
}
export function capitalizeWords(str) {
  return str?.toString()?.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function capitalizeBothWords(str) {
  return str
    .replace(/_/g, ' ') // Remove underscores by replacing them with spaces
    .split(' ') // Split the string by spaces to process each word individually
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(' '); // Join the words back into a string
}

export function ellipsis(str, columnSize) {
  const maxLength = columnSize == 350 ? 40 : 250 ? 30 : 15;
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function calculateDynamicWidth(numberOfItems) {
  // Calculate base width as a percentage
  const baseWidth = 100 / numberOfItems;

  // Get current window width
  const windowWidth = window.innerWidth;

  // Determine the adjustment based on window size
  const adjustment = windowWidth >= 1000 ? 1.5 : 1;

  // Calculate adjusted width
  const adjustedWidth = baseWidth - (adjustment * 100) / windowWidth;

  // Return width as a string suitable for inline CSS
  return `${adjustedWidth}%`;
}

export function getProjectInitialName(projectName) {
  const words = projectName?.split(' ');
  const initials = words
    ?.slice(0, 2)
    ?.map((word) => word?.charAt(0))
    ?.join('');
  return initials?.toUpperCase();
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function showToast(message, type) {
  toast(message, {
    hideProgressBar: true,
    autoClose: 3000,
    type: type
  });
}

// Function to generate random color from Tailwind CSS color codes
export function randomTailwindColorGenerator() {
  const tailwindColorCodes = [
    '#a78bfa', // Indigo-500
    '#34d399', // Teal-500
    '#fbbf24' // Orange-500
  ];

  // Select a random color from the Tailwind color codes
  const randomColor =
    tailwindColorCodes[Math.floor(Math.random() * tailwindColorCodes.length)];

  return randomColor;
}

export const getStatusDetails = (statusEnum, statusValue) => {
  const status = statusEnum?.find(
    (status) => status.value?.toLowerCase() == statusValue?.toLowerCase()
  );
  return status || { name: '-', colorCode: '' };
};

export const getColorCode = (statusEnum, statusValue) => {
  const status = statusEnum?.find(
    (item) => item.value?.toLowerCase() == statusValue?.toLowerCase()
  );
  return status ? status.colorCode : '';
};

export const convertCommaSeparator = (value) => {
  // Convert string to a float
  if (typeof value === 'string') {
    value = parseFloat(value);
  }

  // Check if value is still a number
  if (isNaN(value)) {
    return 'Invalid number'; // Handle invalid input
  }

  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// Find the object with matching
export const getColorFromFirstLetter = (title) => {
  const firstLetter = title?.toUpperCase()?.charAt(0);
  const colorObject = colorCode?.find((obj) => obj.hasOwnProperty(firstLetter));
  if (colorObject) {
    return Object.values(colorObject)[0]; // Return the color code if found
  } else {
    return 'orange'; // Default color if no match found
  }
};

export const formatTimeEstimated = (timeInSeconds) => {
  if (timeInSeconds != null) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  } else {
    return '00:00';
  }
};
export const convertToSeconds = (formattedTime) => {
  const [hours, minutes] = formattedTime
    .split(':')
    .map((num) => parseInt(num, 10));
  return hours * 3600 + minutes * 60; // Return time in total seconds
};

export const convertToHHMM = (totalSeconds) => {
  if (!totalSeconds) return '00:00';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};

// export const CustomDateInput = ({ oldValue, onBlur }) => {
//   return (
//     <input
//       type='date'
//       defaultValue={oldValue ? moment(oldValue).format('YYYY-MM-DD') : ''}
//       className='form-control'
//       onBlur={(e) => {
//         onBlur(e);
//         e.target.blur();
//       }}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter') {
//           onBlur(e);
//           e.target.blur();
//         }
//       }}
//     />
//   );
// };

export const getFilterValue = (columnFilters, col_name) => {
  return columnFilters?.find((filter) => filter.id === col_name)?.value;
};

export const projectMemberListEnum = (projectMember) => {
  return projectMember?.items.map((item) => ({
    label: item?.first_name,
    value: item?.resource_id
  }));
};

export const projectListEnum = (projects) => {
  return projects?.items?.map((item) => ({
    label:
      item?.project_name?.length > 25
        ? item?.project_name?.substring(0, 25) + '...'
        : item?.project_name,
    value: item?.id
  }));
};

export function customPagination() {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
  let pageSize = 10;

  if (width <= 768) {
    pageSize = 10;
  } else if (width <= 992) {
    pageSize = 10;
  } else if (width <= 1200) {
    pageSize = 10;
  } else if (width <= 1440) {
    pageSize = 15;
  } else if (width <= 1920) {
    pageSize = 25;
  } else {
    pageSize = 30;
  }

  return {
    pageIndex: 0,
    pageSize
  };
}

export function projectPagination() {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
  let pageSize = 9;

  if (width <= 768) {
    pageSize = 9;
  } else if (width <= 992) {
    pageSize = 9;
  } else if (width <= 1200) {
    pageSize = 9;
  } else if (width <= 1440) {
    pageSize = 12;
  } else if (width <= 1920) {
    pageSize = 12;
  } else {
    pageSize = 15;
  }

  return {
    pageIndex: 0,
    pageSize
  };
}

export function staticPagination() {
  return {
    pageIndex: 0,
    pageSize: 5
  };
}

export function skeletonCount() {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
  let rowsCount = 15;
  let colCount = 5;

  if (width <= 768) {
    rowsCount = 10;
    colCount = 5;
  } else if (width <= 992) {
    rowsCount = 10;
    colCount = 5;
  } else if (width <= 1200) {
    rowsCount = 10;
    colCount = 5;
  } else if (width <= 1440) {
    rowsCount = 15;
    colCount = 5;
  } else if (width <= 1920) {
    rowsCount = 15;
    colCount = 5;
  } else {
    rowsCount = 15;
    colCount = 5;
  }

  return {
    rowsCount,
    colCount
  };
}

export const thousandSeparator = (value) => {
  return Number(value)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const downloadFile = (file) => {
  const link = document.createElement('a');
  link.href = file.url ?? '';
  link.download = file.file_name ?? '';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.click();
};
