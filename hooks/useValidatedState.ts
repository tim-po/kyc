import { useState } from "react";

const testEmailRegex = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
const testAdressRegex = /0x*/g;

export type ControlledValidationState<Type> = {
  data: Type;
  isValid: boolean
}

export const validationFuncs = {
  hasValue: (newValue: string): boolean => newValue.length>0,
  isEmail: (newValue: string): boolean => testEmailRegex.test(newValue),
  validPassword: (newValue: string): boolean => newValue.length>8,
  isAddress: (newValue: string): boolean => testAdressRegex.test(newValue),
  controlled: (newValue: ControlledValidationState<any>): boolean => newValue.isValid
}

export default function useValidatedState<Type>(defaultValue: Type, validationFunction: (newValue: Type) => boolean, defaultValidation?: boolean):
  [[Type, (newState: Type)=>void], boolean]
{
  const [state, setState] = useState<Type>(defaultValue)
  const [isStateValid, setIsStateValid] = useState<boolean>(defaultValidation !== undefined ? defaultValidation : false)

  function setStateOuter(newState: Type ){
    setIsStateValid(validationFunction(newState))
    setState(newState)
  }

  return ([[state, setStateOuter], isStateValid])
}
