import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled, {css} from "styled-components";
import VerificationTile from "../../components/VerificationTile";
import Text from "../../components/Text";
import Wallet from "../../components/VerificationTiles/Wallet";
import IdentityInformation from "../../components/VerificationTiles/IdentityInformation";
import Documents from "../../components/Documents";
import VerificationIcon from "../../icons/Verified";
import Residence from "../../components/VerificationTiles/Residence";
import useValidatedState, {ControlledValidationState, validationFuncs} from "../../Standard/hooks/useValidatedState";
import {API_URL} from "../../api/constants";
import {Country} from "../../types";
import Info from '../../icons/Info/index'

type VerificationPropType = {}

const VerificationDefaultProps = {};

const VerificationPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  //height: 100%;
  padding-top: 40px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

const RowFlexWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #FFFFFF;
  width: 240px;
  height: 50px;
  background: #33CC66;
  border-radius: 10px;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  margin-top: 40px;

  &:focus,
  &:active {
    outline: none;
  }
`

const FlexEndWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const Verification = (props: VerificationPropType) => {
  const {locale} = useContext(LocaleContext);

  async function verify() {

  }

  const [isFirstRender, setIsFirstRender] = useState(true)
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
  }, validationFuncs.controlled)

  const [countries, setCountries] = useState<Country[]>([])

  const isValid = identityInformationValid && residenceValid && walletValid;

  const getCountries = () => {
    const registrationUrl = `${API_URL}/api/countries`
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }
    fetch(registrationUrl, requestOptions)
      .then(res => res.json())
      .then(obj => setCountries(obj.data))
  }

  useEffect(() => {
    getCountries()
  }, [])

  return (
    <VerificationPageContainer>
      <Text fontWeight={700} fontSize={40} marginBottom={12}>Account Verification</Text>
      <Text fontWeight={400} fontSize={24} marginBottom={70}>Verify your account to access services on
        MMPro</Text>
      <FlexWrapper>
        <Text fontWeight={400} fontSize={18} marginBottom={40}>
          Please make sure that all the information entered is consistent with your ID documents. <br/>
          You won’t be able to change it once verified.
        </Text>
        <RowFlexWrapper>
          <Info/>
          <Text fontWeight={400} fontSize={16}>We automatically save all input so you can leave page at any time</Text>
        </RowFlexWrapper>
        <Wallet onChangeData={setWallet}/>
        <IdentityInformation onChangeData={setIdentityInformation}/>
        <Residence countries={countries} onChangeData={setResidence}/>
        <Documents onChangeData={setDocuments}/>
        <RowFlexWrapper>
          <VerificationIcon/>
          <Text fontSize={16} fontWeight={400}>
            This information is used for personal verification only,
            and is kept private and confidential by MMPro
          </Text>
        </RowFlexWrapper>
        <FlexEndWrapper>
          <Button>Verify account</Button>
        </FlexEndWrapper>
      </FlexWrapper>
    </VerificationPageContainer>
  );
};

Verification.defaultProps = VerificationDefaultProps;

export default Verification;

