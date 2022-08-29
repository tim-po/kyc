import React from "react";
import StandardAppContainer from "./Standard/StandardAppContainer";
import AppRouter from "./router/AppRouter";
import LogoutButton from "./components/LogoutButton";
import {useCookies} from "react-cookie";

export const App = () => {

    const [cookies] = useCookies(["auth"])

    return (
        <StandardAppContainer
            hideWalletConnector
            locales={['en', 'ja']}
            headerButtons={[
               cookies.auth ? <LogoutButton/> : <></>
            ]}
        >
            <AppRouter/>
        </StandardAppContainer>
    );
};

