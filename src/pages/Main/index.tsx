import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled from "styled-components";

type MainPropType = {}

const MainDefaultProps = {}

const MainPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Main = (props: MainPropType) => {
  const {locale} = useContext(LocaleContext)

  return (
    <MainPageContainer>

    </MainPageContainer>
  )
};

Main.defaultProps = MainDefaultProps

export default Main

