import React, { useContext } from "react";
import texts from "./localization";
import LocaleContext from "../../Standard/LocaleContext";
import { localized } from "../../Standard/utils/localized";
import "./index.css";
import VerificationTile from "../VerificationTile";
import Text from "../Text";
import styled from "styled-components";
import SimpleValidatedInput from "../../Standard/components/SimpleValidatedInput";
import useValidatedState from "../../Standard/hooks/useValidatedState";

type IdentityInformationPropType = {}

const IdentityInformationDefaultProps = {};

const FlexWrapper = styled.div`
  display: flex;
  gap: 14px;
`;

const IdentityInformation = (props: IdentityInformationPropType) => {
  const { locale } = useContext(LocaleContext);

  const [[firstName, setFirstName], [firstNameValid, setFirstNameValid]] = useValidatedState<string>("");
  const [[lastName, setLastName], [lastNameValid, setLastNameValid]] = useValidatedState<string>("");
  const [[middleName, setMiddleName], [middleNameValid, setMiddleNameValid]] = useValidatedState<string>("");
  const [[nationality, setNationality], [nationalityValid, setNationalityValid]] = useValidatedState<string>("");
  const [[bDate, setBDate], [bDateValid, setBDateValid]] = useValidatedState<string>("");



  return (
    <VerificationTile>
      <form autoComplete={'on'}>
        <Text fontSize={24} color={"#000"}>Identity information</Text>
        <div className={'mb-4'}/>
        <SimpleValidatedInput
          onValidationChange={setNationalityValid}
          onChange={setNationality}
          validationFunction={(text) => text.length > 0}
          errorTooltipText={"Nationality is required"}
          placeholder="Nationality"
          type={"text"}
          label={"Nationality"}
          name={"country-name"}
          autocomplete={"country-name"}
          id="name"
        />
        <FlexWrapper>
          <SimpleValidatedInput
            onValidationChange={setFirstNameValid}
            onChange={setFirstName}
            validationFunction={(text) => text.length > 0}
            errorTooltipText={"First name is required"}
            placeholder="First name"
            type={"text"}
            label={"First name"}
            name={"firstname"}
            autocomplete={"firstname"}
            id="name"
          />
          <SimpleValidatedInput
            onValidationChange={setLastNameValid}
            onChange={setLastName}
            validationFunction={(text) => text.length > 0}
            errorTooltipText={"Last name is required"}
            placeholder="Last name"
            type={"text"}
            autocomplete={"lastname"}
            label={"First name"}
          />
        </FlexWrapper>
        <FlexWrapper>
          <SimpleValidatedInput
            onValidationChange={setMiddleNameValid}
            onChange={setMiddleName}
            validationFunction={(text) => true}
            errorTooltipText={"Please enter a correct email"}
            placeholder="Middle name"
            type={"text"}
            autocomplete={"middlename"}
            label={"Middle name"}
          />
          <SimpleValidatedInput
            onValidationChange={setBDateValid}
            onChange={setBDate}
            validationFunction={(text) => true}
            errorTooltipText={"Please enter a correct email"}
            type={"date"}
            autocomplete={"birthdate"}
            label={"Birth Date"}
          />
        </FlexWrapper>
      </form>
    </VerificationTile>
  );
};

IdentityInformation.defaultProps = IdentityInformationDefaultProps;

export default IdentityInformation;