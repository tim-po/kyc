import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "../../../Standard/LocaleContext";
import {localized} from "../../../Standard/utils/localized";
import "./index.css";
import VerificationTile from "../../VerificationTile";
import Text from "../../Text";
import styled from "styled-components";
import SimpleValidatedInput from "../../../Standard/components/SimpleInput";
import useValidatedState, {validationFuncs} from "../../../Standard/hooks/useValidatedState";
import SimpleInput from "../../../Standard/components/SimpleInput";
import placeholder from "lodash/fp/placeholder";
import {Country} from "../../../types";
import {AutoComplete} from "antd";
import SimpleLabelContainer from "../../../Standard/components/SimpleLabelContainer";
import SimpleAutocomplete from "../../../Standard/components/SimpleAutocomplete";

type ResidencePropType = {
  onChangeData: (data: any) => void,
  countries: Country[]
}

const ResidenceDefaultProps = {};

const FlexWrapper = styled.div`
  display: flex;
  gap: 14px;
`;

const Residence = (props: ResidencePropType) => {
  const {onChangeData, countries} = props;
  const {locale} = useContext(LocaleContext);

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [localStorageData, setLocalStorageData] = useState({
    address: "",
    city: "",
    nationality: "",
    zip: ""
  });

  // const [[nationality, setNationality], nationalityValid] = useValidatedState<Country | undefined>(undefined, newValue => newValue !== undefined && countries.includes(newValue));
  const [[nationality, setNationality], nationalityValid] = useValidatedState<string>("", newValue => countries.map(ctr => ctr.name).includes(newValue));
  const [[city, setCity], cityValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [[zip, setZip], zipValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [[address, setAddress], addressValid] = useValidatedState<string>("", validationFuncs.hasValue);

  function setWalletInner(residence: { data: {}, isValid: boolean }) {
    if (!isFirstRender) {
      localStorage.setItem("residence", JSON.stringify(residence.data));
      onChangeData(residence);
    } else {
      setIsFirstRender(false);
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {

    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [nationality])

  useEffect(() => {
    const residence = localStorage.getItem("residence");
    const parsed = JSON.parse(`${residence}`)
    if (parsed) {
      setLocalStorageData(parsed);
    }
    setNationality(localStorageData.nationality);
    setCity(localStorageData.city);
    setZip(localStorageData.zip);
    setAddress(localStorageData.address);
  }, [isFirstRender, localStorageData.nationality, localStorageData.city, localStorageData.zip, localStorageData.address]);

  useEffect(() => {
    setWalletInner({
      data: {nationality, city, zip, address},
      isValid: nationalityValid && cityValid && zipValid && addressValid
    });
  }, [nationality, city, zip, address, nationalityValid, cityValid, zipValid, addressValid]);

  return (
    <VerificationTile isValid={nationalityValid && cityValid && zipValid && addressValid && !isFirstRender}>
      <Text fontSize={24} color={"#000"}>Residence</Text>
      <div className={"mb-4"}/>
      <SimpleLabelContainer label={"Residence"} id={"shipping country-name"}>
        <SimpleAutocomplete
          isValid={nationalityValid}
          onChangeRaw={setNationality}
          errorTooltipText={"Residence is required"}
          placeholder={"Residence"}
          autoComplete={"shipping country-name"}
          id={"shipping country-name"}
          options={countries.map(ctr => {
            return ({value: ctr.name})
          })}
          value={nationality}
        />
      </SimpleLabelContainer>
      <FlexWrapper>
        <SimpleLabelContainer label={"City"} id={"city-name"}>
          <SimpleInput
            isValid={cityValid}
            onChangeRaw={setCity}
            errorTooltipText={"City is required"}
            inputProps={{
              placeholder: "City",
              value: city
            }}
            id={"city-name"}
            autoComplete={"shipping city-name"}
          />
        </SimpleLabelContainer>
        <SimpleLabelContainer label={"Postal code"} id={"zip-code"}>
          <SimpleInput
            isValid={zipValid}
            onChangeRaw={setZip}
            errorTooltipText={"Postal code is required"}
            inputProps={{
              placeholder: "Postal code",
              value: zip
            }}
            id={"zip-code"}
            autoComplete={"shipping zip-code"}
          />
        </SimpleLabelContainer>
      </FlexWrapper>
      <SimpleLabelContainer label={"Address"} id={"shipping address"}>
        <SimpleInput
          isValid={addressValid}
          onChangeRaw={setAddress}
          errorTooltipText={"Address is required"}
          inputProps={{
            placeholder: "Address",
            value: address
          }}
          id={"shipping address"}
          autoComplete={"shipping address"}
        />
      </SimpleLabelContainer>
    </VerificationTile>
  );
};

Residence.defaultProps = ResidenceDefaultProps;

export default Residence;