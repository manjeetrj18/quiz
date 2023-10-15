import React, { useState, useEffect } from 'react';
import './styles.css';
import questions from '../questionData/questions.json';

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionClicked, setQuestionClicked] = useState(false);
  const [answerStatus, setAnswerStatus] = useState('');
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    shuffleOptions();
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const percentageComplete =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  function shuffleOptions() {
    const options = [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers,
    ];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
  }

  function handleAnswer(answer) {
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
      setAnswerStatus('Correct!');
    } else {
      setAnswerStatus('Sorry. Please try again.');
    }

    setQuestionClicked(true);
  }

  function handleNextQuestion() {
    setQuestionClicked(false);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerStatus('');
    }
  }

  return (
    <div className="container">
      <div
        className="progress-bar"
        style={{ width: `${percentageComplete}%` }}
      ></div>
      <div className="main-content">
        <h1 className="heading">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h1>
        <h3>{decodeURIComponent(questions[currentQuestionIndex].category)}</h3>

        {currentQuestion.difficulty === 'easy' && (
          <span> &#9733; &#9734; &#9734; &#9734; &#9734;</span>
        )}
        {currentQuestion.difficulty === 'medium' && (
          <span>&#9733; &#9733; &#9734; &#9734; &#9734;</span>
        )}
        {currentQuestion.difficulty === 'hard' && (
          <span>&#9733; &#9733; &#9733; &#9734; &#9734;</span>
        )}
      </div>

      <div className="question">
        <h2 className="question-text">
          {decodeURIComponent(currentQuestion.question)}
        </h2>
        <ul>
          {shuffledOptions.map((answer) => (
            <li key={answer}>
              <button onClick={() => handleAnswer(answer)}>
                {decodeURIComponent(answer)}
              </button>
            </li>
          ))}
        </ul>
        {currentQuestionIndex < totalQuestions - 1 &&
          (questionClicked ? (
            <div>
              <h1>{answerStatus}</h1>
              <button
                className="next-question"
                onClick={handleNextQuestion}
                style={{ height: '40px', width: '120px' }}
              >
                Next Question
              </button>
            </div>
          ) : null)}
      </div>
      {currentQuestionIndex === totalQuestions - 1 && (
        <div className="final-results">
          You scored {score} out of {totalQuestions}!
        </div>
      )}
    </div>
  );
}

export default Quiz;
