import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled, {css} from "styled-components";
import Text from "../../components/Text";
import Wallet from "../../components/VerificationTiles/Wallet";
import IdentityInformation from "../../components/VerificationTiles/IdentityInformation";
import Documents from "../../components/VerificationTiles/Documents";
import VerificationIcon from "../../icons/Verified";
import Residence from "../../components/VerificationTiles/Residence";
import useValidatedState, {ControlledValidationState, validationFuncs} from "../../Standard/hooks/useValidatedState";
import {API_URL} from "../../api/constants";
import {Country} from "../../types";
import Info from "../../icons/Info/index";
import {useCookies} from "react-cookie";
import ForceValidateContext from "Standard/ForceValidateContext";

type VerificationPropType = {}

const VerificationDefaultProps = {};


const VerificationPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 40px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

const RowFlexWrapper = styled.div<{ marginBottom?: number }>`
  display: flex;
  gap: 10px;
  align-items: center;

  ${({marginBottom}) => {
    return css`
      margin-bottom: ${marginBottom}px;
    `;
  }};
`;

const Button = styled.button<{ isValid: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${p => p.isValid ? "#fff" : "rgba(255, 255, 255, 0.6)"};
  min-width: 240px;
  width: max-content;
  padding: 10px;
  height: 50px;
  background: ${p => p.isValid ? "#33CC66" : "rgba(0, 0, 0, 0.2)"};
  border-radius: 10px;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  margin-top: 40px;
  transition: background 0.3s ease;

  &:focus,
  &:active {
    outline: none;
  }
`;

const FlexEndWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Verification = (props: VerificationPropType) => {
  const {locale} = useContext(LocaleContext);

  const [[identityInformation, setIdentityInformation], identityInformationValid] = useValidatedState<ControlledValidationState<any>>({
    data: {},
    isValid: false
  }, validationFuncs.controlled);
  const [[residence, setResidence], residenceValid] = useValidatedState<ControlledValidationState<any>>({
    data: {},
    isValid: false
  }, validationFuncs.controlled);
  const [[wallet, setWallet], walletValid] = useValidatedState<ControlledValidationState<any>>({
    data: {},
    isValid: false
  }, validationFuncs.controlled);
  const [[documents, setDocuments], documentsValid] = useValidatedState<ControlledValidationState<any>>({
    data: {},
    isValid: false
  }, validationFuncs.controlled);
  const [[passportInformation, setPassportInformation], passportInformationValid] = useValidatedState<ControlledValidationState<any>>({
    data: {},
    isValid: false
  }, validationFuncs.controlled);

  const [countries, setCountries] = useState<Country[]>([]);

  const [isSubmitted, setIsSubmitted] = useState(true);
  const [isForceValid, setIsForceValid] = useState(false)

  const [cookies] = useCookies(["auth"]);

  const isValid =
    documentsValid &&
    identityInformationValid &&
    residenceValid &&
    walletValid;

  const getCountries = () => {
    const registrationUrl = `${API_URL}/api/countries`;
    const requestOptions = {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    };
    fetch(registrationUrl, requestOptions)
      .then(res => res.json())
      .then(obj => setCountries(obj.data));
  };

  async function setVerification() {

    setIsForceValid(true)
    if (!isValid) {
      return;
    }

    const userData = {
      ...identityInformation.data,
      ...residence.data,
      ...wallet.data,
      ...documents.data
    };

    const verificationUrl = `${API_URL}/api/validation`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.auth
      },
      body: JSON.stringify(userData)
    };

    fetch(verificationUrl, requestOptions).then(res => {
      console.log(res)
      if (res.status === 201) {
        setIsSubmitted(true);
      }
    });
  }

  async function checkIsUserDataSubmitted() {
    const isUserDataUrl = `${API_URL}/api/validation/data`;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.auth
      }
    };

    fetch(isUserDataUrl, requestOptions)
      .then(res => res.json())
      .then(userData => {
        if (userData && userData.data) {
          setIsSubmitted(userData.data.isSubmitted);
          console.log(userData)
          const data = userData.data
          localStorage.setItem("identityInformation", JSON.stringify({
            nationality: data.nationality,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            bDate: data.bDate
          }));
          localStorage.setItem("residence", JSON.stringify({
            country: data.country,
            city: data.city,
            zip: data.zip,
            street: data.street,
          }));
          localStorage.setItem("wallet", JSON.stringify({
            wallet: data.wallet
          }));
        }
      });
  }

  useEffect(() => {
    getCountries();
    checkIsUserDataSubmitted();
  }, []);

  return (
    <ForceValidateContext.Provider value={{setForceValidate: setIsForceValid, forceValidate: isForceValid}}>
      <VerificationPageContainer>
        <Text fontWeight={700} fontSize={40} marginBottom={12}>{localized(texts.pageTitle, locale)}</Text>
        <Text fontWeight={400} fontSize={24} marginBottom={70}>{localized(texts.pageSubtitle, locale)}</Text>
        <FlexWrapper>
          <Text fontWeight={400} fontSize={18} marginBottom={40}>
            {localized(texts.documentsWarning, locale)}
            <br/>
            {localized(texts.noChangeWarning, locale)}
          </Text>
          <RowFlexWrapper marginBottom={20}>
            <Info/>
            <Text fontWeight={400} fontSize={16}>{localized(texts.automaticallySave, locale)}</Text>
          </RowFlexWrapper>
          <Wallet onChangeData={setWallet} isSubmitted={isSubmitted}/>
          <IdentityInformation countries={countries} onChangeData={setIdentityInformation}
                               isSubmitted={isSubmitted}/>
          <Residence countries={countries} onChangeData={setResidence} isSubmitted={isSubmitted}/>
          <Documents onChangeData={setDocuments} isSubmitted={isSubmitted}/>
          <RowFlexWrapper>
            <VerificationIcon/>
            <Text fontSize={16} fontWeight={400}>{localized(texts.termOfUse, locale)}</Text>
          </RowFlexWrapper>
          <FlexEndWrapper>
            {isSubmitted &&
            <Button isValid={false}>{localized(texts.buttonTextCheck, locale)}</Button>
            }
            {!isSubmitted &&
            <Button isValid={isValid || !isForceValid} onClick={setVerification}>{localized(texts.buttonTextVerify, locale)}</Button>
            }
          </FlexEndWrapper>
        </FlexWrapper>
      </VerificationPageContainer>
    </ForceValidateContext.Provider>
  );
};

Verification.defaultProps = VerificationDefaultProps;

export default Verification;

