import { useState } from "react";

export default function useValidatedState<Type>(defaultValue: Type, defaultValidation?: boolean):
  [[Type, (newState: Type)=>void], [boolean, (newIsStateValid: boolean)=>void]]
{
  const [state, setState] = useState<Type>(defaultValue)
  const [isStateValid, setIsStateValid] = useState<boolean>(defaultValidation ? defaultValidation : false)

  function setStateOuter(newState: Type){
    setState(newState)
  }
  function setIsStateValidOuter(newIsStateValid: boolean){
    setIsStateValid(newIsStateValid)
  }

  return ([[state, setStateOuter], [isStateValid, setIsStateValidOuter]])
}
