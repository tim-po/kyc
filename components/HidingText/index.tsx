import React from "react";
import './index.css'

type hidingTextProps = {
  defaultText: string,
  hidingText: string,
  peekOut: boolean,
  className?: string
}

export const HidingText = ({defaultText, hidingText, peekOut, className}: hidingTextProps) => {

  return (
    <div className={'hiding-text-container'}>
      <div className={`hiding-text ${peekOut && 'custom-hidden'} ${className}`}>
        {defaultText}
      </div>
      <div className={`hiding-text ${!peekOut && 'custom-hidden'} ${className}`}>
        {hidingText}
      </div>
    </div>
  );
};