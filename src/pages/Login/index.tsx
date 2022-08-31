import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import {RouteName} from "../../router";
import {API_URL} from "../../api/constants";
import sha256 from "crypto-js/sha256";
import Text from "../../components/Text";
import useValidatedState, {validationFuncs} from "../../Standard/hooks/useValidatedState";
import {useCookies} from "react-cookie";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../Standard/components/Spinner";
import SimpleInput from "../../Standard/components/SimpleInput";
import SimpleLabelContainer from "../../Standard/components/SimpleLabelContainer";
import BubbleLayout from "../../Standard/components/BubbleLayout";

interface ButtonProps {
  background: string;
  textColor: string;
  marginTop?: number;
}

type LoginPropType = {}

const LoginDefaultProps = {};

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 380px;
  padding: 32px 40px;
  background: #fff;
  border-radius: 20px;
  margin-top: 20px;
`;

const TextLink = styled(Link)`
  position: relative;
  color: #51A25A;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const FlexLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;
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

const Login = (props: LoginPropType) => {
  const {locale} = useContext(LocaleContext);

  const [[email, setEmail], emailValid] = useValidatedState<string>("", validationFuncs.isEmail);
  const [[password, setPassword], passwordValid] = useValidatedState<string>("", validationFuncs.validPassword);

  const [isWaitingForCode, setIsWaitingForCode] = useState(false)
  const [code, setCode] = useState<string>("");

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  const [cookies, setCookie] = useCookies(["auth"]);

  async function setUser(): Promise<{ data: { token: string } }> {
    const registrationUrl = `${API_URL}/api/auth/login`;
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        login: email,
        password: sha256(password).toString()
      })
    };
    return fetch(registrationUrl, requestOptions)
      .then(res => res.json())
      .catch(() => {
        setIsServerError(true);
        setIsLoading(false);
      });
  }

  async function login() {
    if (!isValid) return;

    setIsLoading(true);
    setIsServerError(false);
    await setUser();
    setIsLoading(false);
    setIsWaitingForCode(true)
  }

  const handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.code === "Enter" || event.code === "NumpadEnter")) {
      if(isWaitingForCode){
        sendCode()
      }else {
        login()
      }
    }
  }

  async function sendCode() {
    const TwoFAUrl = `${API_URL}/api/auth/login/code`;
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

  const isValid = emailValid && passwordValid;

  useEffect(() => {
    if (email && password){
      //@ts-ignore
      document.addEventListener("keydown", handleEnterPress);

      return () => {
        //@ts-ignore
        document.removeEventListener("keydown", handleEnterPress);
      };
    }
  }, [email, password]);

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
                    required
                    onChangeRaw={setEmail}
                    errorTooltipText={"Please enter a correct email"}
                    inputProps={{
                      placeholder: `${localized(texts.emailAddressLabel, locale)}`,
                      type: "email",
                      className: "w-full",
                      value: email
                    }}
                    id={"email"}
                />
              </SimpleLabelContainer>
              <SimpleLabelContainer label={localized(texts.passwordLabel, locale)} id={"current-password"}>
                <SimpleInput
                    required
                    // isValid={passwordValid}
                    errorTooltipText={"Password should be longer than 8 characters"}
                    inputProps={{
                      placeholder: `${localized(texts.passwordLabel, locale)}`,
                      type: "password",
                      className: "w-full",
                      value: password
                    }}
                    id={"current-password"}
                    autoComplete={"current-password"}
                    onChangeRaw={setPassword}
                />
              </SimpleLabelContainer>
              {
                  isServerError &&
                  <ErrorMessage message={localized(texts.somethingWentWrong, locale)} title={localized(texts.errorSignIn, locale)}/>
              }
              <Button
                  marginTop={20}
                  type={"button"}
                  textColor={isValid ? "#fff" : "rgba(0, 0, 0, 0.6)"}
                  background={isValid ? "#33CC66" : "rgba(0, 0, 0, 0.2)"}
                  onClick={login}
              >
                {
                  isLoading ?
                      <Spinner color="white" size={25}/>
                      :
                      `${localized(texts.buttonText, locale)}`
                }
              </Button>
              <FlexLinksWrapper>
                <TextLink to={""}>{localized(texts.forgotPassword, locale)}</TextLink>
                <TextLink to={RouteName.REGISTRATION}>{localized(texts.signUp, locale)}</TextLink>
              </FlexLinksWrapper>
            </>
        }
      </Form>
    </LoginPageContainer>
  );
};

Login.defaultProps = LoginDefaultProps;

export default Login;

