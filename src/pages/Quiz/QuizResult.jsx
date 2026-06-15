import { useNavigate } from "react-router-dom"

const QuizResult = ({
  score, total, difficulty,
  results, highScore, onReset, questions,
}) => {
  const navigate = useNavigate()
  const percentage = Math.round((score / total) * 100)

  const getRank = () => {
    if (percentage >= 90) return { title: "Jedi Master", icon: "🏆", color: "#FFD700" }
    if (percentage >= 70) return { title: "Jedi Knight", icon: "⭐", color: "#4FC3F7" }
    if (percentage >= 50) return { title: "Jedi Padawan", icon: "✨", color: "#66BB6A" }
    if (percentage >= 30) return { title: "Force Sensitive", icon: "🌱", color: "#FDD835" }
    return { title: "Needs More Training", icon: "💀", color: "#EF5350" }
  }

  const rank = getRank()
  const isNewHighScore = score > highScore

  return (
    <div style={{
      minHeight: "calc(100vh - 70px)",
      display: "flex", flexDirection: "column",
      alignItems: "center", padding: "40px 24px",
    }}>
      <div style={{ maxWidth: 640, width: "100%", textAlign: "center" }}>

        {/* New High Score Banner */}
        {isNewHighScore && (
          <div style={{
            background: "rgba(255,215,0,0.1)",
            border: "1px solid #FFD700",
            borderRadius: 8, padding: "10px 24px",
            marginBottom: 24, display: "inline-block",
          }}>
            <p style={{
              color: "#FFD700", fontSize: 13,
              fontWeight: 700, letterSpacing: 2,
            }}>
              🎉 NEW HIGH SCORE!!
            </p>
          </div>
        )}

        {/* Rank Icon */}
        <div style={{
          fontSize: 72, marginBottom: 16,
          animation: "float 3s ease-in-out infinite",
          filter: `drop-shadow(0 0 20px ${rank.color})`,
        }}>
          {rank.icon}
        </div>

        <p style={{ color: "#666", fontSize: 12, letterSpacing: 4, marginBottom: 8 }}>
          QUIZ COMPLETE — {difficulty.toUpperCase()}
        </p>

        <h1 style={{
          color: rank.color,
          fontSize: "clamp(24px, 6vw, 48px)",
          fontWeight: 900, letterSpacing: 4,
          textTransform: "uppercase", fontStyle: "italic",
          marginBottom: 8,
          textShadow: `0 0 30px ${rank.color}60`,
        }}>
          {rank.title}
        </h1>

        {/* Score Display */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 16 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{
                color: rank.color, fontSize: 56,
                fontWeight: 900, lineHeight: 1,
              }}>
                {score}
              </p>
              <p style={{ color: "#555", fontSize: 11, letterSpacing: 2 }}>
                CORRECT
              </p>
            </div>
            <div style={{
              color: "#333", fontSize: 40,
              fontWeight: 300, alignSelf: "center",
            }}>
              /
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{
                color: "#555", fontSize: 56,
                fontWeight: 900, lineHeight: 1,
              }}>
                {total}
              </p>
              <p style={{ color: "#444", fontSize: 11, letterSpacing: 2 }}>
                TOTAL
              </p>
            </div>
          </div>

          {/* Score Bar */}
          <div style={{
            width: "100%", height: 8,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 4, overflow: "hidden",
            marginBottom: 8,
          }}>
            <div style={{
              width: `${percentage}%`,
              height: "100%",
              background: `linear-gradient(to right, ${rank.color}88, ${rank.color})`,
              borderRadius: 4,
              boxShadow: `0 0 12px ${rank.color}`,
              transition: "width 1s ease",
            }} />
          </div>
          <p style={{ color: rank.color, fontSize: 16, fontWeight: 700 }}>
            {percentage}% Accuracy
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "flex", gap: 12,
          flexWrap: "wrap", marginBottom: 40,
        }}>
          <button
            onClick={onReset}
            style={{
              flex: 1, minWidth: 140,
              background: "rgba(255,215,0,0.1)",
              border: "2px solid #FFD700",
              color: "#FFD700", padding: "12px",
              borderRadius: 8, cursor: "pointer",
              fontSize: 13, fontWeight: 700,
              letterSpacing: 1,
              fontFamily: "Trebuchet MS, sans-serif",
            }}
          >
            🔄 Try Again
          </button>

          <button
            onClick={() => navigate("/classifier")}
            style={{
              flex: 1, minWidth: 140,
              background: "rgba(239,83,80,0.08)",
              border: "1px solid rgba(239,83,80,0.3)",
              color: "#EF5350", padding: "12px",
              borderRadius: 8, cursor: "pointer",
              fontSize: 13, fontWeight: 700,
              letterSpacing: 1,
              fontFamily: "Trebuchet MS, sans-serif",
            }}
          >
            🔮 Jedi or Sith?
          </button>

          <button
            onClick={() => navigate("/lightsaber")}
            style={{
              flex: 1, minWidth: 140,
              background: "rgba(171,71,188,0.08)",
              border: "1px solid rgba(171,71,188,0.3)",
              color: "#AB47BC", padding: "12px",
              borderRadius: 8, cursor: "pointer",
              fontSize: 13, fontWeight: 700,
              letterSpacing: 1,
              fontFamily: "Trebuchet MS, sans-serif",
            }}
          >
            ⚔️ Build Saber
          </button>
        </div>

        {/* Review Answers */}
        <div style={{
          textAlign: "left",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 28,
        }}>
          <p style={{
            color: "#444", fontSize: 11,
            letterSpacing: 3, marginBottom: 20,
            textAlign: "center",
          }}>
            ANSWER REVIEW
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {results.map((r, i) => (
              <div
                key={i}
                style={{
                  background: r.isCorrect
                    ? "rgba(102,187,106,0.05)"
                    : "rgba(239,83,80,0.05)",
                  border: `1px solid ${r.isCorrect
                    ? "rgba(102,187,106,0.2)"
                    : "rgba(239,83,80,0.2)"}`,
                  borderRadius: 10, padding: "14px 16px",
                }}
              >
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", gap: 12,
                }}>
                  <p style={{ color: "#bbb", fontSize: 13, flex: 1, lineHeight: 1.5 }}>
                    <span style={{ color: "#555", fontSize: 11 }}>Q{i + 1}. </span>
                    {r.question}
                  </p>
                  <span style={{
                    fontSize: 18, flexShrink: 0,
                  }}>
                    {r.isCorrect ? "✅" : "❌"}
                  </span>
                </div>

                {!r.isCorrect && (
                  <p style={{
                    color: "#66BB6A", fontSize: 12,
                    marginTop: 6,
                  }}>
                    ✓ {questions[i]?.options[r.correct]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizResult