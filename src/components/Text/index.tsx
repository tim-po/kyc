import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import './index.css'
import styled, {css} from "styled-components";

type TextPropType = {
  fontWeight: number
  fontSize: number
  marginBottom?: number
  color?: string
  children: string | React.ReactNode
}

const TextDefaultProps = {
  fontWeight: 700,
  fontSize: 20,
  marginBottom: 0,
  color: '#fff',
}

const CustomText = styled.div<TextPropType>`
  font-weight: ${p => p.fontWeight};
  font-size: ${p => p.fontSize}px;

  ${({marginBottom, color}) => {
    return css`
      margin-bottom: ${marginBottom}px;
      color: ${color};
    `;
  }};
`

const Text = (props: TextPropType) => {
  const {locale} = useContext(LocaleContext)

  const {fontSize, color, fontWeight, marginBottom, children} = props

  return (
    <CustomText
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      marginBottom={marginBottom}
    >
      {children}
    </CustomText>
  )
};

Text.defaultProps = TextDefaultProps

export default Text