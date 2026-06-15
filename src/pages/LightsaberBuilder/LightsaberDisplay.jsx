import { useNavigate } from "react-router-dom"

const LightsaberDisplay = ({ crystal, hilt, bladeColor, onReset }) => {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: "calc(100vh - 70px)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", textAlign: "center",
    }}>

      {/* Background Glow */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 50% 40%, ${bladeColor.hex}15 0%, transparent 65%)`,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 600, width: "100%" }}>

        <p style={{ color: "#666", fontSize: 11, letterSpacing: 4, marginBottom: 8 }}>
          YOUR WEAPON HAS BEEN FORGED
        </p>

        <h1 style={{
          color: "#FFD700",
          fontSize: "clamp(24px, 5vw, 40px)",
          fontWeight: 900, letterSpacing: 4,
          textTransform: "uppercase", fontStyle: "italic",
          marginBottom: 40,
          textShadow: "0 0 30px rgba(255,215,0,0.5)",
        }}>
          ⚔️ Your Lightsaber
        </h1>

        {/* Lightsaber Visual */}
        <div style={{
          display: "flex", justifyContent: "center",
          marginBottom: 40, position: "relative",
        }}>

          {/* Left Glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 200, height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${bladeColor.hex}20, transparent)`,
            filter: "blur(30px)",
            pointerEvents: "none",
          }} />

          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center",
          }}>
            {/* Blade */}
            <div style={{
              width: 10, height: 220,
              background: `linear-gradient(to top, ${bladeColor.hex}, ${bladeColor.hex}cc, rgba(255,255,255,0.8), transparent)`,
              borderRadius: "5px 5px 2px 2px",
              boxShadow: `
                0 0 10px ${bladeColor.hex},
                0 0 20px ${bladeColor.hex},
                0 0 40px ${bladeColor.hex}80,
                0 0 60px ${bladeColor.hex}40
              `,
              animation: "saberGlow 2s ease-in-out infinite",
              position: "relative",
            }}>
              {/* Blade tip glow */}
              <div style={{
                position: "absolute",
                top: 0, left: "50%",
                transform: "translateX(-50%)",
                width: 20, height: 20,
                borderRadius: "50%",
                background: "white",
                filter: `blur(4px)`,
                opacity: 0.8,
              }} />
            </div>

            {/* Guard */}
            <div style={{
              width: 40, height: 8,
              background: "linear-gradient(to right, #444, #888, #666, #888, #444)",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }} />

            {/* Hilt */}
            <div style={{
              width: 22, height: 90,
              background: "linear-gradient(to right, #333, #777, #555, #777, #333)",
              borderRadius: "2px 2px 6px 6px",
              boxShadow: "2px 0 8px rgba(0,0,0,0.4), -2px 0 8px rgba(0,0,0,0.4)",
              position: "relative",
            }}>
              {/* Grip lines */}
              {[20, 36, 52, 68].map((top) => (
                <div key={top} style={{
                  position: "absolute",
                  top, left: 2, right: 2, height: 2,
                  background: "rgba(0,0,0,0.5)",
                  borderRadius: 1,
                }} />
              ))}

              {/* Crystal window */}
              <div style={{
                position: "absolute",
                top: 12, left: "50%",
                transform: "translateX(-50%)",
                width: 8, height: 8,
                borderRadius: 2,
                background: bladeColor.hex,
                boxShadow: `0 0 8px ${bladeColor.hex}`,
              }} />
            </div>

            {/* Pommel */}
            <div style={{
              width: 18, height: 14,
              background: "linear-gradient(to right, #222, #666, #444, #666, #222)",
              borderRadius: "0 0 8px 8px",
            }} />
          </div>
        </div>

        {/* Saber Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 12, marginBottom: 28,
        }}>
          {[
            { label: "CRYSTAL", value: crystal.name, color: crystal.hex },
            { label: "HILT", value: hilt.name, color: "#FFD700" },
            { label: "BLADE", value: bladeColor.color, color: bladeColor.hex },
            { label: "COMBAT", value: hilt.combatStyle, color: "#AB47BC" },
            { label: "MEANING", value: crystal.meaning, color: crystal.hex },
            { label: "RARITY", value: crystal.rarity, color: "#FDD835" },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 8, padding: "12px",
              textAlign: "center",
            }}>
              <p style={{
                color: "#555", fontSize: 9,
                letterSpacing: 2, marginBottom: 4,
              }}>
                {stat.label}
              </p>
              <p style={{
                color: stat.color, fontSize: 12,
                fontWeight: 700,
              }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Philosophy */}
        <div style={{
          background: `rgba(${hexToRgb(bladeColor.hex)}, 0.05)`,
          border: `1px solid ${bladeColor.hex}30`,
          borderRadius: 12, padding: "20px 24px",
          marginBottom: 28,
        }}>
          <p style={{
            color: bladeColor.hex, fontSize: 11,
            letterSpacing: 2, marginBottom: 8,
          }}>
            YOUR FIGHTING PHILOSOPHY
          </p>
          <p style={{
            color: "#aaa", fontSize: 14,
            lineHeight: 1.8, fontStyle: "italic",
          }}>
            "{crystal.philosophy}"
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={onReset}
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
            🔄 Build Another
          </button>

          <button
            onClick={() => navigate("/classifier")}
            style={{
              flex: 1, minWidth: 160,
              background: `rgba(${hexToRgb(bladeColor.hex)}, 0.1)`,
              border: `1px solid ${bladeColor.hex}60`,
              color: bladeColor.hex, padding: "12px",
              borderRadius: 8, cursor: "pointer",
              fontSize: 13, fontWeight: 700,
              letterSpacing: 1,
              fontFamily: "Trebuchet MS, sans-serif",
            }}
          >
            🔮 Discover Your Side
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
    : "255,215,0"
}

export default LightsaberDisplay