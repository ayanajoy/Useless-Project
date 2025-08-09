import React, { useState, useEffect, useRef } from "react";
import "./FormPage.css";

const FormPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
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
    if (currentQuestion === 0) {
      const swapInterval = setInterval(() => {
        setLabelsSwapped(prev => !prev);
      }, 1000);

      return () => clearInterval(swapInterval);
    }
  }, [currentQuestion]);

  // Question 3 Effects - Shuffling color words
  useEffect(() => {
    if (currentQuestion === 2) {
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
    }
  }, [currentQuestion]);

  const nextQuestion = (answer) => {
    // For Question 1, only advance if clicked YES
    if (currentQuestion === 0) {
      if (answer === "YES") {
        setAnswers(prev => [...prev, answer]);
        setCurrentQuestion(1);
        setLabelsSwapped(false);
      }
      // If wrong answer, don't advance - let them try again
      return;
    }
    
    // For Question 2 and 3, advance normally
    setAnswers(prev => [...prev, answer]);
    
    if (currentQuestion === 1) {
      // Move from Question 2 to Question 3
      setCurrentQuestion(2);
    } else if (currentQuestion === 2) {
      // Move from Question 3 to completion
      setFormCompleted(true);
    }
  };

  const resetForm = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setFormCompleted(false);
    setLabelsSwapped(false);
  };

  // Calculate distance between elements for Question 2
  const getDistanceToSun = (buttonElement) => {
    if (!sunRef.current || !buttonElement) return Infinity;
    
    const sunRect = sunRef.current.getBoundingClientRect();
    const buttonRect = buttonElement.getBoundingClientRect();
    
    const sunX = sunRect.left + sunRect.width / 2;
    const sunY = sunRect.top + sunRect.height / 2;
    const buttonX = buttonRect.left + buttonRect.width / 2;
    const buttonY = buttonRect.top + buttonRect.height / 2;
    
    return Math.sqrt(Math.pow(sunX - buttonX, 2) + Math.pow(sunY - buttonY, 2));
  };

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
      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">
            Welcome to the Madness Form
          </h1>
          <p className="form-subtitle">
            Question {currentQuestion + 1} of 3 - Where logic goes to die
          </p>
        </div>

        {/* Question 1: YES/NO with swapping labels */}
        {currentQuestion === 0 && (
          <div className="question-container">
            <h2 className="question-title">
              Click the button that says YES!
            </h2>
            <div className="button-group">
              <button
                onClick={() => nextQuestion(labelsSwapped ? "NO" : "YES")}
                className="yes-button"
              >
                {labelsSwapped ? "NO" : "YES"}
              </button>
              <button
                onClick={() => nextQuestion(labelsSwapped ? "YES" : "NO")}
                className="no-button"
              >
                {labelsSwapped ? "YES" : "NO"}
              </button>
            </div>
            
          </div>
        )}

        {/* Question 2: Planet closest to the word "Sun" */}
        {currentQuestion === 1 && (
          <div className="question-container">
            <h2 className="question-title">
              Which planet is closest to the <span ref={sunRef} className="sun-highlight">Sun</span>?
            </h2>
            <div className="planet-grid">
              {["Jupiter", "Venus", "Mercury", "Mars"].map((planet, index) => (
                <button
                  key={planet}
                  onClick={() => nextQuestion(planet)}
                  className={`planet-button planet-${index}`}
                >
                  {planet}
                </button>
              ))}
            </div>
            
          </div>
        )}

        {/* Question 3: Color confusion */}
        {currentQuestion === 2 && (
          <div className="question-container">
            <h2 className="question-title">
              Click the word RED
            </h2>
            <div className="color-grid">
              {colorWords.map((word, index) => (
                <button
                  key={`${word.text}-${index}`}
                  onClick={() => nextQuestion(word.text)}
                  className="color-button"
                  style={{ color: word.color }}
                >
                  {word.text}
                </button>
              ))}
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPage;