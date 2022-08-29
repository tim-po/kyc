import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import './index.css'
import styled from "styled-components";
import {useCookies} from "react-cookie";

type LogoutButtonPropType = {}

const LogoutButtonDefaultProps = {}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  padding: 10px;
  width: 100px;
  background: #33CC66;
  border-radius: 10px;
  height: 46px;
  font-size: 14px;
  cursor: pointer;

  &:focus,
  &:active {
    outline: none;
  }
`;

const LogoutButton = (props: LogoutButtonPropType) => {
  const {locale} = useContext(LocaleContext)
  const [cookies, setCookies] = useCookies(["auth"])

  return <Button onClick={() => setCookies("auth", "")}>{localized(texts.logoutButton, locale)}</Button>
};

LogoutButton.defaultProps = LogoutButtonDefaultProps

export default LogoutButton