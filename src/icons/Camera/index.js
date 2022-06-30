import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 17.35C13.2 17.35 14.2083 16.9417 15.025 16.125C15.8417 15.3083 16.25 14.3 16.25 13.1C16.25 11.8833 15.8417 10.8708 15.025 10.0625C14.2083 9.25417 13.2 8.85 12 8.85C10.7833 8.85 9.77083 9.25417 8.9625 10.0625C8.15417 10.8708 7.75 11.8833 7.75 13.1C7.75 14.3 8.15417 15.3083 8.9625 16.125C9.77083 16.9417 10.7833 17.35 12 17.35ZM3.5 21C3.1 21 2.75 20.85 2.45 20.55C2.15 20.25 2 19.9 2 19.5V6.675C2 6.29167 2.15 5.94583 2.45 5.6375C2.75 5.32917 3.1 5.175 3.5 5.175H7.175L9 3H15L16.825 5.175H20.5C20.8833 5.175 21.2292 5.32917 21.5375 5.6375C21.8458 5.94583 22 6.29167 22 6.675V19.5C22 19.9 21.8458 20.25 21.5375 20.55C21.2292 20.85 20.8833 21 20.5 21H3.5Z"
            fill="#9F9F9F"/>
    </svg>

  );
};
