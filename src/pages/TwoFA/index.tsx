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
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../Standard/components/Spinner";
import SimpleInput from "../../Standard/components/SimpleInput";
import SimpleLabelContainer from "../../Standard/components/SimpleLabelContainer";

interface ButtonProps {
  background: string;
  textColor: string;
  marginTop?: number;
}

type TwoFAPropType = {}

const TwoFADefaultProps = {};

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
  //min-height: 420px;
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

const TwoFA = (props: TwoFAPropType) => {
  const {locale} = useContext(LocaleContext);

  const [code, setCode] = useState<string>("");


  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendCode() {
    // const TwoFAUrl = `${API_URL}/api/auth/TwoFA`;
    // const requestOptions = {
    //   method: "PUT",
    //   headers: {"Content-Type": "application/json"},
    //   body: JSON.stringify({
    //     login: email,
    //   })
    // };
    // return fetch(TwoFAUrl, requestOptions)
    //   .then(res => res.json());
    alert(code)
  }

  return (
    <LoginPageContainer>
      <Text fontSize={36} marginBottom={40}>{localized(texts.pageTitle, locale)}</Text>
      <Form>
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
      </Form>
    </LoginPageContainer>
  );
};

TwoFA.defaultProps = TwoFADefaultProps;

export default TwoFA;

