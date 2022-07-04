/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useConnectionCheck } from "../hooks/useConnectionCheck";
import { injected } from "../wallet";
import { useWeb3React } from "@web3-react/core";
import { useLocale } from "../hooks/useLocale";
import LocaleContext from "../LocaleContext";
import "./index.css";
import "../styles.scss";
import { ConfigProvider } from "antd";

const defaultProps = {
    locales: ["en"]
};

const StandardAppContainer = (props: { logoHref?: string, hideWalletConnector?: boolean, children: any, locales: string[], isDarkBG?: boolean, version: string, pages?: { title: string, url: string }[] }) => {
    const { locales, isDarkBG, version, pages, logoHref, hideWalletConnector } = props;

    let forcedLocale;
    if (locales.length === 1) {
        forcedLocale = locales[0];
    }
    // @ts-ignore
    const { active, activate, networkError } = useWeb3React();
    const { setLocale, locale } = useLocale(forcedLocale);
    const [shouldDysplayNotification, setShouldDysplayNotification] = useState(false);
    useConnectionCheck();

    useEffect(() => {
        injected.isAuthorized().then((isAuthorized) => {
            if (isAuthorized && !active && !networkError) {
                activate(injected);
            }
        });
    }, [activate, networkError]);

    const displayNotification = () => {
        setShouldDysplayNotification(true);
        setTimeout(() => {
            setShouldDysplayNotification(false);
        }, 2000);
    };

    // @ts-ignore
    return (<ConfigProvider getPopupContainer={trigger => trigger.parentElement}>
            <LocaleContext.Provider value={{ setLocale, locale }}>
                <div className={`main-content-container ${isDarkBG ? "main-gradient" : "main-gradient-light"}`}>
                    <div className={`notification ${shouldDysplayNotification ? "shown" : ""}`}>
                        <div className={"flex flex-row"}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.40095 35C2.63062 35 2.14956 34.1656 2.53552 33.499L19.1344 4.82817C19.5196 4.16289 20.4801 4.16289 20.8653 4.82817L37.4642 33.499C37.8501 34.1656 37.3691 35 36.5987 35H3.40095ZM18.9165 24.5C18.9165 25.0523 19.3642 25.5 19.9165 25.5H20.4165C20.9688 25.5 21.4165 25.0523 21.4165 24.5V17.1667C21.4165 16.6144 20.9688 16.1667 20.4165 16.1667H19.9165C19.3642 16.1667 18.9165 16.6144 18.9165 17.1667V24.5ZM20.1665 30.125C20.5276 30.125 20.8262 30.007 21.0623 29.7708C21.2984 29.5347 21.4165 29.2361 21.4165 28.875C21.4165 28.5139 21.2984 28.2153 21.0623 27.9792C20.8262 27.7431 20.5276 27.625 20.1665 27.625C19.8054 27.625 19.5068 27.7431 19.2707 27.9792C19.0346 28.2153 18.9165 28.5139 18.9165 28.875C18.9165 29.2361 19.0346 29.5347 19.2707 29.7708C19.5068 30.007 19.8054 30.125 20.1665 30.125ZM5.99984 32.5H33.9998L19.9998 8.33334L5.99984 32.5Z"
                                    fill="white" />
                            </svg>
                            <div className={"notification-title"}>
                                Wallet not disconnected
                            </div>
                        </div>
                        <div className={"notification-body"}>
                            Please use Metamask to disconnect
                        </div>
                    </div>
                    <Header logoHref={logoHref} hideWalletConnector={hideWalletConnector}
                            displayNotification={displayNotification} pages={pages} locales={locales} />
                    <div className={"children-container"}>
                        {props.children}
                        <Footer version={version} />
                    </div>
                </div>
            </LocaleContext.Provider>
        </ConfigProvider>
    );
};

StandardAppContainer.defaultProps = defaultProps;

export default StandardAppContainer;
