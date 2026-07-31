import { useState } from "react"
import { hiltStyles, bladeColors } from "../../data/hiltStyles"

const HiltSelector = ({ crystal, onComplete, onBack }) => {
  const [selectedHilt, setSelectedHilt] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [tab, setTab] = useState("hilt")

  const handleComplete = () => {
    if (selectedHilt && selectedColor) {
      onComplete(selectedHilt, selectedColor)
    }
  }

  return (
    <div style={{
      minHeight: "calc(100vh - 70px)",
      padding: "40px 24px", maxWidth: 800,
      margin: "0 auto",
    }}>

      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <p style={{ color: "#666", fontSize: 12, letterSpacing: 4, marginBottom: 8 }}>
          WEAPON FORGE
        </p>
        <h2 style={{
          color: "#FFD700", fontSize: 28,
          fontWeight: 900, letterSpacing: 4,
          textTransform: "uppercase", fontStyle: "italic",
          marginBottom: 16,
        }}>
          ⚙️ Forge Your Weapon
        </h2>

        {/* Selected Crystal reminder */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: `rgba(${hexToRgb(crystal.hex)}, 0.08)`,
          border: `1px solid ${crystal.hex}40`,
          borderRadius: 30, padding: "8px 20px",
        }}>
          <div style={{
            width: 12, height: 12, borderRadius: "50%",
            background: crystal.hex,
            boxShadow: `0 0 8px ${crystal.hex}`,
          }} />
          <span style={{ color: crystal.hex, fontSize: 13, fontWeight: 600 }}>
            {crystal.name}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 8, marginBottom: 24,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        paddingBottom: 0,
      }}>
        {["hilt", "color"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${tab === t ? "#FFD700" : "transparent"}`,
              color: tab === t ? "#FFD700" : "#555",
              padding: "10px 20px",
              cursor: "pointer", fontSize: 13,
              fontWeight: 700, letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: "Trebuchet MS, sans-serif",
              transition: "all 0.2s",
              marginBottom: "-1px",
            }}
          >
            {t === "hilt" ? `⚙️ Hilt Style ${selectedHilt ? "✓" : ""}` : `🎨 Blade Color ${selectedColor ? "✓" : ""}`}
          </button>
        ))}
      </div>

      {/* Hilt Selection */}
      {tab === "hilt" && (
        <div>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 20 }}>
            Choose the hilt that matches your fighting philosophy
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 14,
          }}>
            {hiltStyles.map((hilt) => {
              const isSelected = selectedHilt?.id === hilt.id
              return (
                <div
                  key={hilt.id}
                  onClick={() => setSelectedHilt(hilt)}
                  style={{
                    background: isSelected
                      ? "rgba(255,215,0,0.08)"
                      : "rgba(255,255,255,0.02)",
                    border: `1px solid ${isSelected
                      ? "#FFD700"
                      : "rgba(255,255,255,0.07)"}`,
                    borderRadius: 12, padding: "18px 16px",
                    cursor: "pointer", transition: "all 0.25s",
                    transform: isSelected ? "translateY(-3px)" : "translateY(0)",
                    boxShadow: isSelected
                      ? "0 8px 24px rgba(255,215,0,0.15)"
                      : "none",
                  }}
                >
                  <div style={{
                    fontSize: 32, marginBottom: 10,
                    filter: isSelected
                      ? "drop-shadow(0 0 10px #FFD700)"
                      : "none",
                    transition: "filter 0.3s",
                  }}>
                    {hilt.icon}
                  </div>
                  <h4 style={{
                    color: isSelected ? "#FFD700" : "#ccc",
                    fontSize: 14, fontWeight: 700,
                    marginBottom: 4, letterSpacing: 1,
                    transition: "color 0.2s",
                  }}>
                    {hilt.name}
                  </h4>
                  <p style={{
                    color: isSelected ? "#FFD700" : "#AB47BC",
                    fontSize: 10, letterSpacing: 2,
                    marginBottom: 8, opacity: 0.8,
                  }}>
                    {hilt.combatStyle}
                  </p>
                  <div style={{
                    display: "flex", gap: 6, flexWrap: "wrap",
                    marginBottom: 8,
                  }}>
                    <span style={{
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: 4, padding: "2px 8px",
                      color: "#666", fontSize: 10,
                    }}>
                      {hilt.difficulty}
                    </span>
                    <span style={{
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: 4, padding: "2px 8px",
                      color: "#666", fontSize: 10,
                    }}>
                      Range: {hilt.range}
                    </span>
                  </div>
                  <p style={{ color: "#555", fontSize: 11, lineHeight: 1.6 }}>
                    {hilt.desc.substring(0, 80)}...
                  </p>
                  <p style={{ color: "#444", fontSize: 10, marginTop: 8 }}>
                    Used by: {hilt.famousUsers}
                  </p>
                </div>
              )
            })}
          </div>

          {selectedHilt && (
            <button
              onClick={() => setTab("color")}
              style={{
                marginTop: 24, width: "100%",
                background: "rgba(255,215,0,0.1)",
                border: "2px solid #FFD700",
                color: "#FFD700", padding: "14px",
                borderRadius: 8, cursor: "pointer",
                fontSize: 15, fontWeight: 700,
                letterSpacing: 2,
                fontFamily: "Trebuchet MS, sans-serif",
              }}
            >
              NEXT — CHOOSE BLADE COLOR →
            </button>
          )}
        </div>
      )}

      {/* Blade Color Selection */}
      {tab === "color" && (
        <div>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 20 }}>
            Choose the blade color that resonates with your Force connection
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 12,
          }}>
            {bladeColors.map((color) => {
              const isSelected = selectedColor?.color === color.color
              return (
                <div
                  key={color.color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    background: isSelected
                      ? `rgba(${hexToRgb(color.hex)}, 0.12)`
                      : "rgba(255,255,255,0.02)",
                    border: `2px solid ${isSelected
                      ? color.hex
                      : "rgba(255,255,255,0.07)"}`,
                    borderRadius: 12, padding: "18px 14px",
                    cursor: "pointer", textAlign: "center",
                    transition: "all 0.25s",
                    transform: isSelected ? "translateY(-3px)" : "translateY(0)",
                    boxShadow: isSelected
                      ? `0 8px 24px ${color.hex}30`
                      : "none",
                  }}
                >
                  {/* Color Orb */}
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: "50%",
                    background: color.hex,
                    margin: "0 auto 12px",
                    boxShadow: isSelected
                      ? `0 0 20px ${color.hex}, 0 0 40px ${color.hex}60`
                      : `0 0 8px ${color.hex}60`,
                    transition: "box-shadow 0.3s",
                  }} />
                  <p style={{
                    color: isSelected ? color.hex : "#ccc",
                    fontSize: 14, fontWeight: 700,
                    marginBottom: 4, transition: "color 0.2s",
                  }}>
                    {color.color}
                  </p>
                  <p style={{ color: "#666", fontSize: 11, marginBottom: 4 }}>
                    {color.meaning}
                  </p>
                  <p style={{ color: "#444", fontSize: 10 }}>
                    {color.emotion}
                  </p>
                </div>
              )
            })}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <button
              onClick={() => setTab("hilt")}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#666", padding: "12px 24px",
                borderRadius: 8, cursor: "pointer",
                fontSize: 13, fontFamily: "Trebuchet MS, sans-serif",
              }}
            >
              ← Back to Hilt
            </button>

            {selectedColor && (
              <button
                onClick={handleComplete}
                style={{
                  flex: 1,
                  background: `rgba(${hexToRgb(selectedColor.hex)}, 0.12)`,
                  border: `2px solid ${selectedColor.hex}`,
                  color: selectedColor.hex, padding: "14px",
                  borderRadius: 8, cursor: "pointer",
                  fontSize: 15, fontWeight: 700,
                  letterSpacing: 2,
                  fontFamily: "Trebuchet MS, sans-serif",
                  boxShadow: `0 0 20px ${selectedColor.hex}30`,
                }}
              >
                ⚔️ FORGE MY LIGHTSABER
              </button>
            )}
          </div>
        </div>
      )}

      <button
        onClick={onBack}
        style={{
          marginTop: 16, background: "transparent",
          border: "none", color: "#444",
          cursor: "pointer", fontSize: 13,
          fontFamily: "Trebuchet MS, sans-serif", padding: "8px 0",
        }}
      >
        ← Back to Crystal
      </button>
    </div>
  )
}

const hexToRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "255,215,0"
}

export default HiltSelector
