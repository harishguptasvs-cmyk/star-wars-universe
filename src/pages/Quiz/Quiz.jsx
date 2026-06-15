import { useState } from "react"
import { quizQuestions } from "../../data/quizQuestions"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import ProgressBar from "../../components/ProgressBar"
import QuizResult from "./QuizResult"

const DIFFICULTY_COLORS = {
  Easy: "#66BB6A",
  Medium: "#FDD835",
  Hard: "#EF5350",
}

const Quiz = () => {
  const [step, setStep] = useState("intro")
  const [difficulty, setDifficulty] = useState("All")
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState([])
  const [highScore, setHighScore] = useLocalStorage("quizHighScore", 0)

  const startQuiz = (diff) => {
    setDifficulty(diff)
    const filtered =
      diff === "All"
        ? quizQuestions
        : quizQuestions.filter((q) => q.difficulty === diff)
    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 10)
    setQuestions(shuffled)
    setCurrentQ(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setResults([])
    setStep("quiz")
  }

  const handleAnswer = (index) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)

    const question = questions[currentQ]
    const isCorrect = index === question.answer
    if (isCorrect) setScore((s) => s + 1)

    setResults((prev) => [...prev, {
      question: question.question,
      selected: index,
      correct: question.answer,
      isCorrect,
    }])
  }

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      const finalScore = score + (selected === questions[currentQ].answer ? 0 : 0)
      if (score > highScore) setHighScore(score)
      setStep("result")
    } else {
      setCurrentQ((q) => q + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const handleReset = () => {
    setStep("intro")
    setDifficulty("All")
    setQuestions([])
    setCurrentQ(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setResults([])
  }

  if (step === "result") {
    return (
      <QuizResult
        score={score}
        total={questions.length}
        difficulty={difficulty}
        results={results}
        highScore={highScore}
        onReset={handleReset}
        questions={questions}
      />
    )
  }

  if (step === "intro") {
    return (
      <div style={{
        minHeight: "calc(100vh - 70px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px 24px", textAlign: "center",
      }}>

        <div style={{
          fontSize: 72, marginBottom: 20,
          animation: "float 3s ease-in-out infinite",
          filter: "drop-shadow(0 0 20px rgba(255,215,0,0.5))",
        }}>
          🧠
        </div>

        <p style={{ color: "#666", fontSize: 12, letterSpacing: 4, marginBottom: 8 }}>
          JEDI KNOWLEDGE TEST
        </p>

        <h1 style={{
          color: "#FFD700",
          fontSize: "clamp(28px, 6vw, 52px)",
          fontWeight: 900, letterSpacing: 6,
          textTransform: "uppercase", fontStyle: "italic",
          marginBottom: 8,
          textShadow: "0 0 40px rgba(255,215,0,0.5)",
        }}>
          Galaxy Quiz
        </h1>

        <div style={{
          width: 200, height: 1,
          background: "linear-gradient(to right, transparent, #FFD700, transparent)",
          margin: "16px auto 24px",
        }} />

        <p style={{
          color: "#888", fontSize: 15,
          maxWidth: 480, lineHeight: 1.9,
          marginBottom: 16,
        }}>
          How well do you know the galaxy far, far away?
          Test your Star Wars knowledge across 20 questions!
        </p>

        {highScore > 0 && (
          <div style={{
            background: "rgba(255,215,0,0.08)",
            border: "1px solid rgba(255,215,0,0.2)",
            borderRadius: 8, padding: "10px 24px",
            marginBottom: 32,
          }}>
            <p style={{ color: "#FFD700", fontSize: 13 }}>
              🏆 Your High Score: {highScore}/10
            </p>
          </div>
        )}

        {!highScore && <div style={{ marginBottom: 32 }} />}

        {/* Difficulty Selection */}
        <p style={{
          color: "#555", fontSize: 12,
          letterSpacing: 3, marginBottom: 16,
        }}>
          SELECT DIFFICULTY
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12, maxWidth: 700, width: "100%",
          marginBottom: 40,
        }}>
          {[
            {
              diff: "All", icon: "🌌", color: "#4FC3F7",
              label: "All Questions",
              desc: "20 mixed questions across all difficulties",
            },
            {
              diff: "Easy", icon: "✨", color: "#66BB6A",
              label: "Easy",
              desc: "For Padawans just starting their journey",
            },
            {
              diff: "Medium", icon: "⚡", color: "#FDD835",
              label: "Medium",
              desc: "For skilled Jedi Knights of the Order",
            },
            {
              diff: "Hard", icon: "💀", color: "#EF5350",
              label: "Hard",
              desc: "Only true Jedi Masters will prevail",
            },
          ].map((item) => (
            <div
              key={item.diff}
              onClick={() => startQuiz(item.diff)}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${item.color}30`,
                borderRadius: 12, padding: "20px 16px",
                cursor: "pointer", textAlign: "center",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `rgba(${hexToRgb(item.color)}, 0.08)`
                e.currentTarget.style.borderColor = item.color
                e.currentTarget.style.transform = "translateY(-4px)"
                e.currentTarget.style.boxShadow = `0 8px 24px ${item.color}20`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)"
                e.currentTarget.style.borderColor = `${item.color}30`
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</div>
              <h3 style={{
                color: item.color, fontSize: 14,
                fontWeight: 700, marginBottom: 6, letterSpacing: 1,
              }}>
                {item.label}
              </h3>
              <p style={{ color: "#555", fontSize: 11, lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: 24,
          flexWrap: "wrap", justifyContent: "center",
        }}>
          {[
            { value: quizQuestions.length, label: "TOTAL QUESTIONS" },
            { value: quizQuestions.filter(q => q.difficulty === "Easy").length, label: "EASY" },
            { value: quizQuestions.filter(q => q.difficulty === "Medium").length, label: "MEDIUM" },
            { value: quizQuestions.filter(q => q.difficulty === "Hard").length, label: "HARD" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p style={{
                color: "#FFD700", fontSize: 24,
                fontWeight: 900, marginBottom: 4,
              }}>
                {stat.value}
              </p>
              <p style={{ color: "#444", fontSize: 10, letterSpacing: 2 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const question = questions[currentQ]
  const isCorrect = selected === question.answer

  return (
    <div style={{
      minHeight: "calc(100vh - 70px)",
      display: "flex", alignItems: "center",
      justifyContent: "center", padding: "40px 24px",
    }}>
      <div style={{ maxWidth: 580, width: "100%" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: 12,
          }}>
            <p style={{ color: "#666", fontSize: 12, letterSpacing: 3 }}>
              GALAXY QUIZ — {difficulty.toUpperCase()}
            </p>
            <div style={{
              background: "rgba(255,215,0,0.08)",
              border: "1px solid rgba(255,215,0,0.2)",
              borderRadius: 20, padding: "4px 14px",
            }}>
              <span style={{ color: "#FFD700", fontSize: 13, fontWeight: 700 }}>
                Score: {score}/{currentQ + (answered ? 1 : 0)}
              </span>
            </div>
          </div>

          <ProgressBar
            current={currentQ + 1}
            total={questions.length}
            color="#FFD700"
          />
        </div>

        {/* Difficulty Badge */}
        <div style={{ marginBottom: 16 }}>
          <span style={{
            background: `rgba(${hexToRgb(DIFFICULTY_COLORS[question.difficulty])}, 0.12)`,
            border: `1px solid ${DIFFICULTY_COLORS[question.difficulty]}50`,
            color: DIFFICULTY_COLORS[question.difficulty],
            padding: "4px 14px", borderRadius: 20,
            fontSize: 11, fontWeight: 700, letterSpacing: 1,
          }}>
            {question.difficulty}
          </span>
        </div>

        {/* Question */}
        <div style={{
          background: "rgba(255,215,0,0.03)",
          border: "1px solid rgba(255,215,0,0.12)",
          borderRadius: 16, padding: "24px 22px",
          marginBottom: 20,
        }}>
          <h3 style={{
            color: "white", fontSize: 19,
            lineHeight: 1.6, fontWeight: 700,
          }}>
            {question.question}
          </h3>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {question.options.map((option, index) => {
            let bg = "rgba(255,255,255,0.03)"
            let border = "rgba(255,255,255,0.08)"
            let color = "#aaa"
            let icon = ""

            if (answered) {
              if (index === question.answer) {
                bg = "rgba(102,187,106,0.12)"
                border = "#66BB6A"
                color = "#66BB6A"
                icon = "✓"
              } else if (index === selected && !isCorrect) {
                bg = "rgba(239,83,80,0.12)"
                border = "#EF5350"
                color = "#EF5350"
                icon = "✗"
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                  borderRadius: 10, padding: "15px 20px",
                  cursor: answered ? "default" : "pointer",
                  color, fontSize: 15, textAlign: "left",
                  transition: "all 0.25s",
                  fontFamily: "Trebuchet MS, sans-serif",
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: 12,
                }}
                onMouseEnter={(e) => {
                  if (!answered) {
                    e.currentTarget.style.borderColor = "rgba(255,215,0,0.3)"
                    e.currentTarget.style.color = "#FFD700"
                    e.currentTarget.style.background = "rgba(255,215,0,0.05)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!answered) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                    e.currentTarget.style.color = "#aaa"
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)"
                  }
                }}
              >
                <span>{option}</span>
                {icon && (
                  <span style={{
                    fontSize: 16, fontWeight: 900,
                    flexShrink: 0,
                  }}>
                    {icon}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback + Next */}
        {answered && (
          <div style={{ marginTop: 20 }}>
            <div style={{
              background: isCorrect
                ? "rgba(102,187,106,0.08)"
                : "rgba(239,83,80,0.08)",
              border: `1px solid ${isCorrect ? "#66BB6A30" : "#EF535030"}`,
              borderRadius: 10, padding: "14px 18px",
              marginBottom: 14, display: "flex",
              alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 22 }}>
                {isCorrect ? "🎉" : "💀"}
              </span>
              <p style={{
                color: isCorrect ? "#66BB6A" : "#EF5350",
                fontSize: 14, fontWeight: 600,
              }}>
                {isCorrect
                  ? "Correct! The Force is strong with you!"
                  : `Wrong! The correct answer was: ${question.options[question.answer]}`}
              </p>
            </div>

            <button
              onClick={handleNext}
              style={{
                width: "100%",
                background: "rgba(255,215,0,0.1)",
                border: "2px solid #FFD700",
                color: "#FFD700", padding: "14px",
                borderRadius: 8, cursor: "pointer",
                fontSize: 15, fontWeight: 700,
                letterSpacing: 2,
                fontFamily: "Trebuchet MS, sans-serif",
              }}
            >
              {currentQ + 1 >= questions.length
                ? "🏆 SEE RESULTS"
                : "NEXT QUESTION →"}
            </button>
          </div>
        )}
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

export default Quiz