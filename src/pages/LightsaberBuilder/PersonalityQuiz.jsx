import { useState } from "react"
import ProgressBar from "../../components/ProgressBar"

const PersonalityQuiz = ({ questions, onComplete, onBack }) => {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [animating, setAnimating] = useState(false)

  const question = questions[currentQ]
  const isLast = currentQ === questions.length - 1

  const handleAnswer = (index) => {
    if (animating) return
    setSelected(index)
    setAnimating(true)

    setTimeout(() => {
      const newAnswers = [...answers, index]
      if (isLast) {
        onComplete(newAnswers)
      } else {
        setAnswers(newAnswers)
        setCurrentQ((q) => q + 1)
        setSelected(null)
        setAnimating(false)
      }
    }, 600)
  }

  return (
    <div style={{
      minHeight: "calc(100vh - 70px)",
      display: "flex", alignItems: "center",
      justifyContent: "center", padding: "40px 24px",
    }}>
      <div style={{ maxWidth: 560, width: "100%" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: "#666", fontSize: 12, letterSpacing: 4, marginBottom: 8 }}>
            CRYSTAL ALIGNMENT TEST
          </p>
          <h2 style={{
            color: "#FFD700", fontSize: 22,
            fontWeight: 900, letterSpacing: 3,
            textTransform: "uppercase", marginBottom: 20,
          }}>
            💎 Find Your Crystal
          </h2>
          <ProgressBar
            current={currentQ + 1}
            total={questions.length}
            color="#AB47BC"
          />
        </div>

        {/* Question */}
        <div style={{
          background: "rgba(171,71,188,0.05)",
          border: "1px solid rgba(171,71,188,0.2)",
          borderRadius: 16, padding: "28px 24px",
          marginBottom: 20,
        }}>
          <p style={{
            color: "#AB47BC", fontSize: 11,
            letterSpacing: 3, marginBottom: 12,
          }}>
            QUESTION {currentQ + 1} OF {questions.length}
          </p>
          <h3 style={{
            color: "white", fontSize: 20,
            lineHeight: 1.6, fontWeight: 700,
          }}>
            {question.question}
          </h3>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {question.options.map((option, index) => {
            const isSelected = selected === index
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={animating}
                style={{
                  background: isSelected
                    ? "rgba(171,71,188,0.2)"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isSelected
                    ? "#AB47BC"
                    : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 10, padding: "16px 20px",
                  cursor: animating ? "default" : "pointer",
                  color: isSelected ? "#AB47BC" : "#aaa",
                  fontSize: 15, textAlign: "left",
                  transition: "all 0.2s",
                  fontFamily: "Trebuchet MS, sans-serif",
                  display: "flex", alignItems: "center", gap: 12,
                  transform: isSelected ? "translateX(8px)" : "translateX(0)",
                }}
                onMouseEnter={(e) => {
                  if (!animating && selected !== index) {
                    e.currentTarget.style.borderColor = "rgba(171,71,188,0.4)"
                    e.currentTarget.style.color = "#ccc"
                    e.currentTarget.style.background = "rgba(171,71,188,0.05)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!animating && selected !== index) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                    e.currentTarget.style.color = "#aaa"
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)"
                  }
                }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  border: `1px solid ${isSelected ? "#AB47BC" : "rgba(255,255,255,0.15)"}`,
                  background: isSelected ? "#AB47BC" : "transparent",
                  flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12,
                }}>
                  {isSelected ? "✓" : ""}
                </div>
                {option}
              </button>
            )
          })}
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            marginTop: 20, background: "transparent",
            border: "none", color: "#444",
            cursor: "pointer", fontSize: 13,
            fontFamily: "Trebuchet MS, sans-serif",
            padding: "8px 0",
          }}
        >
          ← Go Back
        </button>
      </div>
    </div>
  )
}

export default PersonalityQuiz