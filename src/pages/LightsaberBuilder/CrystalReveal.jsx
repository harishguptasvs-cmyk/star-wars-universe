import { useState, useEffect } from "react"

const CrystalReveal = ({ crystal, onAccept }) => {
  const [phase, setPhase] = useState("dark")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("rising"), 500)
    const t2 = setTimeout(() => setPhase("revealed"), 2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div style={{
      minHeight: "calc(100vh - 70px)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", textAlign: "center",
      position: "relative",
    }}>

      {/* Full dark overlay during reveal */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 50% 40%, ${crystal.hex}20 0%, rgba(2,4,8,0.95) 60%)`,
        transition: "background 2s ease",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* THE FORCE HAS CHOSEN */}
        <div style={{
          opacity: phase === "revealed" ? 1 : 0,
          transform: phase === "revealed" ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.8s ease",
          marginBottom: 16,
        }}>
          <p style={{
            color: crystal.hex, fontSize: 11,
            letterSpacing: 6, marginBottom: 8,
            textShadow: `0 0 20px ${crystal.hex}`,
          }}>
            THE FORCE HAS SPOKEN
          </p>
        </div>

        {/* Crystal Visual */}
        <div style={{
          position: "relative",
          opacity: phase === "dark" ? 0 : 1,
          transform: phase === "dark"
            ? "translateY(60px) scale(0.5)"
            : "translateY(0) scale(1)",
          transition: "all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          marginBottom: 32,
        }}>

          {/* Outer Glow Ring */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 200, height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${crystal.hex}15, transparent)`,
            filter: `blur(20px)`,
            animation: phase === "revealed" ? "pulse 2s ease-in-out infinite" : "none",
          }} />

          {/* Middle Ring */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 120, height: 120,
            borderRadius: "50%",
            border: `1px solid ${crystal.hex}40`,
            animation: phase === "revealed" ? "pulse 1.5s ease-in-out infinite" : "none",
          }} />

          {/* Crystal Shape */}
          <div style={{
            width: 80, height: 80,
            position: "relative", margin: "0 auto",
          }}>

            {/* Diamond shape */}
            <div style={{
              width: 60, height: 60,
              background: `linear-gradient(135deg, ${crystal.hex}, ${crystal.hex}88)`,
              transform: "rotate(45deg)",
              margin: "10px auto",
              borderRadius: 8,
              boxShadow: `
                0 0 30px ${crystal.hex},
                0 0 60px ${crystal.hex}80,
                0 0 100px ${crystal.hex}40,
                inset 0 0 20px rgba(255,255,255,0.3)
              `,
              animation: phase === "revealed"
                ? "spin 8s linear infinite"
                : "none",
            }} />

            {/* Inner highlight */}
            <div style={{
              position: "absolute",
              top: "25%", left: "28%",
              width: 18, height: 18,
              background: "rgba(255,255,255,0.4)",
              transform: "rotate(45deg)",
              borderRadius: 3,
            }} />
          </div>
        </div>

        {/* Crystal Name */}
        <div style={{
          opacity: phase === "revealed" ? 1 : 0,
          transform: phase === "revealed" ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.3s",
        }}>
          <h1 style={{
            color: crystal.hex,
            fontSize: "clamp(24px, 5vw, 42px)",
            fontWeight: 900, letterSpacing: 4,
            textTransform: "uppercase", fontStyle: "italic",
            marginBottom: 8,
            textShadow: `0 0 30px ${crystal.hex}`,
          }}>
            {crystal.name}
          </h1>

          <p style={{
            color: "#FFD700", fontSize: 16,
            letterSpacing: 3, marginBottom: 24,
          }}>
            {crystal.color} Crystal — {crystal.meaning}
          </p>

          {/* Reveal Message */}
          <div style={{
            background: `rgba(${hexToRgb(crystal.hex)}, 0.06)`,
            border: `1px solid ${crystal.hex}30`,
            borderRadius: 12, padding: "20px 32px",
            maxWidth: 480, margin: "0 auto 24px",
          }}>
            <p style={{
              color: "#ccc", fontSize: 15,
              lineHeight: 1.8, fontStyle: "italic",
            }}>
              "{crystal.revealMessage}"
            </p>
          </div>

          {/* Crystal Details */}
          <div style={{
            display: "flex", gap: 16,
            justifyContent: "center", flexWrap: "wrap",
            marginBottom: 32,
          }}>
            {[
              { label: "CLASS", value: crystal.jediClass },
              { label: "RARITY", value: crystal.rarity },
              { label: "AURA", value: crystal.themeAura },
              { label: "EMOTION", value: crystal.emotionConnection },
            ].map((item) => (
              <div key={item.label} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8, padding: "10px 16px",
                textAlign: "center",
              }}>
                <p style={{
                  color: crystal.hex, fontSize: 9,
                  letterSpacing: 2, marginBottom: 4,
                }}>
                  {item.label}
                </p>
                <p style={{ color: "#ccc", fontSize: 13, fontWeight: 600 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Famous Users */}
          <p style={{
            color: "#555", fontSize: 12,
            marginBottom: 32, letterSpacing: 1,
          }}>
            ⚔️ Known users: {crystal.famousUsers}
          </p>

          {/* Accept Button */}
          <button
            onClick={onAccept}
            style={{
              background: `rgba(${hexToRgb(crystal.hex)}, 0.12)`,
              border: `2px solid ${crystal.hex}`,
              color: crystal.hex, padding: "14px 48px",
              borderRadius: 8, cursor: "pointer",
              fontSize: 16, fontWeight: 700,
              letterSpacing: 2,
              fontFamily: "Trebuchet MS, sans-serif",
              transition: "all 0.2s",
              boxShadow: `0 0 20px ${crystal.hex}30`,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = `rgba(${hexToRgb(crystal.hex)}, 0.25)`
              e.target.style.boxShadow = `0 0 30px ${crystal.hex}50`
            }}
            onMouseLeave={(e) => {
              e.target.style.background = `rgba(${hexToRgb(crystal.hex)}, 0.12)`
              e.target.style.boxShadow = `0 0 20px ${crystal.hex}30`
            }}
          >
            ACCEPT YOUR CRYSTAL →
          </button>
        </div>
      </div>
    </div>
  )
}

const hexToRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "171,71,188"
}

export default CrystalReveal