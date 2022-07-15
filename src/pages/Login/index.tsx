import React, {useContext, useState} from "react";
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
  min-height: 800px;
`;

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

const Login = (props: LoginPropType) => {
  const {locale} = useContext(LocaleContext);

  const [[email, setEmail], emailValid] = useValidatedState<string>("", validationFuncs.isEmail);
  const [[password, setPassword], passwordValid] = useValidatedState<string>("", validationFuncs.validPassword);
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
    const {data: {token}} = await setUser();
    setCookie("auth", token, {path: window.location.pathname});
    setIsLoading(false);
    history.push(RouteName.VERIFICATION);
  }

  const isValid = emailValid && passwordValid;

  return (
    <LoginPageContainer>
      <Text fontSize={36} marginBottom={40}>Sign in to your account</Text>
      <Form>
        <SimpleLabelContainer label={"Email address"} id={"email"}>
          <SimpleInput
            onChangeRaw={setEmail}
            errorTooltipText={"Please enter a correct email"}
            inputProps={{
              placeholder: "Email",
              type: "email"
            }}
            id={"email"}
          />
        </SimpleLabelContainer>
        <SimpleLabelContainer label={"Password"} id={"current-password"}>
          <SimpleInput
            errorTooltipText={"Password should be longer than 8 characters"}
            inputProps={{
              placeholder: "Password",
              type: "password"
            }}
            id={"current-password"}
            autoComplete={"current-password"}
            onChangeRaw={setPassword}
          />
        </SimpleLabelContainer>
        {isServerError && <ErrorMessage message={"Something went wrong"} title={"Error signing in"}/>}
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
              "Sign in"
          }
        </Button>
        <FlexLinksWrapper>
          <TextLink to={""}>Forgot password?</TextLink>
          <TextLink to={RouteName.REGISTRATION}>Sign up</TextLink>
        </FlexLinksWrapper>
      </Form>
    </LoginPageContainer>
  );
};

Login.defaultProps = LoginDefaultProps;

export default Login;

