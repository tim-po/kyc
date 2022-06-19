/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, {useEffect} from "react";
import Footer from "../components/Footer";
import {Header} from "../components/Header";
import {useConnectionCheck} from "../hooks/useConnectionCheck";
import {injected} from "../wallet";
import {useWeb3React} from "@web3-react/core";
import {useLocale} from "../hooks/useLocale";
import LocaleContext from "../LocaleContext";
import './index.css'

const Index = (props: {children: any, forcedLocale?: string, showLocalisationControl?: boolean, isDarkBG?: boolean, version: string, pages?: {title: string, url: string}[] }) => {
  const {forcedLocale, showLocalisationControl, isDarkBG, version, pages} = props
  // @ts-ignore
  const {active, activate, networkError} = useWeb3React();
  const {setLocale, locale} = useLocale(forcedLocale)
  useConnectionCheck()

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized && !active && !networkError) {
        activate(injected);
      }
    });
  }, [activate, networkError]);

  return (
      <LocaleContext.Provider value={{setLocale, locale}}>
        <div className={`main-content-container ${isDarkBG ? 'main-gradient': 'main-gradient-light'}`}>
          <Header pages={pages} showLocalisationControl={showLocalisationControl} isDark={isDarkBG}/>
          <div className={'children-container'}>
            {props.children}
          </div>
          <Footer version={version}/>
        </div>
      </LocaleContext.Provider>
  );
};

export default Index;
