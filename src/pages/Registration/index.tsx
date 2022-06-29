import React, {useContext, useState} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import {RouteName} from "../../router";
import sha256 from 'crypto-js/sha256';
import {API_URL} from "../../api/constants";
import login from "../Login";

interface ButtonProps {
  background: string
  textColor: string
  marginTop?: number
}

interface TextLinkProps {
  textColor: string
}

type RegistrationPropType = {}

const RegistrationDefaultProps = {}

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 380px;
  min-height: 420px;
  padding: 32px 40px;
  background: #fff;
  border-radius: 20px;
`

const Text = styled.div`
  font-weight: 700;
  font-size: 36px;
  color: #fff;
  margin-bottom: 40px;
`

const GrayText = styled.div`
  color: #8D929C;
  font-weight: 700;
  font-size: 14px;
  margin-right: 5px;
`

const TextLink = styled(Link)`
  color: #51A25A;
  font-weight: 700;
  font-size: 14px;

  &:hover {
    cursor: pointer;
  }
`

const FlexLinksWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
`

const Button = styled.button<ButtonProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 18px;
  color: ${p => p.textColor};
  background: ${p => p.background};
  outline: none;
  transition: background 0.3s ease;
  margin-top: ${p => p.marginTop}px;

  &:focus,
  &:active {
    outline: none;
  }
`

const Registration = (props: RegistrationPropType) => {
  const {locale} = useContext(LocaleContext)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatedPassword, setRepeatedPassword] = useState<string>('')

  async function setUser() {
    const registrationUrl = `${API_URL}/api/registration`
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        login: email,
        password1: sha256(password).toString(),
        password2: sha256(repeatedPassword).toString()
      })
    }
    return fetch(registrationUrl, requestOptions)
      .then(response => response.json())
  }

  return (
    <LoginPageContainer>
      <Text>Sign up to your account</Text>
      <Form>
        <span>Here email input</span>
        <span>Here password input</span>
        <span>Here repeat password input</span>
        <Button textColor={'#fff'} background={'#33CC66'}>Sign up</Button>
        <FlexLinksWrapper>
          <GrayText>Already registered?</GrayText>
          <TextLink to={RouteName.LOGIN}>Sign in</TextLink>
        </FlexLinksWrapper>
      </Form>
    </LoginPageContainer>
  )
};

Registration.defaultProps = RegistrationDefaultProps

export default Registration

