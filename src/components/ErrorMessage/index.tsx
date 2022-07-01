import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import Text from '../Text';
import './index.css'
import styled from "styled-components";

type ErrorMessagePropType = {
  message: string
  title: string
}

const ErrorMessageDefaultProps = {
  message: 'Account already exists. Please Log in',
  title: 'Error signing in'
}

const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 10px;
`

const ErrorMessage = (props: ErrorMessagePropType) => {
  const {locale} = useContext(LocaleContext)

  const {message, title} = props

  return (
    <ErrorMessageContainer>
      <Text fontSize={16} color={'#D90000'} marginBottom={5}>{title}</Text>
      <Text fontSize={16} color={'#D90000'} fontWeight={400}>{message}</Text>
    </ErrorMessageContainer>
  )
};

ErrorMessage.defaultProps = ErrorMessageDefaultProps

export default ErrorMessage