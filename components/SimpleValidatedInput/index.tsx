import React, {useState} from "react";
import './index.css'

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type SimpleValidatedInputPropType = {
    // You should declare props like this, delete this if you don't need props
    shouldValidateOnInput?: boolean
    errorTooltipText?: string
    hasDefaultValueButton?: boolean
    defaultValueButtonText?: string
    defaultValue?: string,
    validationFunction?: (text: string) => boolean
    onValidationChange: (isValid: boolean) => void
    isForceValid?: boolean
    id?: string
    //restProps
    [x:string]: any
}


const SimpleValidatedInputDefaultProps = {
    // You should declare default props like this, delete this if you don't need props
    errorTooltipText: 'Wrong input',
    hasDefaultValueButton: false,
    defaultValueButtonText: 'Default',
    defaultValue: '',
    shouldValidateOnInput: false,
    onValidationChange: ()=>{},
    isForceValid: undefined,
    validationFunction: ()=>{return true},
}

const SimpleValidatedInput = (props: SimpleValidatedInputPropType) => {
    const {
        placeholder,
        type,
        className,
        shouldValidateOnInput,
        onValidationChange,
        errorTooltipText,
        validationFunction,
        onBlur,
        onChange,
        onFocus,
        hasDefaultValueButton,
        defaultValueButtonText,
        defaultValue,
        autocomplete,
        isForceValid,
        label,
        id,
    } = props

    const [isValid, setIsValid] = useState(true)
    const inputRef = React.createRef<HTMLInputElement>()

    const onChangeInner = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value)
        }
        if(validationFunction && validationFunction(e.target.value)){
            setIsValid(true)
            onValidationChange(true)
        }
        if(shouldValidateOnInput && validationFunction && !validationFunction(e.target.value)){
            setIsValid(false)
            onValidationChange(false)
        }
    }

    const onFocusInner = (e: React.FocusEvent) => {
        if (onFocus) {
            onFocus(e)
        }

    }

    const onBlurInner = (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(e)
        }
        if(validationFunction && !validationFunction(e.target.value)){
            setIsValid(false)
            onValidationChange(false)
        }
    }

    const setDefaultValue = () => {
        if(inputRef.current && defaultValue){
            inputRef.current.value = defaultValue
            // @ts-ignore
            onChangeInner({target: {value: defaultValue}})
            // @ts-ignore
            onBlurInner({target: {value: defaultValue}})
            setIsValid(true)
            onValidationChange(true)
        }
    }

    return (
        <section className={`relative w-full simple-validated-input-form`}>
            {label &&
                <label htmlFor={id} className={'simple-validated-input-label'}>
                    {label}
                </label>
            }
            <div className={'input-container'}>
                <input
                    id={id}
                    ref={inputRef}
                    onChange={onChangeInner}
                    onFocus={onFocusInner}
                    onBlur={onBlurInner}
                    className={`SimpleValidatedInput ${(isForceValid !== undefined ? isForceValid : isValid) ? '': 'not-valid'} ${className || ''}`}
                    placeholder={placeholder}
                    type={type}
                    autoComplete={autocomplete}
                />
                {hasDefaultValueButton &&
                  <button type={'button'} className={'default-value-button'} onClick={setDefaultValue}>
                      {defaultValueButtonText}
                  </button>
                }
                <div className={`validation-error-tooltip ${(isForceValid !== undefined ? isForceValid : isValid)? '': 'active'}`}>
                    {errorTooltipText}
                </div>
            </div>
        </section>
    )
};

SimpleValidatedInput.defaultProps = SimpleValidatedInputDefaultProps

export default SimpleValidatedInput