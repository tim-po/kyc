import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "../../../Standard/LocaleContext";
import {localized} from "../../../Standard/utils/localized";
import "./index.css";
import VerificationTile from "../../VerificationTile";
import Text from "../../Text";
import styled, {css} from "styled-components";
import useValidatedState, {
  validationDateFuncs,
  validationFuncs,
  validationFuncsFactory
} from "../../../Standard/hooks/useValidatedState";
import SimpleInput from "../../../Standard/components/SimpleInput";
import SimpleDatePicker from "../../../Standard/components/SimpleDatePicker";
import SimpleLabelContainer from "../../../Standard/components/SimpleLabelContainer";
import SimpleAutocomplete from "../../../Standard/components/SimpleAutocomplete";
import {Country, FieldStatus} from "../../../types";
import {setInputStatus} from "../../../utils/common";
import CheckMark from "../../../icons/CheckMark";

type IdentityInformationPropType = {
  onChangeData: (data: any) => void
  isSubmitted: boolean
  countries: Country[],
  fieldsStatus: {
    firstName: FieldStatus | undefined,
    lastName: FieldStatus | undefined,
    nationality: FieldStatus | undefined,
    middleName: FieldStatus | undefined,
    bDate: FieldStatus | undefined
  }
}

const IdentityInformationDefaultProps = {};

const FlexWrapper = styled.div<{isValid: boolean | undefined}>`
  display: flex;
  gap: 14px;

  ${({isValid}) => {
    return css`
      flex-direction: ${isValid ? "column" : "row"};
    `;
  }};
`;

const InputFlexWrapper = styled.div`
  display: flex;
  width: 50%;
`

const IdentityInformation = (props: IdentityInformationPropType) => {
  const {locale} = useContext(LocaleContext);
  const {onChangeData, countries, isSubmitted, fieldsStatus} = props;

  const [isFirstRender, setIsFirstRender] = useState(true)
  const [localStorageData, setLocalStorageData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    nationality: "",
    bDate: ""
  })

  const [[firstName, setFirstName], firstNameValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [[lastName, setLastName], lastNameValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [middleName, setMiddleName] = useState<string>("");
  const [[nationality, setNationality], nationalityValid] = useValidatedState<string>("", validationFuncsFactory.inArray<string>(countries.map(ctr => ctr.name)));
  const [[bDate, setBDate], bDateValid] = useValidatedState<string>("", validationDateFuncs.dateIsNotGreaterThanToday);

  const forceValidateSoft = () => {
    // if(!forceValidate){
    //   setForceValidate(true)
    // }
  }

  useEffect(() => {
    if (!isFirstRender) {
      localStorage.setItem('identityInformation', JSON.stringify(localStorageData))
    }
  }, [isFirstRender])

  function setIdentityInformationInner(identityInformation: { data: {}, isValid: boolean }) {
    if (!isFirstRender) {
      localStorage.setItem('identityInformation', JSON.stringify(identityInformation.data))
      onChangeData(identityInformation)
    } else {
      setIsFirstRender(false)
    }
  }

  useEffect(() => {
    const identityInformation = localStorage.getItem("identityInformation");
    const parsed = JSON.parse(`${identityInformation}`)
    if(parsed){
      setLocalStorageData(parsed);
    }
    if(localStorageData.firstName){
      setFirstName(localStorageData.firstName)
      forceValidateSoft()
    }
    if(localStorageData.lastName) {
      setLastName(localStorageData.lastName)
      forceValidateSoft()
    }
    if(localStorageData.middleName) {
      setMiddleName(localStorageData.middleName)
      forceValidateSoft()
    }
    if(localStorageData.nationality) {
      setNationality(localStorageData.nationality)
      forceValidateSoft()
    }
    if(localStorageData.bDate) {
      setBDate(localStorageData.bDate)
      forceValidateSoft()
    }
  }, [isFirstRender, localStorageData.firstName, localStorageData.bDate, localStorageData.lastName, localStorageData.middleName, localStorageData.nationality, countries])

  useEffect(() => {
    setIdentityInformationInner(
      {
        data: {nationality, firstName, lastName, middleName, bDate},
        isValid: firstNameValid && lastNameValid && nationalityValid && bDateValid
      }
    );
  }, [nationality, firstName, lastName, middleName, bDate, firstNameValid, lastNameValid, nationalityValid, bDateValid]);

  return (
    <VerificationTile isValid={firstNameValid && lastNameValid && nationalityValid && bDateValid}>
      <form autoComplete={"on"}>
        <Text fontSize={24} color={"#000"}>{localized(texts.tileTitle, locale)}</Text>
        <div className={"mb-4"}/>
       <InputFlexWrapper>
         <SimpleLabelContainer
           displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.nationality?.value, fieldsStatus.nationality?.blocked)}
           label={localized(texts.nationalityLabel, locale)}
           id="shipping country-name"
         >
           <SimpleAutocomplete
             isValid={nationalityValid}
             onChangeRaw={setNationality}
             displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.nationality?.value, fieldsStatus.nationality?.blocked)}
             errorTooltipText={"Please select valid country"}
             required
             placeholder={localized(texts.nationalityLabel, locale)}
             autoComplete={"shipping country-name"}
             name={"shipping country-name"}
             id={"shipping country-name"}
             options={countries.map(ctr => {
               return ({value: ctr.name})
             })}
             value={nationality}
           />
         </SimpleLabelContainer>
         {fieldsStatus && fieldsStatus.nationality?.valid && fieldsStatus.nationality?.blocked && <CheckMark/>}
       </InputFlexWrapper>
        <FlexWrapper isValid={fieldsStatus && fieldsStatus.nationality?.valid && fieldsStatus.nationality?.blocked}>
         <InputFlexWrapper>
           <SimpleLabelContainer
             displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.firstName?.value, fieldsStatus.firstName?.blocked)}
             label={localized(texts.firstNameLabel, locale)}
             id="firstname"
           >
             <SimpleInput
               onlyEmmitOnBlur
               onChangeRaw={setFirstName}
               required
               isValid={firstNameValid}
               displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.firstName?.value, fieldsStatus.firstName?.blocked)}
               inputProps={{
                 className: "w-full",
                 placeholder: `${localized(texts.firstNameLabel, locale)}`,
                 value: firstName
               }}
               autoComplete={"firstname"}
               id="firstname"
             />
           </SimpleLabelContainer>
           {fieldsStatus && fieldsStatus.firstName?.valid && fieldsStatus.firstName?.blocked && <CheckMark/>}
         </InputFlexWrapper>
         <InputFlexWrapper>
           <SimpleLabelContainer
             displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.lastName?.value, fieldsStatus.lastName?.blocked)}
             label={localized(texts.lastNameLabel, locale)}
             id={"lastname"}
           >
             <SimpleInput
               onChangeRaw={setLastName}
               displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.lastName?.value, fieldsStatus.lastName?.blocked)}
               required
               inputProps={{
                 className: "w-full",
                 placeholder: `${localized(texts.lastNameLabel, locale)}`,
                 value: lastName
               }}
               autoComplete={"lastname"}
             />
           </SimpleLabelContainer>
           {fieldsStatus && fieldsStatus.lastName?.valid && fieldsStatus.lastName?.blocked && <CheckMark/>}
         </InputFlexWrapper>
        </FlexWrapper>
        <FlexWrapper isValid={fieldsStatus && fieldsStatus.nationality?.valid && fieldsStatus.nationality?.blocked}>
         <InputFlexWrapper>
           <SimpleLabelContainer
             displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.middleName?.value, fieldsStatus.middleName?.blocked)}
             label={localized(texts.middleNameLabel, locale)}
             id={"middlename"}
           >
             <SimpleInput
               onChangeRaw={setMiddleName}
               displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.middleName?.value, fieldsStatus.middleName?.blocked)}
               inputProps={{
                 className: "w-full",
                 placeholder: `${localized(texts.middleNameLabel, locale)}`,
                 value: middleName
               }}
               autoComplete={"middlename"}
               id={"middlename"}
             />
           </SimpleLabelContainer>
           {fieldsStatus && fieldsStatus.middleName?.valid && fieldsStatus.middleName?.blocked && <CheckMark/>}
         </InputFlexWrapper>
        <InputFlexWrapper>
          <SimpleLabelContainer
            displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.bDate?.value, fieldsStatus.bDate?.blocked)}
            label={localized(texts.birthDateLabel, locale)}
            id={"birthdate"}
          >
            <SimpleDatePicker
              value={bDate}
              displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.bDate?.value, fieldsStatus.bDate?.blocked)}
              onChangeRaw={setBDate}
              isValid={bDateValid}
              required
              errorTooltipText={"Please enter a date in the past"}
              autoComplete={"birthdate"}
              id={"birthdate"}
            />
          </SimpleLabelContainer>
          {fieldsStatus && fieldsStatus.bDate?.valid && fieldsStatus.bDate?.blocked && <CheckMark/>}
        </InputFlexWrapper>
        </FlexWrapper>
      </form>
    </VerificationTile>
  );
};

IdentityInformation.defaultProps = IdentityInformationDefaultProps;

export default IdentityInformation;