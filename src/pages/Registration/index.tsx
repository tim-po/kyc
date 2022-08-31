import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {RouteName} from "../../router";
import sha256 from "crypto-js/sha256";
import {API_URL} from "../../api/constants";
import Text from "../../components/Text";
import useValidatedState, {validationFuncs} from "../../Standard/hooks/useValidatedState";
import ErrorMessage from "../../components/ErrorMessage";
import {useHistory} from "react-router-dom";
import Spinner from "../../Standard/components/Spinner";
import SimpleInput from "../../Standard/components/SimpleInput";
import SimpleLabelContainer from "../../Standard/components/SimpleLabelContainer";
import { useCookies } from "react-cookie";

interface ButtonProps {
  background: string;
  textColor: string;
  marginTop?: number;
}

type RegistrationPropType = {}

const RegistrationDefaultProps = {};

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 380px;
  padding: 32px 40px;
  background: #fff;
  border-radius: 20px;
`;

const GrayText = styled.div`
  color: #8D929C;
  font-weight: 700;
  font-size: 14px;
  margin-right: 5px;
`;

const TextLink = styled(Link)`
  color: #51A25A;
  font-weight: 700;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const FlexLinksWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
`;

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
`;

const Subtitle = styled.div`
    max-width: 350px;
    color: black;
  font-size: 20px;
  margin-bottom: 8px;
`

const Registration = (props: RegistrationPropType) => {
  const {locale} = useContext(LocaleContext);

  const [[email, setEmail], emailValid] = useValidatedState<string>("", validationFuncs.isEmail);
  const [[password, setPassword], passwordValid] = useValidatedState<string>("", validationFuncs.validPassword);
  const [[repeatedPassword, setRepeatPassword], repeatedPasswordValid] = useValidatedState<string>("", newValue => newValue === password);

  const [cookies, setCookie] = useCookies(["auth"]);

  const [isWaitingForCode, setIsWaitingForCode] = useState(false)
  const [code, setCode] = useState<string>("");

  const history = useHistory();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValid = emailValid && repeatedPasswordValid && passwordValid;

  async function registration(): Promise<{ code: number, error: string }> {
    const registrationUrl = `${API_URL}/api/auth/registration`;
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        login: email,
        password1: sha256(password).toString(),
        password2: sha256(repeatedPassword).toString()
      })
    };
    return fetch(registrationUrl, requestOptions)
      .then(res => res.json());
  }

  async function checkErrorsAndRegisterUser() {

    if (!isValid) return;

    setIsLoading(true);
    const {code, error} = await registration();
    if (code !== (200 || 201)) {
      setIsError(true);
      setErrorMessage(error);
    } else {
      setIsWaitingForCode(true)
    }
    setIsLoading(false);
  }

  async function sendCode() {
    const TwoFAUrl = `${API_URL}/api/auth/registration/code`;
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        login: email,
        code: +code
      })
    };
    fetch(TwoFAUrl, requestOptions)
        .then(res => res.json()).then(json => {
      setCookie("auth", json.data.token, {path: window.location.pathname});
      history.push(RouteName.VERIFICATION);
    });
  }

  return (
    <LoginPageContainer>
      <Text fontSize={36} marginBottom={40}>{localized(texts.pageTitle, locale)}</Text>
      <Form>
        {isWaitingForCode &&
            <>
              <Subtitle>
                A message with a verification code has been sent to your email. Enter the code to continue.
              </Subtitle>
              <SimpleLabelContainer>
                <SimpleInput
                    onChangeRaw={setCode}
                    inputProps={{
                      placeholder: `${localized(texts.Code, locale)}`,
                      type: "one-time-code",
                      value: code,
                    }}
                    id={"one-time-code"}
                />
              </SimpleLabelContainer>
              {/*{isError && <ErrorMessage message={errorMessage}/>}*/}

              <Button
                  type={"button"}
                  marginTop={0}
                  textColor={"#fff"}
                  background={"#33CC66"}
                  onClick={sendCode}
              >
                {
                  isLoading ?
                      <Spinner color="white" size={25}/>
                      :
                      `${localized(texts.buttonText, locale)}`
                }
              </Button>
            </>
        }
        {!isWaitingForCode &&
        <>
          <SimpleLabelContainer label={localized(texts.emailAddressLabel, locale)} id={"email"}>
            <SimpleInput
                isValid={emailValid}
                onChangeRaw={setEmail}
                errorTooltipText={"Please enter a correct email"}
                inputProps={{
                  placeholder: `${localized(texts.emailAddressLabel, locale)}`,
                  type: "email"
                }}
                id={"email"}
            />
          </SimpleLabelContainer>
          <SimpleLabelContainer label={localized(texts.passwordLabel, locale)} id="new-password-text-field">
            <SimpleInput
                isValid={passwordValid}
                errorTooltipText={"Password should be longer than 8 characters"}
                inputProps={{
                  placeholder: `${localized(texts.passwordLabel, locale)}`,
                  type: "password",
                  name: "new-password"
                }}
                autoComplete={"new-password"}
                id="new-password-text-field"
                onChangeRaw={setPassword}
            />
          </SimpleLabelContainer>
          <SimpleLabelContainer label={localized(texts.confirmPasswordLabel, locale)} id="confirm-password-text-field">
            <SimpleInput
                isValid={repeatedPasswordValid}
                id="confirm-password-text-field"
                errorTooltipText={"Passwords should match"}
                inputProps={{
                  placeholder: `${localized(texts.confirmPasswordLabel, locale)}`,
                  type: "password",
                  name: "new-password"
                }}
                autoComplete={"new-password"}
                onChangeRaw={setRepeatPassword}
            />
          </SimpleLabelContainer>
          {isError && <ErrorMessage message={errorMessage}/>}

          <Button
              type={"button"}
              marginTop={20}
              textColor={isValid ? "#fff" : "rgba(255, 255, 255, 0.6)"}
              background={isValid ? "#33CC66" : "rgba(0, 0, 0, 0.2)"}
              onClick={checkErrorsAndRegisterUser}
          >
            {
              isLoading ?
                  <Spinner color="white" size={25}/>
                  :
                  `${localized(texts.buttonText, locale)}`
            }
          </Button>
          <FlexLinksWrapper>
            <GrayText>{localized(texts.alreadyRegistered, locale)}</GrayText>
            <TextLink to={RouteName.LOGIN}>{localized(texts.signIn, locale)}</TextLink>
          </FlexLinksWrapper>
        </>
        }
      </Form>
    </LoginPageContainer>
  );
};

Registration.defaultProps = RegistrationDefaultProps;

export default Registration;

