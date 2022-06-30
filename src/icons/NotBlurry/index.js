import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
  return (
    <svg width="65" height="45" viewBox="0 0 65 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_263_186)">
        <rect width="65" height="40" rx="3" fill="#F3F5F8"/>
        <g filter="url(#filter0_f_263_186)">
          <rect x="25" y="4" width="50" height="30" rx="2" fill="url(#paint0_linear_263_186)"/>
          <rect x="28" y="13" width="4" height="2" fill="#5081BC"/>
          <rect x="34" y="13" width="8" height="2" fill="#6C6C6C"/>
          <rect x="28" y="17" width="4" height="2" fill="#5081BC"/>
          <rect x="34" y="17" width="14" height="2" fill="#6C6C6C"/>
          <rect x="28" y="21" width="4" height="2" fill="#5081BC"/>
          <rect x="34" y="21" width="14" height="2" fill="#6C6C6C"/>
          <rect x="28" y="27" width="10" height="2" fill="#5081BC"/>
          <rect x="40" y="27" width="16" height="2" fill="#6C6C6C"/>
          <path d="M64.0002 16.25C63.0835 16.25 62.3335 15.9583 61.7502 15.375C61.1668 14.7917 60.8752 14.0417 60.8752 13.125C60.8752 12.2083 61.1668 11.4583 61.7502 10.875C62.3335 10.2917 63.0835 10 64.0002 10C64.9168 10 65.6668 10.2917 66.2502 10.875C66.8335 11.4583 67.1252 12.2083 67.1252 13.125C67.1252 14.0417 66.8335 14.7917 66.2502 15.375C65.6668 15.9583 64.9168 16.25 64.0002 16.25ZM57.3335 22.9375V20.9792C57.3335 20.4514 57.4654 20 57.7293 19.625C57.9932 19.25 58.3335 18.9653 58.7502 18.7708C59.6807 18.3542 60.5731 18.0417 61.4272 17.8333C62.2814 17.625 63.1391 17.5208 64.0002 17.5208C64.8613 17.5208 65.7154 17.6285 66.5627 17.8438C67.4099 18.059 68.2988 18.3681 69.2293 18.7708C69.6599 18.9653 70.0071 19.25 70.271 19.625C70.5349 20 70.6668 20.4514 70.6668 20.9792V22.9375H57.3335Z"
                fill="#4B4B4B"/>
        </g>
        <path d="M29.4999 41.1999L31.9999 38.6999L34.4999 41.1999L35.1999 40.4999L32.6999 37.9999L35.1999 35.4999L34.4999 34.7999L31.9999 37.2999L29.4999 34.7999L28.7999 35.4999L31.2999 37.9999L28.7999 40.4999L29.4999 41.1999ZM31.9999 44.6666C31.0888 44.6666 30.2277 44.4916 29.4166 44.1416C28.6055 43.7916 27.8971 43.3138 27.2916 42.7083C26.686 42.1027 26.2083 41.3944 25.8583 40.5833C25.5083 39.7721 25.3333 38.911 25.3333 37.9999C25.3333 37.0777 25.5083 36.211 25.8583 35.3999C26.2083 34.5888 26.686 33.8833 27.2916 33.2833C27.8971 32.6833 28.6055 32.2083 29.4166 31.8583C30.2277 31.5083 31.0888 31.3333 31.9999 31.3333C32.9221 31.3333 33.7888 31.5083 34.5999 31.8583C35.411 32.2083 36.1166 32.6833 36.7166 33.2833C37.3166 33.8833 37.7916 34.5888 38.1416 35.3999C38.4916 36.211 38.6666 37.0777 38.6666 37.9999C38.6666 38.911 38.4916 39.7721 38.1416 40.5833C37.7916 41.3944 37.3166 42.1027 36.7166 42.7083C36.1166 43.3138 35.411 43.7916 34.5999 44.1416C33.7888 44.4916 32.9221 44.6666 31.9999 44.6666Z"
              fill="#C85348"/>
      </g>
      <defs>
        <filter id="filter0_f_263_186" x="22" y="1" width="56" height="36" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_263_186"/>
        </filter>
        <linearGradient id="paint0_linear_263_186" x1="25" y1="5" x2="75" y2="34" gradientUnits="userSpaceOnUse">
          <stop stop-color="#B4DDE7"/>
          <stop offset="0.489583" stop-color="#F3E0F4"/>
          <stop offset="1" stop-color="#B4DDE7"/>
        </linearGradient>
        <clipPath id="clip0_263_186">
          <rect width="65" height="45" fill="white"/>
        </clipPath>
      </defs>
    </svg>

  );
};
