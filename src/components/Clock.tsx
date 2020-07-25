import React, { FC } from 'react'
import styled from 'styled-components'

const Circle = styled.div({
  position: 'relative',
  border: '3px solid black',
  borderRadius: '50%',
  width: '100%',
  paddingTop: '100%',
})

const CircleWrap = styled.div({
  width: '100%',
})

const GradationSize = {
  big: {
    width: '20px',
    height: '60px',
  },
  small: {
    width: '5px',
    height: '10px',
  }
}

interface GradationWrapProps {
  angle: string,
  big: boolean
}

const GradationWrap = styled.div({
  position: 'absolute',
  top: '0',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}, (props: GradationWrapProps) => ({
  transform: `rotate(${props.angle})`,
  left: `calc(50% - (${props.big ? GradationSize.big.width : GradationSize.small.width})/ 2)`,
}))

interface GradationItemProps {
  big: boolean
}

const GradationItem = styled.div({
  backgroundColor: 'black',
}, (props: GradationItemProps) => ({
  ...(props.big ? GradationSize.big : GradationSize.small),
}))

interface GradationProps {
  n: number
  big: boolean
}

const Gradation: FC<GradationProps> = ({ n, big }: GradationProps) => {
  const angle = `${ n / 60 * 360}deg`
  return (
    <GradationWrap angle={angle} big={big}>
      <GradationItem big={big}/>
    </GradationWrap>
  )
}

interface DigitWrapProps {
  angle: string
}

const DigitWrap = styled.div({
  position: 'absolute',
  top: GradationSize.big.height,
  bottom: GradationSize.big.height,
  width: '100px',
  left: 'calc(50% - 50px)',
}, ({ angle }: DigitWrapProps) => ({
  transform: `rotate(${angle})`,
}))

interface DigitItemProps {
  angle: string
}

const DigitItem = styled.div({
  fontSize: '4rem',
  fontWeight: 'bold',
  width: '100%',
  textAlign: 'center',
}, ({ angle }: DigitItemProps) => ({
  transform: `rotate(-${angle})`,
}))

interface DigitProps {
  n: number
}

const Digit: FC<DigitProps> = ({ n }: DigitProps) => {
  const angle = `${n / 12 * 360}deg`
  const num = n % 12 === 0 ? 12 : n % 12

  return (
    <DigitWrap angle={angle}>
      <DigitItem angle={angle}>{num}</DigitItem>
    </DigitWrap>
  )
}

interface NeedleWrapProps {
  angle: string,
}

const NeedleWrap = styled.div({
  position: 'absolute',
  top: '0',
  height: '100%',
  width: '10px',
}, (props: NeedleWrapProps) => ({
  transform: `rotate(${props.angle})`,
  left: `calc(50% - 5px)`,
}))

interface NeedleItemProps {
  length: string
  color?: string
}

const NeedleItem = styled.div({
  width: '100%',
}, (props: NeedleItemProps) => ({
  height: props.length,
  backgroundColor: props.color || 'transparent',
}))

interface NeedleProps {
  n: number
  long?: boolean
}

const Needle: FC<NeedleProps> = ({ n, long }: NeedleProps) => {
  const angle = `${n * 6}deg`
  return (
    <NeedleWrap angle={angle}>
      <NeedleItem length={long ? "5%" : "20%" }/>
      <NeedleItem length={long ? "48%" : "33%" } color="rgba(0,0,0,0.7)"/>
    </NeedleWrap>
  )
}

export interface ClockProps {
  time: number
}

export const Clock: FC<ClockProps> = ({ time }: ClockProps) => {
  return (
    <CircleWrap>
      <Circle>
        {(new Array(12)).fill(0).map((_, i) => (<Digit n={i}/>))}
        {(new Array(60)).fill(0).map((_, i) => (<Gradation n={i} big={i % 5 === 0}/>))}
        <Needle long n={time % 60}/>
        <Needle n={time / 12}/>
      </Circle>
    </CircleWrap>
  )
}
