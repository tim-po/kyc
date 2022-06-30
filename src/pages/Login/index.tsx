import React, {useContext, useState} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import {RouteName} from '../../router';
import {API_URL} from "../../api/constants";
import sha256 from "crypto-js/sha256";
import Text from "../../components/Text";
import SimpleValidatedInput from "../../Standard/components/SimpleValidatedInput";
import useValidatedState from "../../Standard/hooks/useValidatedState";
import {useCookies} from "react-cookie";

const testEmailRegex = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

interface ButtonProps {
  background: string
  textColor: string
  marginTop?: number
}

type LoginPropType = {}

const LoginDefaultProps = {}

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
  //min-height: 420px;
  padding: 32px 40px;
  background: #fff;
  border-radius: 20px;
  margin-top: 20px;
`

const TextLink = styled(Link)`
  position: relative;
  color: #51A25A;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
  
  &:last-child{
    margin-bottom: 0;
  }
  
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const FlexLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;
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

const Login = (props: LoginPropType) => {
  const {locale} = useContext(LocaleContext)

  const [[email, setEmail], [emailValid, setEmailValid]] = useValidatedState<string>('')
  const [[password, setPassword], [passwordValid, setPasswordValid]] = useValidatedState<string>('')
  const history = useHistory()

  const [cookies, setCookie] = useCookies(['auth']);

  async function setUser(): Promise<{ data: { token: string } }> {
    const registrationUrl = `${API_URL}/api/auth/login`
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        login: email,
        password: sha256(password).toString(),
      })
    }
    return fetch(registrationUrl, requestOptions)
      .then(res => res.json())
  }

  async function login() {
    const {data: {token}} = await setUser()
    setCookie('auth', token, { path: window.location.pathname })
    history.push(RouteName.VERIFICATION)
  }

  const isValid = emailValid && passwordValid

  return (
    <LoginPageContainer>
      <Text fontSize={36} marginBottom={40}>Sign in to your account</Text>
      <Form>
        <SimpleValidatedInput
          onValidationChange={setEmailValid}
          onChange={setEmail}
          validationFunction={(text) => testEmailRegex.test(text)}
          errorTooltipText={'Please enter a correct email'}
          placeholder="Email"
          type={'email'}
          label={"Email address"}
        />
        <SimpleValidatedInput
          label={"Password"}
          errorTooltipText={'Password should be longer than 8 characters'}
          placeholder="Password"
          type={'password'}
          autocomplete={'current-password'}
          onValidationChange={setPasswordValid}
          onChange={setPassword}
          validationFunction={(text) => text.length>8}
        />
        <Button textColor={'#fff'} background={'#33CC66'} onClick={login}>Sign in</Button>
        <FlexLinksWrapper>
          <TextLink to={''}>Forgot password?</TextLink>
          <TextLink to={RouteName.REGISTRATION}>Sign up</TextLink>
        </FlexLinksWrapper>
      </Form>
    </LoginPageContainer>
  )
};

Login.defaultProps = LoginDefaultProps

export default Login

