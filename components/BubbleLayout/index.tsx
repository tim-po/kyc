import React from "react";
import './index.css'
import styled, {css} from 'styled-components'

interface BubbleProps {
  gradient: string
  width: number
  height: number
  top?: number
  right?: number
  left?: number
  bottom?: number
  zIndex?: number
}

type BubbleLayoutPropType = {}

const BubbleLayoutDefaultProps = {}

const BubbleLayoutContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 800px;
`

const Bubble = styled.div<BubbleProps>`
  position: absolute;
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  border-radius: 50%;
  background: ${p => p.gradient};

  ${({top, right, bottom, left, zIndex}) => {
    return css`
      left: ${left}px;
      top: ${top}px;
      right: ${right}px;
      bottom: ${bottom}px;
      z-index: ${zIndex};
    `;
  }};
`

const BubbleLayout = (props: BubbleLayoutPropType) => {
  return (
    <BubbleLayoutContainer>
      <Bubble
        gradient={'radial-gradient(97.66% 97.66% at 104.7% -12.27%, #5AA8D5 0%, #1A1B34 100%)'}
        width={155}
        height={155}
        right={-10}
        top={300}
        zIndex={2}
      />
      <Bubble
        gradient={'radial-gradient(104.24% 104.24% at 107.56% -16.05%, rgba(205, 255, 222, 0.8) 31.77%, rgba(51, 204, 102, 0.8) 64.06%, rgba(29, 107, 112, 0.8) 100%)'}
        width={340}
        height={340}
        right={-170}
        top={10}
        zIndex={1}
      />
      <Bubble
        gradient={'radial-gradient(97.66% 97.66% at 104.7% -12.27%, #5AA8D5 0%, #1A1B34 100%)'}
        width={540}
        height={540}
        left={-127}
        bottom={-300}
      />
      <Bubble
        gradient={'radial-gradient(104.24% 104.24% at 107.56% -16.05%, rgba(205, 255, 222, 0.8) 31.77%, rgba(51, 204, 102, 0.8) 64.06%, rgba(29, 107, 112, 0.8) 100%)'}
        width={185}
        height={185}
        left={-90}
        bottom={250}
        zIndex={1}
      />
    </BubbleLayoutContainer>
  )
};

BubbleLayout.defaultProps = BubbleLayoutDefaultProps

export default BubbleLayout