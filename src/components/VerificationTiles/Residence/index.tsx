import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "../../../Standard/LocaleContext";
import {localized} from "../../../Standard/utils/localized";
import "./index.css";
import VerificationTile from "../../VerificationTile";
import Text from "../../Text";
import styled, {css} from "styled-components";
import SimpleValidatedInput from "../../../Standard/components/SimpleInput";
import useValidatedState, {validationFuncs, validationFuncsFactory} from "../../../Standard/hooks/useValidatedState";
import SimpleInput from "../../../Standard/components/SimpleInput";
import placeholder from "lodash/fp/placeholder";
import {Country, FieldStatus} from "../../../types";
import {AutoComplete} from "antd";
import SimpleLabelContainer from "../../../Standard/components/SimpleLabelContainer";
import SimpleAutocomplete from "../../../Standard/components/SimpleAutocomplete";
import {setInputStatus} from "../../../utils/common";
import CheckMark from "../../../icons/CheckMark";

type ResidencePropType = {
  onChangeData: (data: any) => void,
  countries: Country[]
  isSubmitted: boolean,
  fieldsStatus: {
    mainStreet: FieldStatus | undefined,
    additionalStreet: FieldStatus | undefined,
    region: FieldStatus | undefined,
    city: FieldStatus | undefined,
    country: FieldStatus | undefined,
    zip: FieldStatus | undefined
  }
}

const ResidenceDefaultProps = {};

const FlexWrapper = styled.div<{ isValid: boolean | undefined }>`
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

const Residence = (props: ResidencePropType) => {
  const {onChangeData, countries, isSubmitted, fieldsStatus} = props;
  const {locale} = useContext(LocaleContext);

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [localStorageData, setLocalStorageData] = useState({
    mainStreet: "",
    additionalStreet: "",
    region: "",
    city: "",
    country: "",
    zip: ""
  });

  const [[country, setCountry], countryValid] = useValidatedState<string>("", validationFuncsFactory.inArray<string>(countries.map(ctr => ctr.name)));
  const [[city, setCity], cityValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [[zip, setZip], zipValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [[mainStreet, setMainStreet], mainStreetValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [[additionalStreet, setAdditionalStreet], additionalStreetValid] = useValidatedState<string>("", (newValue) => true);
  const [[region, setRegion], regionValid] = useValidatedState<string>("", validationFuncs.hasValue);

  function setResidenceInner(residence: { data: {}, isValid: boolean }) {
    if (!isFirstRender) {
      localStorage.setItem("residence", JSON.stringify(residence.data));
      onChangeData(residence);
    } else {
      setIsFirstRender(false);
    }
  }

  useEffect(() => {
    const residence = localStorage.getItem("residence");
    const parsed = JSON.parse(`${residence}`);
    if (parsed) {
      setLocalStorageData(parsed);
    }
    if (localStorageData.country) {
      setCountry(localStorageData.country);
    }
    if (localStorageData.city) {
      setCity(localStorageData.city);
    }
    if (localStorageData.zip) {
      setZip(localStorageData.zip);
    }
    if (localStorageData.mainStreet) {
      setMainStreet(localStorageData.mainStreet);
    }
    if (localStorageData.additionalStreet) {
      setAdditionalStreet(localStorageData.additionalStreet);
    }
    if (localStorageData.region) {
      setRegion(localStorageData.region)
    }
  }, [isFirstRender,
    localStorageData.country,
    localStorageData.city,
    localStorageData.zip,
    localStorageData.mainStreet,
    localStorageData.additionalStreet,
    localStorageData.region,
    countries]);

  useEffect(() => {
    setResidenceInner({
      data: {country, city, zip, mainStreet, additionalStreet, region},
      isValid: countryValid && cityValid && zipValid && (mainStreetValid || additionalStreetValid) && regionValid
    });
  }, [country, city, zip, mainStreet, additionalStreet, countryValid, cityValid, zipValid, mainStreetValid, additionalStreetValid, regionValid, region]);

  return (
    <VerificationTile isValid={countryValid && cityValid && zipValid && (mainStreetValid || additionalStreetValid)}>
      <Text fontSize={24} color={"#000"}>{localized(texts.tileTitle, locale)}</Text>
      <div className={"mb-4"}/>
      <FlexWrapper isValid={
        (fieldsStatus && fieldsStatus.country?.valid && fieldsStatus.country?.blocked)
        ||
        (fieldsStatus && fieldsStatus.region?.valid && fieldsStatus.region?.blocked)
      }>
        <InputFlexWrapper>
          <SimpleLabelContainer
            displayAsLabel={setInputStatus(fieldsStatus.country?.valid, fieldsStatus.country?.blocked)}
            label={localized(texts.residenceLabel, locale)}
            id={"country-name"}
          >
            <SimpleAutocomplete
              isValid={countryValid}
              displayAsLabel={setInputStatus(fieldsStatus.country?.valid, fieldsStatus.country?.blocked)}
              onChangeRaw={setCountry}
              errorTooltipText={"Please select valid country"}
              required
              placeholder={localized(texts.residenceLabel, locale)}
              autoComplete={"country-name"}
              id={"country-name"}
              name={"country-name"}
              options={countries.map(ctr => {
                return ({value: ctr.name});
              })}
              value={country}
            />
          </SimpleLabelContainer>
          {fieldsStatus && fieldsStatus.country?.valid && fieldsStatus.country?.blocked && <CheckMark/>}
        </InputFlexWrapper>
        <InputFlexWrapper>
          <SimpleLabelContainer
            displayAsLabel={setInputStatus(fieldsStatus.region?.valid, fieldsStatus.region?.blocked)}
            label={localized(texts.region, locale)}
            id={"region-name"}
          >
            <SimpleInput
              displayAsLabel={setInputStatus(fieldsStatus.region?.valid, fieldsStatus.region?.blocked)}
              onChangeRaw={setRegion}
              required
              inputProps={{
                className: "w-full",
                placeholder: `${localized(texts.region, locale)}`,
                value: region
              }}
              id={"region-name"}
              autoComplete={"shipping region-name"}
            />
          </SimpleLabelContainer>
          {fieldsStatus && fieldsStatus.region?.valid && fieldsStatus.region?.blocked && <CheckMark/>}
        </InputFlexWrapper>
      </FlexWrapper>
      <FlexWrapper isValid={
        (fieldsStatus && fieldsStatus.city?.valid && fieldsStatus.city?.blocked)
        ||
        (fieldsStatus && fieldsStatus.zip?.valid && fieldsStatus.zip?.blocked)
      }>
        <InputFlexWrapper>
          <SimpleLabelContainer
            displayAsLabel={setInputStatus(fieldsStatus.city?.valid, fieldsStatus.city?.blocked)}
            label={localized(texts.cityLabel, locale)}
            id={"city-name"}
          >
            <SimpleInput
              displayAsLabel={setInputStatus(fieldsStatus.city?.valid, fieldsStatus.city?.blocked)}
              onChangeRaw={setCity}
              required
              inputProps={{
                className: "w-full",
                placeholder: `${localized(texts.cityLabel, locale)}`,
                value: city
              }}
              id={"city-name"}
              autoComplete={"shipping city-name"}
            />
          </SimpleLabelContainer>
          {fieldsStatus && fieldsStatus.city?.valid && fieldsStatus.city?.blocked && <CheckMark/>}
        </InputFlexWrapper>
        <InputFlexWrapper>
          <SimpleLabelContainer
            displayAsLabel={setInputStatus(fieldsStatus.zip?.valid, fieldsStatus.zip?.blocked)}
            label={localized(texts.postalCodeLabel, locale)}
            id={"zip-code"}
          >
            <SimpleInput
              onChangeRaw={setZip}
              displayAsLabel={setInputStatus(fieldsStatus.zip?.valid, fieldsStatus.zip?.blocked)}
              required
              inputProps={{
                className: "w-full",
                placeholder: `${localized(texts.postalCodeLabel, locale)}`,
                value: zip
              }}
              id={"zip-code"}
              autoComplete={"shipping zip-code"}
            />
          </SimpleLabelContainer>
          {fieldsStatus && fieldsStatus.zip?.valid && fieldsStatus.zip?.blocked && <CheckMark/>}
        </InputFlexWrapper>
      </FlexWrapper>
      <FlexWrapper isValid={
        (fieldsStatus && fieldsStatus.mainStreet?.valid && fieldsStatus.mainStreet?.blocked)
        ||
        (fieldsStatus && fieldsStatus.additionalStreet?.valid && fieldsStatus.additionalStreet?.blocked)
      }>
        <InputFlexWrapper>
          <SimpleLabelContainer
            displayAsLabel={setInputStatus(fieldsStatus.mainStreet?.valid, fieldsStatus.mainStreet?.blocked)}
            label={localized(texts.mainAddressLabel, locale)}
            id={"shipping address"}
          >
            <SimpleInput
              onChangeRaw={setMainStreet}
              displayAsLabel={setInputStatus(fieldsStatus.mainStreet?.valid, fieldsStatus.mainStreet?.blocked)}
              required
              inputProps={{
                className: "w-full",
                placeholder: `${localized(texts.mainAddressLabel, locale)}`,
                value: mainStreet
              }}
              id={"shipping address"}
              autoComplete={"shipping address"}
            />
          </SimpleLabelContainer>
          {fieldsStatus && fieldsStatus.mainStreet?.valid && fieldsStatus.mainStreet?.blocked && <CheckMark/>}
        </InputFlexWrapper>
        <InputFlexWrapper>
          <SimpleLabelContainer
            displayAsLabel={
              setInputStatus(fieldsStatus.additionalStreet?.valid, fieldsStatus.additionalStreet?.blocked)
              ||
              (fieldsStatus.additionalStreet?.blocked && !localStorageData.additionalStreet)
            }
            label={localized(texts.additionalAddressLabel, locale)}
            id={"shipping address"}
          >
            <SimpleInput
              onChangeRaw={setAdditionalStreet}
              displayAsLabel={
                setInputStatus(fieldsStatus.additionalStreet?.valid, fieldsStatus.additionalStreet?.blocked)
                ||
                (fieldsStatus.additionalStreet?.blocked && !localStorageData.additionalStreet)
              }
              inputProps={{
                className: "w-full",
                placeholder: `${localized(texts.additionalAddressLabel, locale)}`,
                value: additionalStreet
              }}
              id={"shipping address"}
              autoComplete={"shipping address"}
            />
          </SimpleLabelContainer>
          {fieldsStatus && fieldsStatus.additionalStreet?.valid && fieldsStatus.additionalStreet?.blocked && <CheckMark/>}
        </InputFlexWrapper>
      </FlexWrapper>
    </VerificationTile>
  );
};

Residence.defaultProps = ResidenceDefaultProps;

export default Residence;