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
import {DatePicker} from "antd";
import SimpleDatePicker from "../../../Standard/components/SimpleDatePicker";
import SimpleLabelContainer from "../../../Standard/components/SimpleLabelContainer";

type IdentityInformationPropType = {
  onChangeData: (data: any) => void,
}

const IdentityInformationDefaultProps = {};

const FlexWrapper = styled.div`
  display: flex;
  gap: 14px;
`;

const IdentityInformation = (props: IdentityInformationPropType) => {
  const {locale} = useContext(LocaleContext);
  const {onChangeData} = props;

  const [isFirstRender, setIsFirstRender] = useState(true)
  const [localStorageData, setLocalStorageData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    nationality: "",
  })

  const [[firstName, setFirstName], firstNameValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [[lastName, setLastName], lastNameValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [middleName, setMiddleName] = useState<string>("");
  const [[nationality, setNationality], nationalityValid] = useValidatedState<string>("", newValue => true);
  const [[bDate, setBDate], bDateValid] = useValidatedState<string | undefined>(undefined, newValue => true);

  useEffect(() => {
    if (!isFirstRender) {
      localStorage.setItem('identityInformation', JSON.stringify(localStorageData))
    }
  }, [isFirstRender])

  function setWalletInner(identityInformation: { data: {}, isValid: boolean }) {
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
    setFirstName(localStorageData.firstName)
    setLastName(localStorageData.lastName)
    setMiddleName(localStorageData.middleName)
    setNationality(localStorageData.nationality)
  }, [isFirstRender, localStorageData.firstName, localStorageData.lastName, localStorageData.middleName, localStorageData.nationality])

  useEffect(() => {
    setWalletInner(
      {
        data: {nationality, firstName, lastName, middleName, bDate},
        isValid: firstNameValid && lastNameValid && nationalityValid && bDateValid
      }
    );
  }, [nationality, firstName, lastName, middleName, bDate, firstNameValid, lastNameValid, nationalityValid, bDateValid]);

  return (
    <VerificationTile isValid={firstNameValid && lastNameValid && nationalityValid && bDateValid}>
      <form autoComplete={"on"}>
        <Text fontSize={24} color={"#000"}>Identity information</Text>
        <div className={"mb-4"}/>
        <SimpleLabelContainer label={"Nationality"} id="nationality">
          <SimpleInput
            isValid={nationalityValid}
            onChangeRaw={setNationality}
            errorTooltipText={"Nationality is required"}
            inputProps={{
              placeholder: "Nationality",
              value: nationality
            }}
            autoComplete={"country-name"}
            id="nationality"
          />
        </SimpleLabelContainer>
        <FlexWrapper>
          <SimpleLabelContainer
            label={"First name"}
            id="firstname"
          >
            <SimpleInput
              isValid={firstNameValid}
              onChangeRaw={setFirstName}
              errorTooltipText={"First name is required"}
              inputProps={{
                placeholder: "First name",
                value: firstName
              }}
              autoComplete={"firstname"}
              id="firstname"
            />
          </SimpleLabelContainer>
          <SimpleLabelContainer label={"Last name"} id={"lastname"}>
            <SimpleInput
              isValid={lastNameValid}
              onChangeRaw={setLastName}
              errorTooltipText={"Last name is required"}
              inputProps={{
                placeholder: "Last name",
                value: lastName
              }}
              autoComplete={"lastname"}
            />
          </SimpleLabelContainer>
        </FlexWrapper>
        <FlexWrapper>
          <SimpleLabelContainer label={"Middle name"} id={"middlename"}>
            <SimpleInput
              onChangeRaw={setMiddleName}
              inputProps={{
                placeholder: "Middle name",
                value: middleName
              }}
              autoComplete={"middlename"}
              id={"middlename"}
            />
          </SimpleLabelContainer>
          <SimpleLabelContainer label={"Birth Date"} id={"birthdate"}>
            <SimpleDatePicker
              value={bDate}
              onChangeRaw={setBDate}
              isValid={bDateValid}
              errorTooltipText={"Please enter a date in the past"}
              autoComplete={"birthdate"}
            />
          </SimpleLabelContainer>
        </FlexWrapper>
      </form>
    </VerificationTile>
  );
};

IdentityInformation.defaultProps = IdentityInformationDefaultProps;

export default IdentityInformation;