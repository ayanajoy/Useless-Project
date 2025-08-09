import React, { useState, useEffect } from "react";
import "./FormPage.css";

const FormPage = () => {
  // State for answers, completion, and feedback
  const [answers, setAnswers] = useState([null, null, null]);
  const [formCompleted, setFormCompleted] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([false, false, false]);

  // State for Question 1 animation
  const [labelsSwapped, setLabelsSwapped] = useState(false);

  // State for Question 3 animation
  const [colorWords, setColorWords] = useState([
    { text: "DER", color: "blue" },
    { text: "EULB", color: "red" },
    { text: "NEERG", color: "yellow" },
    { text: "WOLLEY", color: "green" },
  ]);

  const mirrorStyle = {
  transform: 'scaleX(-1)', // This mirrors/flips the text horizontally
  display: 'inline-block' // Required for transform to work on inline elements
};

  // State for the moving submit button
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitPosition, setSubmitPosition] = useState({ top: "40%", left: "45%" });
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const MAX_ATTEMPTS = 7;

  // Correct answers definition
  const CORRECT_ANSWERS = ["SEY", "SUNEV", "DER"];

  // --- Effects ---

  // Effect for Question 1: Stops swapping labels when the answer is correct
  useEffect(() => {
    if (answers[0] === CORRECT_ANSWERS[0]) return; // Stop animation on correct answer
    const swapInterval = setInterval(() => setLabelsSwapped((prev) => !prev), 1000);
    return () => clearInterval(swapInterval);
  }, [answers]);

  // Effect for Question 3: Stops shuffling colors when the answer is correct
  useEffect(() => {
    if (answers[2] === CORRECT_ANSWERS[2]) return; // Stop animation on correct answer
    const shuffleInterval = setInterval(() => {
      setColorWords((prev) => {
        const shuffled = [...prev];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
    }, 1000);
    return () => clearInterval(shuffleInterval);
  }, [answers]);

  // --- Handlers ---

  const handleAnswer = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);

    // Check for correctness and update feedback state
    const isCorrect = answer === CORRECT_ANSWERS[questionIndex];
    const updatedWrongAnswers = [...wrongAnswers];
    updatedWrongAnswers[questionIndex] = !isCorrect;
    setWrongAnswers(updatedWrongAnswers);

    // Check if all answers are now correct to show/hide the submit button
    const allCorrect = newAnswers.every((ans, i) => ans === CORRECT_ANSWERS[i]);

    if (allCorrect) {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
  };

  const handleButtonHover = () => {
    if (submitAttempts < MAX_ATTEMPTS) {
      setSubmitAttempts((prev) => prev + 1);
      const newTop = Math.random() * 80 + 10; // %
      const newLeft = Math.random() * 80 + 10; // %
      setSubmitPosition({ top: `${newTop}%`, left: `${newLeft}%` });
    }
  };

  const handleSubmit = () => {
    setFormCompleted(true);
  };

  const resetForm = () => {
    setAnswers([null, null, null]);
    setFormCompleted(false);
    setLabelsSwapped(false);
    setWrongAnswers([false, false, false]);
    setShowSubmit(false);
    setSubmitAttempts(0);
    setSubmitPosition({ top: "40%", left: "45%" });
  };

  const isQuestionAnswered = (index) => answers[index] !== null;

  // --- Render Logic ---

  if (formCompleted) {
    return (
      <div className="completion-container">
        <div className="completion-card">
          <h1 className="troll-title" >😂 CONGRATULATIONS!</h1>
          <h2 className="troll-subtitle" >You just wasted your precious time!</h2>
          <div className="troll-message" >

            <p className="troll-punchline">
              <strong>AND FOR WHAT?</strong>
              <br />
              Just to see this message telling you it was all pointless! 😈
            </p>
            <div className="time-wasted" style={mirrorStyle}>
              <p style={mirrorStyle}>⏰ <em>Time you'll never get back: Successfully wasted!</em> ⏰</p>
            </div>
            <p className="troll-footer" ><em>Thank you for being such a good sport! 😄</em></p>
          </div>
          
          <button onClick={resetForm} className="troll-button" >
            🤡 Want to waste MORE time?
          </button>
          
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-header-main">
        <h1 className="form-title-main" style={mirrorStyle}>Welcome to the Madness Form</h1>
        <p className="form-subtitle-main" style={mirrorStyle}>Complete all questions below - Where logic goes to die</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(answers.filter(a => a !== null).length / 3) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text" style={mirrorStyle}>
          {answers.filter(a => a !== null).length} of 3 questions answered
        </p>
      </div>

      <div className="questions-container" >
        {/* Question 1 Card */}
        <div className={`question-card ${isQuestionAnswered(0) && !wrongAnswers[0] ? "completed" : ""}`}>
          <div className="question-number" style={mirrorStyle}>Question 1</div><br />
          <h2 className="question-title" style={mirrorStyle}>Click the button that says YES!</h2>
          <div
            className="button-group"
            style={{ position: "relative", zIndex: 1 }} // added to ensure buttons are clickable
          >
            <button
              onClick={() => handleAnswer(0, labelsSwapped ? "ON" : "SEY")}
              className="yes-button"
              style={{ position: "relative", zIndex: 10, pointerEvents: "auto" }}
            >
              {labelsSwapped ? "ON" : "SEY"}
            </button>
            <button
              onClick={() => handleAnswer(0, labelsSwapped ? "SEY" : "ON")}
              className="no-button"
              style={{ position: "relative", zIndex: 10, pointerEvents: "auto" }}
            >
              {labelsSwapped ? "SEY" : "ON"}
            </button>
          </div>
          <p className="question-hint" style={mirrorStyle}>Labels swap every second. Watch carefully!</p>
          {isQuestionAnswered(0) && (
            <div className={`answer-display ${wrongAnswers[0] ? "wrong" : "correct"}`}>
              {wrongAnswers[0] ? "✗ Wrong Answer!" : `✓ Your answer: ${answers[0]}`}
            </div>
          )}
        </div>

        {/* Question 2 Card */}
        <div className={`question-card ${isQuestionAnswered(1) && !wrongAnswers[1] ? "completed" : ""}`}>
          <div className="question-number" style={mirrorStyle}>Question 2</div>
          <h2 className="question-title" style={mirrorStyle}>
            Which planet is closest to the <span className="sun-highlight">Sun</span>?
          </h2>
          <div className="planet-grid" >
            {["SUNEV", "YRUCREM", "SRAM", "RETIPUJ"].map((planet, index) => (
              <button
                key={planet} 
                onClick={() => handleAnswer(1, planet)}
                className={`planet-button planet-${index}`}
              >
                {planet}
              </button>
            ))}
          </div>
          
          {isQuestionAnswered(1) && (
            <div className={`answer-display ${wrongAnswers[1] ? "wrong" : "correct"}`}>
              {wrongAnswers[1] ? "✗ Wrong Answer!" : `✓ Your answer: ${answers[1]}`}
            </div>
          )}
        </div>

        {/* Question 3 Card */}
        <div className={`question-card ${isQuestionAnswered(2) && !wrongAnswers[2] ? "completed" : ""}`}>
          <div className="question-number" style={mirrorStyle}>Question 3</div>
          <h2 className="question-title" style={mirrorStyle}>Click the word RED</h2>
          <div className="color-grid" >
            {colorWords.map((word, index) => (
              <button
                key={`${word.text}-${index}`}
                onClick={() => handleAnswer(2, word.text)}
                className="color-button"
                style={{ color: word.color }}
              >
                {word.text}
              </button>
            ))}
          </div>
          <p className="question-hint">Colors shuffle every second. Trust the text, not the color!</p>
          {isQuestionAnswered(2) && (
            <div className={`answer-display ${wrongAnswers[2] ? "wrong" : "correct"}`}>
              {wrongAnswers[2] ? "✗ Wrong Answer!" : `✓ Your answer: ${answers[2]}`}
            </div>
          )}
        </div>
      </div>

      {/* Moving Submit Section */}
      {showSubmit && (
        <div className="submit-section-troll" style={{ position: "relative", height: "150px" }}>
          <p className="submit-message" style={mirrorStyle}>
            🎉 You got them all right! Now... can you click on the Submit button?
          </p>
          <div className="moving-button-container" style={{ position: "relative", height: "100px" }}>
            <button
              className="submit-button-troll"
              style={{
                position: "absolute",
                top: submitPosition.top,
                left: submitPosition.left,
                cursor: submitAttempts >= MAX_ATTEMPTS ? "default" : "pointer",
              }}
              onMouseEnter={handleButtonHover}
              onClick={handleSubmit}
              title={submitAttempts >= MAX_ATTEMPTS ? "Fine, you win." : "Catch me if you can!"}
            >
              timbuS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPage;
