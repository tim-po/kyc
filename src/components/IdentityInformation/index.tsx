import React, { useContext, useEffect, useState } from "react";
import texts from "./localization";
import LocaleContext from "../../Standard/LocaleContext";
import { localized } from "../../Standard/utils/localized";
import "./index.css";
import VerificationTile from "../VerificationTile";
import Text from "../Text";
import styled from "styled-components";
import SimpleValidatedInput from "../../Standard/components/SimpleInput";
import useValidatedState, { validationFuncs } from "../../Standard/hooks/useValidatedState";
import SimpleInput from "../../Standard/components/SimpleInput";

type IdentityInformationPropType = {
    onChangeData: (data: any) => void,
}

const IdentityInformationDefaultProps = {};

const FlexWrapper = styled.div`
  display: flex;
  gap: 14px;
`;

const IdentityInformation = (props: IdentityInformationPropType) => {
    const { locale } = useContext(LocaleContext);
    const { onChangeData } = props;

    const [[firstName, setFirstName], firstNameValid] = useValidatedState<string>("", validationFuncs.hasValue);
    const [[lastName, setLastName], lastNameValid] = useValidatedState<string>("", validationFuncs.hasValue);
    const [middleName, setMiddleName] = useState<string>("");
    const [[nationality, setNationality], nationalityValid] = useValidatedState<string>("", newValue => true);
    const [[bDate, setBDate], bDateValid] = useValidatedState<string>("", newValue => true);


    useEffect(() => {
        onChangeData(
            {
                data: { nationality, firstName, lastName, middleName, bDate },
                isValid: firstNameValid && lastNameValid && nationalityValid && bDateValid
            }
        );
    }, [nationality, firstName, lastName, middleName, bDate, firstNameValid, lastNameValid, nationalityValid, bDateValid]);

    return (
        <VerificationTile isValid={firstNameValid && lastNameValid && nationalityValid && bDateValid}>
            <form autoComplete={"on"}>
                <Text fontSize={24} color={"#000"}>Identity information</Text>
                <div className={"mb-4"} />
                <SimpleInput
                    isValid={nationalityValid}
                    onChangeRaw={setNationality}
                    errorTooltipText={"Nationality is required"}
                    inputProps={{
                        placeholder: "Nationality",
                        type: "text",
                        name: "country-name",
                    }}
                    label={"Nationality"}
                    autoComplete={"country-name"}
                    id="name"
                />
                <FlexWrapper>
                    <SimpleInput
                        isValid={firstNameValid}
                        onChangeRaw={setFirstName}
                        errorTooltipText={"First name is required"}
                        inputProps={{
                            placeholder: "First name",
                            type: "text",
                            name: "firstname",
                        }}
                        label={"First name"}
                        autoComplete={"firstname"}
                        id="name"
                    />
                    <SimpleInput
                        isValid={lastNameValid}
                        onChangeRaw={setLastName}
                        errorTooltipText={"Last name is required"}
                        inputProps={{
                            placeholder: "Last name",
                            type: "text",
                            name: "lastname",
                        }}
                        autoComplete={"lastname"}
                        label={"First name"}
                    />
                </FlexWrapper>
                <FlexWrapper>
                    <SimpleInput
                        onChangeRaw={setMiddleName}
                        inputProps={{
                            placeholder: "Middle name",
                            type: "text",
                            name: "middlename",
                        }}
                        autoComplete={"middlename"}
                        label={"Middle name"}
                    />
                    <SimpleInput
                        isValid={bDateValid}
                        onChangeRaw={setBDate}
                        errorTooltipText={"Please enter a correct email"}
                        inputProps={{
                            type: "date",
                        }}
                        autoComplete={"birthdate"}
                        label={"Birth Date"}
                    />
                </FlexWrapper>
            </form>
        </VerificationTile>
    );
};

IdentityInformation.defaultProps = IdentityInformationDefaultProps;

export default IdentityInformation;