import React, { useState } from "react";
import "./index.scss";
import { ConfigProvider, DatePicker } from "antd";
import moment from "moment";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

interface SimpleDatePickerPropType {
    // You should declare props like this, delete this if you don't need props
    onlyEmmitOnBlur?: boolean
    errorTooltipText?: string
    defaultValue?: string
    isValid?: boolean
    id?: string
    autoComplete?: string
    onChangeRaw?: (newValue: string) => void,
    value: string | undefined
}

const SimpleDatePickerDefaultProps = {
    // You should declare default props like this, delete this if you don't need props
    errorTooltipText: "Wrong input",
    defaultValue: "",
    onlyEmmitOnBlur: false,
    inputProps: {},
    isValid: true
};

const dateFormat = "DD.MM.YYYY";

const SimpleDatePicker = (props: SimpleDatePickerPropType) => {
    const {
        errorTooltipText,
        id,
        isValid,
        onChangeRaw,
        onlyEmmitOnBlur,
        autoComplete,
        value
    } = props;

    const [didUserInput, setDidUserInput] = useState(false);
    const shouldDisplayAsInvalid = isValid || !didUserInput;

    const onChangeInner = (newDate: string) => {
        if (!onlyEmmitOnBlur) {
            setDidUserInput(true);
            if (onChangeRaw) {
                onChangeRaw(newDate);
            }
        }
    };


    return (
        <div className={"input-container"}>
            <DatePicker
                className={"SimpleInput SimpleDatePicker"}
                onChange={(date, dateString) => onChangeInner(dateString)}
                showToday={false}
                value={value ? moment(value, dateFormat) : undefined}
                format={dateFormat}
                autoComplete={autoComplete}
                id={id}
            />
            <div className={`validation-error-tooltip ${shouldDisplayAsInvalid ? "" : "active"}`}>
                {errorTooltipText}
            </div>
        </div>
    );
};

SimpleDatePicker.defaultProps = SimpleDatePickerDefaultProps;

export default SimpleDatePicker;