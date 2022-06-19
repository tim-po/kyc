import React, {useContext, useState} from "react";
import './index.css'
import {useLocale} from "../../hooks/useLocale";
import LocaleContext from "../../LocaleContext";

export const LocaleSelector = (props: {locales: string[]}) => {
  const {locales} = props
  const [isOpened, setIsOpened] = useState(false)
  const {setLocale, locale} = useContext(LocaleContext)
  const [selected, setSelected] = useState(locale)

  console.log(locales)

  return (
    <div className={`locale-selector`}>
      {locales.map((loc, index) => (
        <button
          className={`
          locale-button selector
           ${isOpened ? 'opened': ''}
            ${locale === loc ? 'selected': ''}
          `}
          style={(locale !== loc && isOpened) ? {top: (index + 1) * 50 - (locales.indexOf(locale) > index ? 0: 50)}: {}}
          onClick={()=>{
            setLocale(loc)
            setSelected(loc)
            setIsOpened(!isOpened)
          }}
        >
          <span className={'inner-text'}>{loc.toUpperCase()}</span>
        </button>
      ))}

      {/*<button*/}
      {/*  className={`locale-button`}*/}
      {/*  style={{background: "none", zIndex: 4}}*/}
      {/*  onClick={() => {*/}
      {/*    setIsOpened(!isOpened)*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
};