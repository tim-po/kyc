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
import {Country, UserData} from "../../types";
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
  const [userData, setUserData] = useState<UserData | undefined>(undefined)

  const [isSubmitted, setIsSubmitted] = useState(true);
  const [isForceValid, setIsForceValid] = useState(false)

  const [cookies] = useCookies(["auth"]);

  const isValid =
    documentsValid &&
    identityInformationValid &&
    residenceValid &&
    walletValid;
  console.log(documentsValid,identityInformationValid,residenceValid,walletValid)
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
      wallet: wallet.data.wallet,
      ...identityInformation.data,
      ...residence.data,
      ...documents.data
    };
    console.log('sent', userData)
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
          setUserData(userData.data);
          setIsSubmitted(userData.data.isSubmitted);
          const data = userData.data
          localStorage.setItem("identityInformation", JSON.stringify({
            nationality: data.nationality.value,
            firstName: data.firstName.value,
            middleName: data.middleName.value,
            lastName: data.lastName.value,
            bDate: data.bDate.value
          }));
          localStorage.setItem("residence", JSON.stringify({
            country: data.country.value,
            city: data.city.value,
            zip: data.zip.value,
            mainStreet: data.mainStreet.value,
            additionalStreet: data.additionalStreet.value,
            region: data.region.value
          }));
          localStorage.setItem("wallet", JSON.stringify({
            wallet: data.wallet.value,
            isBSCNetwork: !!data.wallet.value
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
          <Wallet onChangeData={setWallet} isSubmitted={isSubmitted} fieldStatus={userData && userData.wallet}/>
          <IdentityInformation
            countries={countries}
            onChangeData={setIdentityInformation}
            isSubmitted={isSubmitted}
            fieldsStatus={{
              firstName: userData?.firstName,
              lastName: userData?.lastName,
              middleName: userData?.middleName,
              bDate: userData?.bDate,
              nationality: userData?.nationality,
            }}
          />
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