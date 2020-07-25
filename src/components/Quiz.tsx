import React, { FC, useState, useEffect, useCallback } from "react"
import styled from 'styled-components'
import { Clock } from "./Clock"

const QuizContainer = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'center',
  padding: '16px',
  fontSize: '62.5%',
})

const ClockWrap = styled.div({
  width: '85vmin',
})

const QuestionWrap = styled.div({
  padding: '16px',
})

const Question = styled.p({
  fontSize: '4rem',
})

const Answer = styled.p({
  fontSize: '3rem',
})

const Button = styled.button({
  fontSize: '4rem',
  marginRight: '4rem',
})

export const Quiz: FC = () => {
  const [showAnswer, setShowAnswer] = useState(false)
  const [time, setTime] = useState(-1)

  const onAnswer = useCallback(() => {
    setShowAnswer(true)
  }, [setShowAnswer])

  const newQuestion = useCallback(() => {
    // 5分単位にする
    setTime(Math.floor(Math.random() * 12 * 12) * 5)
    setShowAnswer(false)
  }, [setShowAnswer, setTime])

  useEffect(() => {
    newQuestion()
  }, [])

  if (time < 0) {
    return null
  }

  return (
    <QuizContainer>
      <ClockWrap>
        <Clock time={time}/>
      </ClockWrap>
      <QuestionWrap>
        <Button disabled={showAnswer} onClick={onAnswer}>こたえ</Button>
        <Button disabled={!showAnswer} onClick={newQuestion}>つぎのもんだい</Button>
        <Question>いまなんじ？</Question>
        { showAnswer ? (<Answer>答え : {Math.floor(time / 60)}時{time % 60}分</Answer>) : null }
      </QuestionWrap>
    </QuizContainer>
  )
}
