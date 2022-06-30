import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.08325 12.5833L13.8333 7.83325L12.9583 6.97909L9.14575 10.7916L7.04158 8.68742L6.12492 9.60408L9.08325 12.5833ZM9.99992 18.3124C8.05547 17.8263 6.45825 16.6978 5.20825 14.927C3.95825 13.1562 3.33325 11.2152 3.33325 9.10408V4.14575L9.99992 1.64575L16.6666 4.14575V9.10408C16.6666 11.2152 16.0416 13.1562 14.7916 14.927C13.5416 16.6978 11.9444 17.8263 9.99992 18.3124Z"
        fill="#33CC66"/>
    </svg>

  );
};
