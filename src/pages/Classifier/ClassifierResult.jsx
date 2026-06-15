import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { characters } from "../../data/characters"

const ClassifierResult = ({ result, onReset }) => {
  const navigate = useNavigate()
  const [phase, setPhase] = useState("dark")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("rising"), 400)
    const t2 = setTimeout(() => setPhase("revealed"), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const relatedChars = characters.filter((c) =>
    result.side === "Jedi"
      ? c.side === "Jedi"
      : result.side === "Sith"
      ? c.side === "Sith"
      : c.side === "Neutral"
  ).slice(0, 4)

  return (
    <div style={{
      minHeight: "calc(100vh - 70px)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", textAlign: "center",
      position: "relative",
    }}>

      {/* Atmosphere */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 50% 40%, ${result.color}15 0%, transparent 65%)`,
        transition: "background 2s ease",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 580, width: "100%" }}>

        {/* Main Icon */}
        <div style={{
          opacity: phase === "dark" ? 0 : 1,
          transform: phase === "dark"
            ? "scale(0.3) translateY(40px)"
            : "scale(1) translateY(0)",
          transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          marginBottom: 24,
        }}>
          <div style={{
            width: 120, height: 120,
            borderRadius: "50%",
            background: `rgba(${hexToRgb(result.color)}, 0.12)`,
            border: `2px solid ${result.color}`,
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 56,
            margin: "0 auto",
            boxShadow: `0 0 40px ${result.color}40, 0 0 80px ${result.color}20`,
            animation: phase === "revealed"
              ? "pulse 2s ease-in-out infinite"
              : "none",
          }}>
            {result.icon}
          </div>
        </div>

        {/* Result Text */}
        <div style={{
          opacity: phase === "revealed" ? 1 : 0,
          transform: phase === "revealed" ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.3s",
        }}>
          <p style={{
            color: result.color, fontSize: 11,
            letterSpacing: 6, marginBottom: 8,
            textShadow: `0 0 20px ${result.color}`,
          }}>
            THE FORCE HAS REVEALED YOUR DESTINY
          </p>

          <h1 style={{
            color: "#FFD700",
            fontSize: "clamp(32px, 7vw, 64px)",
            fontWeight: 900, letterSpacing: 6,
            textTransform: "uppercase", fontStyle: "italic",
            marginBottom: 8,
            textShadow: `0 0 40px ${result.color}60`,
          }}>
            {result.side}
          </h1>

          <h2 style={{
            color: result.color, fontSize: 18,
            fontWeight: 700, letterSpacing: 3,
            marginBottom: 24,
          }}>
            {result.title}
          </h2>

          {/* Divider */}
          <div style={{
            width: 200, height: 1,
            background: `linear-gradient(to right, transparent, ${result.color}, transparent)`,
            margin: "0 auto 24px",
          }} />

          {/* Description */}
          <div style={{
            background: `rgba(${hexToRgb(result.color)}, 0.06)`,
            border: `1px solid ${result.color}25`,
            borderRadius: 12, padding: "20px 24px",
            marginBottom: 28,
          }}>
            <p style={{
              color: "#ccc", fontSize: 15,
              lineHeight: 1.9, fontStyle: "italic",
            }}>
              "{result.desc}"
            </p>
          </div>

          {/* Possible Titles */}
          <div style={{ marginBottom: 32 }}>
            <p style={{
              color: "#444", fontSize: 11,
              letterSpacing: 3, marginBottom: 14,
            }}>
              YOUR POSSIBLE DESTINY
            </p>
            <div style={{
              display: "flex", gap: 8,
              flexWrap: "wrap", justifyContent: "center",
            }}>
              {result.titles.map((title) => (
                <span
                  key={title}
                  style={{
                    background: `rgba(${hexToRgb(result.color)}, 0.08)`,
                    border: `1px solid ${result.color}30`,
                    color: result.color,
                    padding: "6px 16px", borderRadius: 20,
                    fontSize: 12, fontWeight: 600, letterSpacing: 1,
                  }}
                >
                  {title}
                </span>
              ))}
            </div>
          </div>

          {/* Related Characters */}
          {relatedChars.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <p style={{
                color: "#444", fontSize: 11,
                letterSpacing: 3, marginBottom: 14,
              }}>
                YOU SHARE YOUR PATH WITH
              </p>
              <div style={{
                display: "flex", gap: 12,
                flexWrap: "wrap", justifyContent: "center",
              }}>
                {relatedChars.map((c) => (
                  <button
                    key={c.id}
                    onClick={() =>
                      navigate(`/characters/${c.name.replace(/\s+/g, "-").toLowerCase()}`)
                    }
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10, padding: "10px 16px",
                      cursor: "pointer", color: "#888",
                      fontSize: 13, transition: "all 0.2s",
                      fontFamily: "Trebuchet MS, sans-serif",
                      display: "flex", alignItems: "center", gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = result.color
                      e.currentTarget.style.color = result.color
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                      e.currentTarget.style.color = "#888"
                    }}
                  >
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={onReset}
              style={{
                flex: 1, minWidth: 160,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#888", padding: "12px",
                borderRadius: 8, cursor: "pointer",
                fontSize: 13, fontWeight: 600,
                letterSpacing: 1,
                fontFamily: "Trebuchet MS, sans-serif",
              }}
            >
              🔄 Take Test Again
            </button>

            <button
              onClick={() => navigate("/lightsaber")}
              style={{
                flex: 1, minWidth: 160,
                background: `rgba(${hexToRgb(result.color)}, 0.1)`,
                border: `1px solid ${result.color}60`,
                color: result.color, padding: "12px",
                borderRadius: 8, cursor: "pointer",
                fontSize: 13, fontWeight: 700,
                letterSpacing: 1,
                fontFamily: "Trebuchet MS, sans-serif",
              }}
            >
              ⚔️ Build Your Saber
            </button>

            <button
              onClick={() => navigate("/quiz")}
              style={{
                flex: 1, minWidth: 160,
                background: "rgba(255,215,0,0.08)",
                border: "1px solid rgba(255,215,0,0.3)",
                color: "#FFD700", padding: "12px",
                borderRadius: 8, cursor: "pointer",
                fontSize: 13, fontWeight: 700,
                letterSpacing: 1,
                fontFamily: "Trebuchet MS, sans-serif",
              }}
            >
              🧠 Take the Quiz
            </button>
          </div>
        </div>
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

export default ClassifierResult