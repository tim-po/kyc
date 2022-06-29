import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import './index.css'
import VerificationTile from "../VerificationTile";
import Text from "../Text";
import styled from "styled-components";

type ResidencePropType = {}

const ResidenceDefaultProps = {}

const FlexWrapper = styled.div`
  display: flex;
  gap: 14px;
`

const Residence = (props: ResidencePropType) => {
  const {locale} = useContext(LocaleContext)

  return (
    <VerificationTile>
      <Text fontSize={24} color={'#000'}>Residence</Text>
      // here country select
      <FlexWrapper>
        // here city input
        // here postal code input
      </FlexWrapper>
      // here address input
    </VerificationTile>
  )
};

Residence.defaultProps = ResidenceDefaultProps

export default Residence