import React from "react";
import StandardAppContainer from "./Standard/StandardAppContainer";
import AppRouter from "./components/AppRouter";

export const App = () => {
  return (
    <StandardAppContainer forcedLocale={'ru'}>
        <AppRouter />
    </StandardAppContainer>
  );
};
