import React, { useContext, useEffect, useState } from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import {RouteName} from "../../router";
import sha256 from 'crypto-js/sha256';
import {API_URL} from "../../api/constants";
import Text from "../../components/Text";
import SimpleValidatedInput from "../../Standard/components/SimpleValidatedInput";
import useValidatedState from "../../Standard/hooks/useValidatedState";
import ErrorMessage from "../../components/ErrorMessage";
import {useHistory} from "react-router-dom";

const testEmailRegex = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;


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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 380px;
  min-height: 420px;
  padding: 32px 40px;
  background: #fff;
  border-radius: 20px;
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

  const [[email, setEmail], [emailValid, setEmailValid]] = useValidatedState<string>('')
  const [[password, setPassword], [passwordValid, setPasswordValid]] = useValidatedState<string>('')
  const [[repeatedPassword, setRepeatPassword], [repeatedPasswordValid, setRepeatedPasswordValid]] = useValidatedState<string>('')

  const history = useHistory()

  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function registration(): Promise<{ code: number, error: string }> {
    const registrationUrl = `${API_URL}/api/auth/registration`
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
      .then(res => res.json())
  }

  async function checkErrorsAndRegisterUser() {
    const {code, error} = await registration()
    if (code !== 200) {
      setIsError(true)
      setErrorMessage(error)
    }
  }

  return (
    <LoginPageContainer>
      <Text fontSize={36} marginBottom={40}>Sign up to your account</Text>
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
          autocomplete={'new-password'}
          id="new-password-text-field"
          onValidationChange={setPasswordValid}
          onChange={setPassword}
          validationFunction={(text) => text.length>8}
        />
        <SimpleValidatedInput
          id="confirm-password-text-field"
          label={"Confirm password"}
          errorTooltipText={'Passwords should match'}
          placeholder="Password"
          type={'password'}
          autocomplete={'new-password'}
          onValidationChange={setRepeatedPasswordValid}
          onChange={setRepeatPassword}
          validationFunction={(text) => text === password}
        />
        {isError && <ErrorMessage message={errorMessage}/>}
        <Button type={'button'} textColor={'#fff'} background={'#33CC66'} onClick={checkErrorsAndRegisterUser}>Sign up</Button>
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

