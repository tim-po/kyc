import React, { useState } from "react";
import "./index.scss";
import { AutoComplete, ConfigProvider, DatePicker, Input } from "antd";
import moment from "moment";
import placeholder from "lodash/fp/placeholder";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

interface SimpleAutocompletePropType {
    // You should declare props like this, delete this if you don't need props
    onlyEmmitOnBlur?: boolean
    errorTooltipText?: string
    defaultValue?: string
    isValid?: boolean
    id?: string
    autoComplete?: string
    onChangeRaw: (newValue: string) => void,
    options: {value: string}[]
    value: string | undefined
    placeholder: string
}

const SimpleAutocompleteDefaultProps = {
    // You should declare default props like this, delete this if you don't need props
    errorTooltipText: "Wrong input",
    defaultValue: "",
    onlyEmmitOnBlur: false,
    inputProps: {},
    isValid: true,
    options: []
};


const SimpleAutocomplete = (props: SimpleAutocompletePropType) => {
    const {
        errorTooltipText,
        id,
        isValid,
        onChangeRaw,
        onlyEmmitOnBlur,
        autoComplete,
        value,
        placeholder,
        options
    } = props;

    const [didUserInput, setDidUserInput] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options)
    const shouldDisplayAsInvalid = isValid || !didUserInput;

    const onChangeInner = (newValue: string) => {
        setDidUserInput(true);
        if (onChangeRaw) {
            onChangeRaw(newValue);
        }
    };

    const filterOptions = (searchValue: string) => {
        const newOptions = [...options].filter(opt => opt.value.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredOptions(newOptions)
    }

    const clear = () => {
        setFilteredOptions(options)
        onChangeRaw("")
    }

    return (
        <div className={"input-container"}>
            <AutoComplete
                options={filteredOptions}
                style={{ width: "100%" }}
                onSearch={filterOptions}
                onChange={onChangeInner}
                value={value}
                onClear={clear}
                placeholder={placeholder}
            >
                <Input className={"SimpleInput"} id={id} autoComplete={autoComplete}/>
            </AutoComplete>
            <div className={`validation-error-tooltip ${shouldDisplayAsInvalid ? "" : "active"}`}>
                {errorTooltipText}
            </div>
        </div>
    );
};

SimpleAutocomplete.defaultProps = SimpleAutocompleteDefaultProps;

export default SimpleAutocomplete;