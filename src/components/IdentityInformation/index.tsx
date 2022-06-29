import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import './index.css'
import VerificationTile from "../VerificationTile";
import Text from "../Text";
import styled from "styled-components";

type IdentityInformationPropType = {}

const IdentityInformationDefaultProps = {}

const FlexWrapper = styled.div`
  display: flex;
  gap: 14px;
`

const IdentityInformation = (props: IdentityInformationPropType) => {
  const {locale} = useContext(LocaleContext)

  return (
    <VerificationTile>
      <Text fontSize={24} color={'#000'}>Identity information</Text>
        // here nationality input
      <FlexWrapper>
        // here first name input
        // here last name input
      </FlexWrapper>
      <FlexWrapper>
        // here middle name input
        // here data picker name input
      </FlexWrapper>
    </VerificationTile>
  )
};

IdentityInformation.defaultProps = IdentityInformationDefaultProps

export default IdentityInformation