import React, { useContext, useEffect } from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import './index.css'
import VerificationTile from "../VerificationTile";
import Text from "../Text";
import styled from "styled-components";
import SimpleValidatedInput from "../../Standard/components/SimpleValidatedInput";
import useValidatedState from "../../Standard/hooks/useValidatedState";

type ResidencePropType = {
  onChangeData: (data: any)=>void,
  onChangeValid: (isValid: boolean)=>void,
}

const ResidenceDefaultProps = {}

const FlexWrapper = styled.div`
  display: flex;
  gap: 14px;
`

const Residence = (props: ResidencePropType) => {
  const {onChangeData, onChangeValid} = props
  const {locale} = useContext(LocaleContext)
  const [[nationality, setNationality], [nationalityValid, setNationalityValid]] = useValidatedState<string>("");
  const [[city, setCity], [cityValid, setCityValid]] = useValidatedState<string>("");
  const [[zip, setZip], [zipValid, setZipValid]] = useValidatedState<string>("");
  const [[address, setAddress], [addressValid, setAddressValid]] = useValidatedState<string>("");


  useEffect(()=>{
    if(nationality && city && zip && address){
      onChangeValid(nationalityValid && cityValid && zipValid && addressValid)
    }
    onChangeData({nationality, city, zip, address})
  }, [nationality, city, zip, address, nationalityValid, cityValid, zipValid, addressValid])


  return (
    <VerificationTile>
      <Text fontSize={24} color={'#000'}>Residence</Text>
      <div className={'mb-4'}/>
      <SimpleValidatedInput
        onValidationChange={setNationalityValid}
        onChange={setNationality}
        validationFunction={(text) => text.length > 0}
        errorTooltipText={"Residence is required"}
        placeholder="Residence"
        type={"text"}
        label={"Residence"}
        name={"country-name"}
        autocomplete={"shipping country-name"}
      />
      <FlexWrapper>
        <SimpleValidatedInput
          onValidationChange={setCityValid}
          onChange={setCity}
          validationFunction={(text) => text.length > 0}
          errorTooltipText={"City is required"}
          placeholder="City"
          type={"text"}
          label={"City"}
          name={"city-name"}
          autocomplete={"shipping city-name"}
        />
        <SimpleValidatedInput
          onValidationChange={setZipValid}
          onChange={setZip}
          validationFunction={(text) => text.length > 0}
          errorTooltipText={"Postal code is required"}
          placeholder="Postal code"
          type={"text"}
          label={"Postal code"}
          name={"zip-code"}
          autocomplete={"shipping zip-code"}
        />
      </FlexWrapper>
      <SimpleValidatedInput
        onValidationChange={setAddressValid}
        onChange={setAddress}
        validationFunction={(text) => text.length > 0}
        errorTooltipText={"Address is required"}
        placeholder="Address"
        type={"text"}
        label={"Address"}
        name={"address"}
        autocomplete={"shipping address"}
      />
    </VerificationTile>
  )
};

Residence.defaultProps = ResidenceDefaultProps

export default Residence