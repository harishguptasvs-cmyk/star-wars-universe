import { useState } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { classifierQuestions, determineDestiny } from "../../utils/classifierLogic"
import ClassifierResult from "./ClassifierResult"
import ProgressBar from "../../components/ProgressBar"

const Classifier = () => {
  const [step, setStep] = useState("intro")
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [selected, setSelected] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [savedResult, setSavedResult] = useLocalStorage("mySide", null)

  const question = classifierQuestions[currentQ]
  const isLast = currentQ === classifierQuestions.length - 1

  const handleAnswer = (index) => {
    if (animating) return
    setSelected(index)
    setAnimating(true)

    setTimeout(() => {
      const newAnswers = [...answers, index]
      if (isLast) {
        const destiny = determineDestiny(newAnswers)
        setResult(destiny)
        setSavedResult(destiny)
        setStep("result")
      } else {
        setAnswers(newAnswers)
        setCurrentQ((q) => q + 1)
        setSelected(null)
        setAnimating(false)
      }
    }, 600)
  }

  const handleReset = () => {
    setStep("intro")
    setCurrentQ(0)
    setAnswers([])
    setResult(null)
    setSelected(null)
    setAnimating(false)
  }

  if (step === "result" && result) {
    return <ClassifierResult result={result} onReset={handleReset} />
  }

  if (step === "intro") {
    return (
      <div style={{
        minHeight: "calc(100vh - 70px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px 24px", textAlign: "center",
      }}>

        {/* Jedi vs Sith Visual */}
        <div style={{
          display: "flex", gap: 40, marginBottom: 40,
          alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "rgba(79,195,247,0.1)",
              border: "2px solid #4FC3F7",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 36,
              margin: "0 auto 12px",
              boxShadow: "0 0 30px rgba(79,195,247,0.3)",
              animation: "float 3s ease-in-out infinite",
            }}>
              ✨
            </div>
            <p style={{ color: "#4FC3F7", fontWeight: 700, letterSpacing: 2 }}>
              JEDI
            </p>
          </div>

          <div style={{
            color: "#444", fontSize: 24, fontWeight: 900,
            letterSpacing: 4,
          }}>
            VS
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "rgba(239,83,80,0.1)",
              border: "2px solid #EF5350",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 36,
              margin: "0 auto 12px",
              boxShadow: "0 0 30px rgba(239,83,80,0.3)",
              animation: "float 3s ease-in-out 1.5s infinite",
            }}>
              😈
            </div>
            <p style={{ color: "#EF5350", fontWeight: 700, letterSpacing: 2 }}>
              SITH
            </p>
          </div>
        </div>

        <p style={{ color: "#666", fontSize: 12, letterSpacing: 4, marginBottom: 8 }}>
          FORCE ALIGNMENT TEST
        </p>

        <h1 style={{
          color: "#FFD700",
          fontSize: "clamp(28px, 6vw, 52px)",
          fontWeight: 900, letterSpacing: 6,
          textTransform: "uppercase", fontStyle: "italic",
          marginBottom: 8,
          textShadow: "0 0 40px rgba(255,215,0,0.5)",
        }}>
          Jedi or Sith?
        </h1>

        <div style={{
          width: 200, height: 1,
          background: "linear-gradient(to right, transparent, #FFD700, transparent)",
          margin: "16px auto 24px",
        }} />

        <p style={{
          color: "#888", fontSize: 15,
          maxWidth: 480, lineHeight: 1.9,
          marginBottom: 40,
        }}>
          The Force does not choose for you — it reveals who you already are.
          Answer honestly. There is no right or wrong path,
          only your true destiny.
        </p>

        <div style={{
          display: "flex", gap: 12,
          flexWrap: "wrap", justifyContent: "center",
        }}>
          <button
            onClick={() => setStep("quiz")}
            style={{
              background: "rgba(255,215,0,0.1)",
              border: "2px solid #FFD700",
              color: "#FFD700", padding: "14px 40px",
              borderRadius: 8, cursor: "pointer",
              fontSize: 16, fontWeight: 700,
              letterSpacing: 2,
              fontFamily: "Trebuchet MS, sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.background = "rgba(255,215,0,0.2)"}
            onMouseLeave={(e) => e.target.style.background = "rgba(255,215,0,0.1)"}
          >
            🔮 DISCOVER MY DESTINY
          </button>

          {savedResult && (
            <button
              onClick={() => { setResult(savedResult); setStep("result") }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#888", padding: "14px 32px",
                borderRadius: 8, cursor: "pointer",
                fontSize: 14, fontFamily: "Trebuchet MS, sans-serif",
              }}
            >
              View My Side: {savedResult.side}
            </button>
          )}
        </div>

        {/* Info Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16, maxWidth: 700,
          width: "100%", marginTop: 60,
        }}>
          {[
            { icon: "✨", side: "Jedi", color: "#4FC3F7", desc: "Guardians of peace and justice. Serve others selflessly through the light side." },
            { icon: "⚖️", side: "Grey Jedi", color: "#AB47BC", desc: "Walk between light and dark. Bound by no order, guided by wisdom alone." },
            { icon: "😈", side: "Sith", color: "#EF5350", desc: "Masters of power and ambition. Forge destiny through strength and will." },
          ].map((item) => (
            <div key={item.side} style={{
              background: `rgba(${hexToRgb(item.color)}, 0.05)`,
              border: `1px solid ${item.color}25`,
              borderRadius: 12, padding: "20px 16px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</div>
              <h3 style={{
                color: item.color, fontSize: 14,
                fontWeight: 700, marginBottom: 8, letterSpacing: 1,
              }}>
                {item.side}
              </h3>
              <p style={{ color: "#555", fontSize: 12, lineHeight: 1.7 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
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
            FORCE ALIGNMENT TEST
          </p>
          <h2 style={{
            color: "#FFD700", fontSize: 22,
            fontWeight: 900, letterSpacing: 3,
            textTransform: "uppercase", marginBottom: 20,
          }}>
            🔮 The Force Judges You
          </h2>
          <ProgressBar
            current={currentQ + 1}
            total={classifierQuestions.length}
            color="#EF5350"
          />
        </div>

        {/* Question */}
        <div style={{
          background: "rgba(239,83,80,0.04)",
          border: "1px solid rgba(239,83,80,0.15)",
          borderRadius: 16, padding: "28px 24px",
          marginBottom: 20,
        }}>
          <p style={{
            color: "#EF5350", fontSize: 11,
            letterSpacing: 3, marginBottom: 12,
          }}>
            QUESTION {currentQ + 1} OF {classifierQuestions.length}
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
            const isLight = index <= 1
            const optColor = isLight ? "#4FC3F7" : "#EF5350"

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={animating}
                style={{
                  background: isSelected
                    ? `rgba(${isLight ? "79,195,247" : "239,83,80"}, 0.12)`
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isSelected
                    ? optColor
                    : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 10, padding: "16px 20px",
                  cursor: animating ? "default" : "pointer",
                  color: isSelected ? optColor : "#aaa",
                  fontSize: 15, textAlign: "left",
                  transition: "all 0.2s",
                  fontFamily: "Trebuchet MS, sans-serif",
                  display: "flex", alignItems: "center", gap: 12,
                  transform: isSelected ? "translateX(8px)" : "translateX(0)",
                }}
                onMouseEnter={(e) => {
                  if (!animating && selected !== index) {
                    e.currentTarget.style.borderColor = `${optColor}50`
                    e.currentTarget.style.color = "#ccc"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!animating && selected !== index) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                    e.currentTarget.style.color = "#aaa"
                  }
                }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  border: `1px solid ${isSelected ? optColor : "rgba(255,255,255,0.15)"}`,
                  background: isSelected ? optColor : "transparent",
                  flexShrink: 0,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 12,
                  color: "white",
                }}>
                  {isSelected ? "✓" : ""}
                </div>
                {option}
              </button>
            )
          })}
        </div>

        <button
          onClick={handleReset}
          style={{
            marginTop: 20, background: "transparent",
            border: "none", color: "#444",
            cursor: "pointer", fontSize: 13,
            fontFamily: "Trebuchet MS, sans-serif",
            padding: "8px 0",
          }}
        >
          ← Start Over
        </button>
      </div>
    </div>
  )
}

const hexToRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "255,215,0"
}

export default Classifier