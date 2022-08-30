import React, {useContext, ReactNode, useState} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled from 'styled-components';

interface StripProps {
  isValid: boolean
}

type VerificationTilePropType = {
  children: ReactNode,
  isValid: boolean
}

const VerificationTileDefaultProps = {}

const Tile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  padding-left: 52px;
  padding-right: 52px;
  padding-top: 22px;
  padding-bottom: 40px;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 50px;
  overflow: hidden;
`

const Strip = styled.div<StripProps>`
  width: 12px;
  height: 100%;
  background: ${p => p.isValid ? '#33CC66' : '#D2D5DA'};
  position: absolute;
  left: 0;
  top: 0;
  transition: background 0.3s ease;
`

const VerificationTile = (props: VerificationTilePropType) => {
  const {locale} = useContext(LocaleContext)
  const {children, isValid} = props

  return (
    <Tile>
      <Strip isValid={isValid}/>
      {children}
    </Tile>
  )
};

VerificationTile.defaultProps = VerificationTileDefaultProps

export default VerificationTile