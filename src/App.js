import React from "react";
import StandardAppContainer from "./Standard/StandardAppContainer";
import AppRouter from "./router/AppRouter";

export const App = () => {
  return (
    <StandardAppContainer forcedLocale={'ru'}>
      <AppRouter />
    </StandardAppContainer>
  );
};

