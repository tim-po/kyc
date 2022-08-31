import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "../../../Standard/LocaleContext";
import {localized} from "../../../Standard/utils/localized";
import "./index.css";
import VerificationTile from "../../VerificationTile";
import Text from "../../Text";
import styled from "styled-components";
import SimpleValidatedInput from "../../../Standard/components/SimpleInput";
import useValidatedState, {validationFuncs, validationFuncsFactory} from "../../../Standard/hooks/useValidatedState";
import SimpleInput from "../../../Standard/components/SimpleInput";
import placeholder from "lodash/fp/placeholder";
import {Country, FieldStatus} from "../../../types";
import {AutoComplete} from "antd";
import SimpleLabelContainer from "../../../Standard/components/SimpleLabelContainer";
import SimpleAutocomplete from "../../../Standard/components/SimpleAutocomplete";
import {setInputStatus} from "../../../utils/common";

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

const FlexWrapper = styled.div`
  display: flex;
  gap: 14px;
`;

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
  const [[additionalStreet, setAdditionalStreet], additionalStreetValid] = useValidatedState<string>("", validationFuncs.hasValue);
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
      <FlexWrapper>
        <SimpleLabelContainer
          displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.country?.valid, fieldsStatus.country?.blocked)}
          label={localized(texts.residenceLabel, locale)}
          id={"country-name"}
        >
          <SimpleAutocomplete
            isValid={countryValid}
            displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.country?.valid, fieldsStatus.country?.blocked)}
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
        <SimpleLabelContainer
          displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.region?.valid, fieldsStatus.region?.blocked)}
          label={localized(texts.region, locale)}
          id={"region-name"}
        >
          <SimpleInput
            displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.region?.valid, fieldsStatus.region?.blocked)}
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
      </FlexWrapper>
      <FlexWrapper>
        <SimpleLabelContainer
          displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.city?.valid, fieldsStatus.city?.blocked)}
          label={localized(texts.cityLabel, locale)}
          id={"city-name"}
        >
          <SimpleInput
            displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.city?.valid, fieldsStatus.city?.blocked)}
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
        <SimpleLabelContainer
          displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.zip?.valid, fieldsStatus.zip?.blocked)}
          label={localized(texts.postalCodeLabel, locale)}
          id={"zip-code"}
        >
          <SimpleInput
            onChangeRaw={setZip}
            displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.zip?.valid, fieldsStatus.zip?.blocked)}
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
      </FlexWrapper>
      <FlexWrapper>
        <SimpleLabelContainer
          displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.mainStreet?.valid, fieldsStatus.mainStreet?.blocked)}
          label={localized(texts.mainAddressLabel, locale)}
          id={"shipping address"}
        >
          <SimpleInput
            onChangeRaw={setMainStreet}
            displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.mainStreet?.valid, fieldsStatus.mainStreet?.blocked)}
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
        <SimpleLabelContainer
          displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.additionalStreet?.valid, fieldsStatus.additionalStreet?.blocked)}
          label={localized(texts.additionalAddressLabel, locale)}
          id={"shipping address"}
        >
          <SimpleInput
            onChangeRaw={setAdditionalStreet}
            displayAsLabel={setInputStatus(isSubmitted, fieldsStatus.additionalStreet?.valid, fieldsStatus.additionalStreet?.blocked)}
            required
            inputProps={{
              className: "w-full",
              placeholder: `${localized(texts.additionalAddressLabel, locale)}`,
              value: additionalStreet
            }}
            id={"shipping address"}
            autoComplete={"shipping address"}
          />
        </SimpleLabelContainer>
      </FlexWrapper>
    </VerificationTile>
  );
};

Residence.defaultProps = ResidenceDefaultProps;

export default Residence;