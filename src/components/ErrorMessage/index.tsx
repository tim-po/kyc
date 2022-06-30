import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import Text from '../Text';
import './index.css'
import styled from "styled-components";

type ErrorMessagePropType = {
  message: string
}

const ErrorMessageDefaultProps = {
  message: 'Account already exists. Please Log in'
}

const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  padding: 12px;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 10px;
`

const ErrorMessage = (props: ErrorMessagePropType) => {
  const {locale} = useContext(LocaleContext)

  const {message} = props

  return (
    <ErrorMessageContainer>
      <Text fontSize={16} color={'#D90000'} marginBottom={5}>Error signing up</Text>
      <Text fontSize={16} color={'#D90000'} fontWeight={400}>{message}</Text>
    </ErrorMessageContainer>
  )
};

ErrorMessage.defaultProps = ErrorMessageDefaultProps

export default ErrorMessage