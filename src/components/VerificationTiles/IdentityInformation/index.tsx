import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "../../../Standard/LocaleContext";
import {localized} from "../../../Standard/utils/localized";
import "./index.css";
import VerificationTile from "../../VerificationTile";
import Text from "../../Text";
import styled from "styled-components";
import SimpleValidatedInput from "../../../Standard/components/SimpleInput";
import useValidatedState, {
  validationDateFuncs,
  validationFuncs,
  validationFuncsFactory
} from "../../../Standard/hooks/useValidatedState";
import SimpleInput from "../../../Standard/components/SimpleInput";
import {DatePicker} from "antd";
import SimpleDatePicker from "../../../Standard/components/SimpleDatePicker";
import SimpleLabelContainer from "../../../Standard/components/SimpleLabelContainer";
import SimpleAutocomplete from "../../../Standard/components/SimpleAutocomplete";
import { Country } from "../../../types";

type IdentityInformationPropType = {
  onChangeData: (data: any) => void
  isSubmitted: boolean
  countries: Country[]
}

const IdentityInformationDefaultProps = {};

const FlexWrapper = styled.div`
  display: flex;
  gap: 14px;
`;

const IdentityInformation = (props: IdentityInformationPropType) => {
  const {locale} = useContext(LocaleContext);
  const {onChangeData, countries, isSubmitted} = props;

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
        <SimpleLabelContainer displayAsLabel={isSubmitted} label={localized(texts.nationalityLabel, locale)} id="shipping country-name">
          <SimpleAutocomplete
              isValid={nationalityValid}
              onChangeRaw={setNationality}
              displayAsLabel={isSubmitted}
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
        <FlexWrapper>
          <SimpleLabelContainer
              displayAsLabel={isSubmitted}
            label={localized(texts.firstNameLabel, locale)}
            id="firstname"
          >
            <SimpleInput
              onlyEmmitOnBlur
              onChangeRaw={setFirstName}
              required
              isValid={firstNameValid}
              displayAsLabel={isSubmitted}
              inputProps={{
                className: "w-full",
                placeholder: `${localized(texts.firstNameLabel, locale)}`,
                value: firstName
              }}
              autoComplete={"firstname"}
              id="firstname"
            />
          </SimpleLabelContainer>
          <SimpleLabelContainer displayAsLabel={isSubmitted} label={localized(texts.lastNameLabel, locale)} id={"lastname"}>
            <SimpleInput
              onChangeRaw={setLastName}
              displayAsLabel={isSubmitted}
              required
              inputProps={{
                className: "w-full",
                placeholder: `${localized(texts.lastNameLabel, locale)}`,
                value: lastName
              }}
              autoComplete={"lastname"}
            />
          </SimpleLabelContainer>
        </FlexWrapper>
        <FlexWrapper>
          <SimpleLabelContainer displayAsLabel={isSubmitted} label={localized(texts.middleNameLabel, locale)} id={"middlename"}>
            <SimpleInput
              onChangeRaw={setMiddleName}
              displayAsLabel={isSubmitted}
              inputProps={{
                className: "w-full",
                placeholder: `${localized(texts.middleNameLabel, locale)}`,
                value: middleName
              }}
              autoComplete={"middlename"}
              id={"middlename"}
            />
          </SimpleLabelContainer>
          <SimpleLabelContainer displayAsLabel={isSubmitted} label={localized(texts.birthDateLabel, locale)} id={"birthdate"}>
            <SimpleDatePicker
              value={bDate}
              displayAsLabel={isSubmitted}
              onChangeRaw={setBDate}
              isValid={bDateValid}
              required
              errorTooltipText={"Please enter a date in the past"}
              autoComplete={"birthdate"}
              id={"birthdate"}
            />
          </SimpleLabelContainer>
        </FlexWrapper>
      </form>
    </VerificationTile>
  );
};

IdentityInformation.defaultProps = IdentityInformationDefaultProps;

export default IdentityInformation;