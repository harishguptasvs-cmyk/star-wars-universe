import { useState } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { quizQuestions } from "../../data/quizQuestions"

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [step, setStep] = useState("intro") // "intro" | "playing" | "result"
  const [highScore, setHighScore] = useLocalStorage("quizHighScore", 0)

  const handleStart = () => {
    setCurrentQ(0)
    setSelected(null)
    setScore(0)
    setStep("playing")
  }

  const handleSelect = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === quizQuestions[currentQ].answer) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentQ + 1 >= quizQuestions.length) {
      if (score > highScore) setHighScore(score)
      setStep("result")
    } else {
      setCurrentQ((q) => q + 1)
      setSelected(null)
    }
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 70px)",
        padding: "40px 24px",
        maxWidth: 600,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {step === "intro" && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>🧠</div>
          <h2
            style={{
              color: "#FFD700",
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontStyle: "italic",
              marginBottom: 16,
              textShadow: "0 0 20px rgba(255,215,0,0.3)",
            }}
          >
            Galactic Trivia Quiz
          </h2>
          <p style={{ color: "#888", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
            Do you have the knowledge of a Jedi Archivist, or are your archives
            incomplete? Test your Star Wars mastery now.
          </p>
          <button
            onClick={handleStart}
            style={{
              background: "rgba(255,215,0,0.1)",
              border: "2px solid #FFD700",
              color: "#FFD700",
              padding: "14px 40px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 2,
              fontFamily: "Trebuchet MS, sans-serif",
            }}
          >
            START TEST
          </button>
          {highScore > 0 && (
            <p style={{ color: "#555", fontSize: 13, marginTop: 16, letterSpacing: 1 }}>
              🏆 HIGH SCORE: {highScore} / {quizQuestions.length}
            </p>
          )}
        </div>
      )}

      {step === "playing" && (
        <div>
          {/* Progress bar */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#666",
                fontSize: 11,
                letterSpacing: 2,
                marginBottom: 8,
              }}
            >
              <span>QUESTION {currentQ + 1} OF {quizQuestions.length}</span>
              <span>SCORE: {score}</span>
            </div>
            <div
              style={{
                height: 4,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "#FFD700",
                  width: `${((currentQ + 1) / quizQuestions.length) * 100}%`,
                  transition: "width 0.3s ease",
                  boxShadow: "0 0 8px #FFD700",
                }}
              />
            </div>
          </div>

          {/* Question card */}
          <div
            style={{
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 16,
              padding: 24,
              marginBottom: 20,
            }}
          >
            <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600, lineHeight: 1.6 }}>
              {quizQuestions[currentQ].question}
            </h3>
          </div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {quizQuestions[currentQ].options.map((opt, idx) => {
              const isAnswered = selected !== null
              const isSelected = selected === idx
              const isCorrect = idx === quizQuestions[currentQ].answer

              let optionBg = "rgba(255,255,255,0.02)"
              let optionBorder = "rgba(255,255,255,0.06)"
              let optionColor = "#aaa"

              if (isAnswered) {
                if (isCorrect) {
                  optionBg = "rgba(102,187,106,0.08)"
                  optionBorder = "#66BB6A"
                  optionColor = "#66BB6A"
                } else if (isSelected) {
                  optionBg = "rgba(239,83,80,0.08)"
                  optionBorder = "#EF5350"
                  optionColor = "#EF5350"
                } else {
                  optionColor = "#444"
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  style={{
                    background: optionBg,
                    border: `1px solid ${optionBorder}`,
                    color: optionColor,
                    borderRadius: 12,
                    padding: "16px 20px",
                    textAlign: "left",
                    cursor: isAnswered ? "default" : "pointer",
                    fontSize: 14,
                    fontWeight: 500,
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <span>✓</span>}
                    {isAnswered && isSelected && !isCorrect && <span>✗</span>}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Next Button */}
          {selected !== null && (
            <button
              onClick={handleNext}
              style={{
                marginTop: 24,
                width: "100%",
                background: "rgba(255,215,0,0.1)",
                border: "2px solid #FFD700",
                color: "#FFD700",
                padding: "14px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: 2,
                fontFamily: "Trebuchet MS, sans-serif",
              }}
            >
              {currentQ + 1 === quizQuestions.length ? "FINISH TEST" : "NEXT QUESTION →"}
            </button>
          )}
        </div>
      )}

      {step === "result" && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>
            {score === quizQuestions.length ? "👑" : score >= quizQuestions.length * 0.7 ? "🏆" : "⚡"}
          </div>
          <h2
            style={{
              color: "#FFD700",
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontStyle: "italic",
              marginBottom: 8,
            }}
          >
            Test Complete
          </h2>
          <p style={{ color: "#555", fontSize: 12, letterSpacing: 3, marginBottom: 24 }}>
            YOUR SCORE
          </p>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: score >= quizQuestions.length * 0.7 ? "#66BB6A" : "#FFD700",
              marginBottom: 16,
              textShadow: `0 0 30px ${
                score >= quizQuestions.length * 0.7 ? "rgba(102,187,106,0.3)" : "rgba(255,215,0,0.3)"
              }`,
            }}
          >
            {score} / {quizQuestions.length}
          </div>
          <p style={{ color: "#888", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
            {score === quizQuestions.length
              ? "Flawless! Your knowledge is matchless. Truly, you are a master of the galactic history archives."
              : score >= quizQuestions.length * 0.7
              ? "Impressive! Your connection to the Force and galactic history is exceptionally strong."
              : "Your archives are incomplete. Spend more time studying galactic historical records in the database."}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={handleStart}
              style={{
                background: "rgba(255,215,0,0.1)",
                border: "2px solid #FFD700",
                color: "#FFD700",
                padding: "14px 28px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 1,
                fontFamily: "Trebuchet MS, sans-serif",
              }}
            >
              TRY AGAIN
            </button>
            <button
              onClick={() => setStep("intro")}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#888",
                padding: "14px 28px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 1,
                fontFamily: "Trebuchet MS, sans-serif",
              }}
            >
              QUIT GAME
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Quiz
