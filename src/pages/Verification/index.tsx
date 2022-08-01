import React, { useContext, useEffect, useState } from "react";
import texts from "./localization";
import LocaleContext from "../../Standard/LocaleContext";
import { localized } from "../../Standard/utils/localized";
import styled, { css } from "styled-components";
import VerificationTile from "../../components/VerificationTile";
import Text from "../../components/Text";
import Wallet from "../../components/VerificationTiles/Wallet";
import IdentityInformation from "../../components/VerificationTiles/IdentityInformation";
import Documents from "../../components/Documents";
import VerificationIcon from "../../icons/Verified";
import Residence from "../../components/VerificationTiles/Residence";
import useValidatedState, { ControlledValidationState, validationFuncs } from "../../Standard/hooks/useValidatedState";
import { API_URL } from "../../api/constants";
import { Country } from "../../types";
import Info from "../../icons/Info/index";
import PassportInformation from "../../components/VerificationTiles/PassportInformation";
import { useCookies } from "react-cookie";
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

  ${({ marginBottom }) => {
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
  width: 240px;
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
    const { locale } = useContext(LocaleContext);

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
            headers: { "Content-Type": "application/json" }
        };
        fetch(registrationUrl, requestOptions)
            .then(res => res.json())
            .then(obj => setCountries(obj.data));
    };

    async function setVerification() {

        setIsForceValid(true)
        if (!isValid) {
            console.log(documents.data.token )
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
                <Text fontWeight={700} fontSize={40} marginBottom={12}>Account Verification</Text>
                <Text fontWeight={400} fontSize={24} marginBottom={70}>Verify your account to access services on
                    MMPro</Text>
                <FlexWrapper>
                    <Text fontWeight={400} fontSize={18} marginBottom={40}>
                        Please make sure that all the information entered is consistent with your ID documents. <br />
                        You won’t be able to change it once verified.
                    </Text>
                    <RowFlexWrapper marginBottom={20}>
                        <Info />
                        <Text fontWeight={400} fontSize={16}>We automatically save all input so you can leave page at
                            any time</Text>
                    </RowFlexWrapper>
                    <Wallet onChangeData={setWallet} isSubmitted={isSubmitted} />
                    <IdentityInformation countries={countries} onChangeData={setIdentityInformation}
                                         isSubmitted={isSubmitted} />
                    <Residence countries={countries} onChangeData={setResidence} isSubmitted={isSubmitted} />
                    <Documents onChangeData={setDocuments} isSubmitted={isSubmitted} />
                    {/*<PassportInformation onChangeData={setPassportInformation}/>*/}
                    <RowFlexWrapper>
                        <VerificationIcon />
                        <Text fontSize={16} fontWeight={400}>
                            This information is used for personal verification only,
                            and is kept private and confidential by MMPro
                        </Text>
                    </RowFlexWrapper>
                    <FlexEndWrapper>
                        {isSubmitted &&
                            <Button isValid onClick={()=>setIsSubmitted(false)}>Edit</Button>
                        }
                        {!isSubmitted &&
                            <Button isValid={isValid || !isForceValid} onClick={setVerification}>Verify account</Button>
                        }
                    </FlexEndWrapper>
                </FlexWrapper>
            </VerificationPageContainer>
        </ForceValidateContext.Provider>
    );
};

Verification.defaultProps = VerificationDefaultProps;

export default Verification;

