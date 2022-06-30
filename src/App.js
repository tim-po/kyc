import React from "react";
import StandardAppContainer from "./Standard/StandardAppContainer";
import AppRouter from "./router/AppRouter";

export const App = () => {
  return (
    <StandardAppContainer hideWalletConnector forcedLocale={'ru'}>
      <AppRouter />
    </StandardAppContainer>
  );
};

