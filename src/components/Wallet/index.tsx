import React, { useContext, useEffect, useState } from "react";
import texts from "./localization";
import LocaleContext from "../../Standard/LocaleContext";
import { localized } from "../../Standard/utils/localized";
import VerificationTile from "../VerificationTile";
import Text from "../Text";
import useValidatedState, { validationFuncs } from "../../Standard/hooks/useValidatedState";
import SimpleInput from "../../Standard/components/SimpleInput";

type WalletVerificationPropType = {
    onChangeData: (data: any) => void,
}

const WalletVerificationDefaultProps = {};

const WalletVerification = (props: WalletVerificationPropType) => {
    const { locale } = useContext(LocaleContext);
    const { onChangeData } = props;

    const [[transferAddress, setTransferAddress], transferAddressValid] = useValidatedState<string>("", validationFuncs.isAddress);

    useEffect(() => {
        onChangeData({data: { transferAddress }, isValid: transferAddressValid});
    }, [transferAddress, transferAddressValid]);

    return (
        <VerificationTile isValid={transferAddressValid}>
            <Text fontSize={24} color={"#000"}>Wallet</Text>
            <SimpleInput
                onlyEmmitOnBlur
                isValid={transferAddressValid}
                onChangeRaw={setTransferAddress}
                errorTooltipText={"Please enter a correct address"}
                inputProps={{
                    className: "w-full",
                    placeholder: "Transfer address"
                }}
            />
        </VerificationTile>
    );
};

WalletVerification.defaultProps = WalletVerificationDefaultProps;

export default WalletVerification;