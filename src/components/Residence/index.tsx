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
import placeholder from "lodash/fp/placeholder";

type ResidencePropType = {
    onChangeData: (data: any) => void,
}

const ResidenceDefaultProps = {};

const FlexWrapper = styled.div`
  display: flex;
  gap: 14px;
`;

const Residence = (props: ResidencePropType) => {
    const { onChangeData } = props;
    const { locale } = useContext(LocaleContext);
    const [[nationality, setNationality], nationalityValid] = useValidatedState<string>("", newValue => true);
    const [[city, setCity], cityValid] = useValidatedState<string>("", validationFuncs.hasValue);
    const [[zip, setZip], zipValid] = useValidatedState<string>("", validationFuncs.hasValue);
    const [[address, setAddress], addressValid] = useValidatedState<string>("", validationFuncs.hasValue);

    const [isFirstRender, setIsFirstRender] = useState(true)

    useEffect(() => {
        if(isFirstRender){
            setIsFirstRender(false)
        }
        onChangeData({data: { nationality, city, zip, address }, isValid: nationalityValid && cityValid && zipValid && addressValid});
    }, [nationality, city, zip, address, nationalityValid, cityValid, zipValid, addressValid]);


    return (
        <VerificationTile isValid={nationalityValid && cityValid && zipValid && addressValid && !isFirstRender}>
            <Text fontSize={24} color={"#000"}>Residence</Text>
            <div className={"mb-4"} />
            <SimpleInput
                isValid={nationalityValid}
                onChangeRaw={setNationality}
                errorTooltipText={"Residence is required"}
                inputProps={{
                    placeholder: "Residence",
                    type: "text",
                    name: "country-name"
                }}
                label={"Residence"}
                autoComplete={"shipping country-name"}
            />
            <FlexWrapper>
                <SimpleInput
                    isValid={cityValid}
                    onChangeRaw={setCity}
                    errorTooltipText={"City is required"}
                    inputProps={{
                        placeholder: "City",
                        type: "text",
                        name: "city-name"
                    }}
                    label={"City"}
                    autoComplete={"shipping city-name"}
                />
                <SimpleInput
                    isValid={zipValid}
                    onChangeRaw={setZip}
                    errorTooltipText={"Postal code is required"}
                    inputProps={{
                        placeholder: "Postal code",
                        type: "text",
                        name: "zip-code",
                    }}
                    label={"Postal code"}
                    autoComplete={"shipping zip-code"}
                />
            </FlexWrapper>
            <SimpleInput
                isValid={addressValid}
                onChangeRaw={setAddress}
                errorTooltipText={"Address is required"}
                inputProps={{
                    placeholder: "Address",
                    type: "text",
                    name: "address"
                }}
                label={"Address"}
                autoComplete={"shipping address"}
            />
        </VerificationTile>
    );
};

Residence.defaultProps = ResidenceDefaultProps;

export default Residence;