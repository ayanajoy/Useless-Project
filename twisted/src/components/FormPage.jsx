import React, { useState, useEffect, useRef } from "react";
import "./FormPage.css";

const FormPage = () => {
  const [answers, setAnswers] = useState([null, null, null]);
  const [formCompleted, setFormCompleted] = useState(false);
  
  // Question 1 states
  const [labelsSwapped, setLabelsSwapped] = useState(false);
  
  // Question 2 states
  const sunRef = useRef(null);
  
  // Question 3 states
  const [colorWords, setColorWords] = useState([
    { text: "RED", color: "blue" },
    { text: "BLUE", color: "red" },
    { text: "GREEN", color: "yellow" },
    { text: "YELLOW", color: "green" }
  ]);

  // Question 1 Effects - Label swapping
  useEffect(() => {
    const swapInterval = setInterval(() => {
      setLabelsSwapped(prev => !prev);
    }, 1000);

    return () => clearInterval(swapInterval);
  }, []);

  // Question 3 Effects - Shuffling color words
  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setColorWords(prev => {
        const shuffled = [...prev];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
    }, 1000);

    return () => clearInterval(shuffleInterval);
  }, []);

  const handleAnswer = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
    
    // Check if all questions are answered
    if (newAnswers.every(answer => answer !== null)) {
      setTimeout(() => setFormCompleted(true), 500);
    }
  };

  const resetForm = () => {
    setAnswers([null, null, null]);
    setFormCompleted(false);
    setLabelsSwapped(false);
  };

  const isQuestionAnswered = (index) => answers[index] !== null;
  const allQuestionsAnswered = answers.every(answer => answer !== null);

  if (formCompleted) {
    return (
      <div className="completion-container">
        <div className="completion-card">
          <h1 className="troll-title">
            😂 CONGRATULATIONS! 
          </h1>
          <h2 className="troll-subtitle">
            You just wasted your precious time! 
          </h2>
          <div className="troll-message">
            <p>🎉 YOU'VE BEEN TROLLED! 🎉</p>
            <p>Did you really think this "form" served any purpose?</p>
            <p>You spent all that effort clicking buttons that:</p>
            <ul className="troll-list">
              <li>✨ Swapped labels to confuse you</li>
              <li>✨ Made you find planets based on pixel proximity</li>
              <li>✨ Showed colors that didn't match their words</li>
            </ul>
            <p className="troll-punchline">
              <strong>AND FOR WHAT?</strong><br/>
              Just to see this message telling you it was all pointless! 😈
            </p>
            <div className="time-wasted">
              <p>⏰ <em>Time you'll never get back: Successfully wasted!</em> ⏰</p>
            </div>
          </div>
          <div className="responses-section">
            <h3>Your "Valuable" Responses:</h3>
            <ul className="responses-list">
              <li>Question 1: {answers[0] || "No response"} (Who cares?)</li>
              <li>Question 2: {answers[1] || "No response"} (Completely useless!)</li>
              <li>Question 3: {answers[2] || "No response"} (Absolutely meaningless!)</li>
            </ul>
          </div>
          <button onClick={resetForm} className="troll-button">
            🤡 Want to waste MORE time?
          </button>
          <p className="troll-footer">
            <em>Thank you for being such a good sport! 😄</em>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-header-main">
        <h1 className="form-title-main">
          Welcome to the Madness Form
        </h1>
        <p className="form-subtitle-main">
          Complete all questions below - Where logic goes to die
        </p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(answers.filter(a => a !== null).length / 3) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {answers.filter(a => a !== null).length} of 3 questions answered
        </p>
      </div>

      <div className="questions-container">
        {/* Question 1 Card */}
        <div className={`question-card ${isQuestionAnswered(0) ? 'completed' : ''}`}>
          <div className="question-number">Question 1</div>
          <h2 className="question-title">
            Click the button that says YES!
          </h2>
          <div className="button-group">
            <button
              onClick={() => handleAnswer(0, labelsSwapped ? "NO" : "YES")}
              className="yes-button"
              disabled={isQuestionAnswered(0)}
            >
              {labelsSwapped ? "NO" : "YES"}
            </button>
            <button
              onClick={() => handleAnswer(0, labelsSwapped ? "YES" : "NO")}
              className="no-button"
              disabled={isQuestionAnswered(0)}
            >
              {labelsSwapped ? "YES" : "NO"}
            </button>
          </div>
          <p className="question-hint">
            Labels swap every second. Watch carefully!
          </p>
          {isQuestionAnswered(0) && (
            <div className="answer-display">
              ✓ Your answer: <strong>{answers[0]}</strong>
            </div>
          )}
        </div>

        {/* Question 2 Card */}
        <div className={`question-card ${isQuestionAnswered(1) ? 'completed' : ''}`}>
          <div className="question-number">Question 2</div>
          <h2 className="question-title">
            Which planet is closest to the <span ref={sunRef} className="sun-highlight">Sun</span>?
          </h2>
          <div className="planet-grid">
            {["Mercury", "Venus", "Mars", "Jupiter"].map((planet, index) => (
              <button
                key={planet}
                onClick={() => handleAnswer(1, planet)}
                className={`planet-button planet-${index}`}
                disabled={isQuestionAnswered(1)}
              >
                {planet}
              </button>
            ))}
          </div>
          <p className="question-hint">
            Choose the planet button that is physically closest to the word "Sun" above!
          </p>
          {isQuestionAnswered(1) && (
            <div className="answer-display">
              ✓ Your answer: <strong>{answers[1]}</strong>
            </div>
          )}
        </div>

        {/* Question 3 Card */}
        <div className={`question-card ${isQuestionAnswered(2) ? 'completed' : ''}`}>
          <div className="question-number">Question 3</div>
          <h2 className="question-title">
            Click the word RED
          </h2>
          <div className="color-grid">
            {colorWords.map((word, index) => (
              <button
                key={`${word.text}-${index}`}
                onClick={() => handleAnswer(2, word.text)}
                className="color-button"
                style={{ color: word.color }}
                disabled={isQuestionAnswered(2)}
              >
                {word.text}
              </button>
            ))}
          </div>
          <p className="question-hint">
            Colors shuffle every second. Trust the text, not the color!
          </p>
          {isQuestionAnswered(2) && (
            <div className="answer-display">
              ✓ Your answer: <strong>{answers[2]}</strong>
            </div>
          )}
        </div>
      </div>

      {allQuestionsAnswered && (
        <div className="submit-section">
          <div className="submit-message">
            🎉 All questions answered! Processing your responses...
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPage;