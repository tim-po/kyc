import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled, {css} from 'styled-components';
import VerificationTile from "../../components/VerificationTile";
import Text from "../../components/Text";
import Wallet from "../../components/Wallet";
import IdentityInformation from "../../components/IdentityInformation";
import Documents from "../../components/Documents";
import VerificationIcon from '../../icons/Verified'

type VerificationPropType = {}

const VerificationDefaultProps = {}

const VerificationPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding-top: 40px;
`

const FlexWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`

const RowFlexWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const Verification = (props: VerificationPropType) => {
  const {locale} = useContext(LocaleContext)

  return (
    <VerificationPageContainer>
      <Text fontWeight={700} fontSize={40} marginBottom={12}>Account Verification</Text>
      <Text fontWeight={400} fontSize={24} marginBottom={70}>Verify your account to access services on MMPro</Text>
      <FlexWrapper>
        <Text fontWeight={400} fontSize={18} marginBottom={40}>
          Please make sure that all the information entered is consistent with your ID documents.
          You won’t be able to change it once verified.
        </Text>
        <Wallet/>
        <IdentityInformation/>
        <Documents />
        <RowFlexWrapper>
          <VerificationIcon />
          <Text fontSize={16} fontWeight={400}>
            This information is used for personal verification only,
            and is kept private and confidential by MMPro
          </Text>
        </RowFlexWrapper>
      </FlexWrapper>
    </VerificationPageContainer>
  )
};

Verification.defaultProps = VerificationDefaultProps

export default Verification

