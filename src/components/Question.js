import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  
  // add useEffect code
  //Set a timer using setTimeout that decrements the timeRemaining state by 1 every second
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1)
    }, 1000)
    return () => clearTimeout(timer) //Return a cleanup function that clears the timer using clearTimeout to avoid memory leaks 
  }, [timeRemaining])
  
  // Check if timeRemaining has reached 0, if true: reset timeRemaining to 10 and call onAnswered with a value of false
  useEffect (() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10)
      onAnswered(false)
    }
  }, [timeRemaining, onAnswered])

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
