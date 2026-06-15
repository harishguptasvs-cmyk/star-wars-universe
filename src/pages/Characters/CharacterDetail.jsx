import { useParams, useNavigate } from "react-router-dom"
import { characters } from "../../data/characters"
import Button from "../../components/Button"
import StarWarsImage from "../../components/StarWarsImage"
import { getCharacterImage } from "../../utils/getCharacterImage"

const hexToRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "255,215,0"
}

const CharacterDetail = () => {
  const { name } = useParams()
  const navigate = useNavigate()

  const char = characters.find(
    (c) => c.name.replace(/\s+/g, "-").toLowerCase() === name
  )

  if (!char) {
    return (
      <div style={{
        minHeight: "calc(100vh - 70px)", display: "flex",
        flexDirection: "column", alignItems: "center",
        justifyContent: "center", color: "#666",
      }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🔭</div>
        <p style={{ fontSize: 18, letterSpacing: 2 }}>
          Character not found in the galaxy...
        </p>
        <Button onClick={() => navigate("/characters")} style={{ marginTop: 24 }}>
          ← Back to Characters
        </Button>
      </div>
    )
  }

  const sideColor =
    char.side === "Jedi" ? "#4FC3F7" :
    char.side === "Sith" ? "#EF5350" : "#B0BEC5"

  return (
    <div style={{ minHeight: "calc(100vh - 70px)", position: "relative" }}>

      {/* Atmospheric Background Glow */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 60% 30%, ${char.themeColor}12 0%, transparent 60%)`,
      }} />

      <div style={{
        maxWidth: 900, margin: "0 auto",
        padding: "40px 24px", position: "relative", zIndex: 1,
      }}>

        {/* Back Button */}
        <button
          onClick={() => navigate("/characters")}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#888", padding: "8px 16px",
            borderRadius: 6, cursor: "pointer",
            fontSize: 13, marginBottom: 32,
            fontFamily: "Trebuchet MS, sans-serif",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = char.themeColor
            e.target.style.color = char.themeColor
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.15)"
            e.target.style.color = "#888"
          }}
        >
          ← Back to Characters
        </button>

        {/* Hero Section */}
        <div style={{
          display: "flex", gap: 40, marginBottom: 40,
          flexWrap: "wrap", alignItems: "flex-start",
        }}>

          {/* Image Panel */}
          <div style={{
            background: `rgba(${hexToRgb(char.themeColor)}, 0.06)`,
            border: `1px solid ${char.themeColor}40`,
            borderRadius: 20,
            overflow: "hidden",
            textAlign: "center", minWidth: 220,
            boxShadow: `0 0 40px ${char.themeColor}15`,
            flex: "0 0 auto",
          }}>
            {/* Character Image */}
            <StarWarsImage
              src={getCharacterImage(char.id)}
              alt={char.name}
              fallbackIcon={char.icon}
              fallbackColor={char.themeColor}
              height={280}
              borderRadius={0}
              objectPosition="top center"
            />

            <div style={{ padding: "16px" }}>
              {/* Side Badge */}
              <div style={{
                background: `rgba(${hexToRgb(sideColor)}, 0.15)`,
                border: `1px solid ${sideColor}`,
                color: sideColor,
                padding: "6px 20px", borderRadius: 20,
                fontSize: 13, fontWeight: 700,
                letterSpacing: 1, marginBottom: 12,
                display: "inline-block",
              }}>
                {char.side === "Jedi" ? "✨" : char.side === "Sith" ? "😈" : "⚪"} {char.side}
              </div>

              {/* Lightsaber */}
              {char.lightsaber !== "None" && char.lightsaber !== "None Yet" && (
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8, padding: "8px 12px",
                  color: char.themeColor, fontSize: 12,
                  fontWeight: 600,
                }}>
                  ⚔️ {char.lightsaber}
                </div>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{
              color: char.themeColor, fontSize: 12,
              letterSpacing: 4, marginBottom: 8, opacity: 0.8,
            }}>
              GALACTIC DATABANK — PROFILE
            </p>

            <h1 style={{
              color: "#FFD700",
              fontSize: "clamp(26px, 5vw, 44px)",
              fontWeight: 900, letterSpacing: 4,
              textTransform: "uppercase", fontStyle: "italic",
              marginBottom: 8,
              textShadow: `0 0 30px ${char.themeColor}60`,
            }}>
              {char.name}
            </h1>

            <div style={{
              width: 100, height: 2,
              background: `linear-gradient(to right, ${char.themeColor}, transparent)`,
              marginBottom: 20,
            }} />

            <p style={{
              color: "#aaa", fontSize: 15, lineHeight: 1.9,
              marginBottom: 24, maxWidth: 480,
            }}>
              {char.desc}
            </p>

            {/* Quick Stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 10,
            }}>
              {[
                { label: "ERA", value: char.era },
                { label: "HOMEWORLD", value: char.homeworld },
                { label: "SPECIES", value: char.species },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8, padding: "10px 14px",
                }}>
                  <p style={{
                    color: char.themeColor, fontSize: 10,
                    letterSpacing: 2, marginBottom: 4,
                  }}>
                    {stat.label}
                  </p>
                  <p style={{ color: "#ccc", fontSize: 13, fontWeight: 600 }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16, marginBottom: 32,
        }}>
          {[
            { label: "ABILITIES", value: char.ability, icon: "⚡" },
            { label: "LIGHTSABER", value: char.lightsaber, icon: "⚔️" },
            { label: "MASTER", value: char.master, icon: "🎓" },
            { label: "APPRENTICE", value: char.apprentice, icon: "📚" },
            { label: "APPEARANCES", value: char.appearances, icon: "🎬" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12, padding: "18px 20px",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = `${char.themeColor}40`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
              }
            >
              <p style={{
                color: char.themeColor, fontSize: 11,
                letterSpacing: 2, marginBottom: 8,
              }}>
                {item.icon} {item.label}
              </p>
              <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.6 }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Related Characters */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 24, marginBottom: 16,
        }}>
          <p style={{ color: "#444", fontSize: 12, letterSpacing: 3, marginBottom: 20 }}>
            OTHER LEGENDS
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {characters
              .filter((c) => c.id !== char.id && c.side === char.side)
              .slice(0, 5)
              .map((c) => (
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
                    e.currentTarget.style.borderColor = c.themeColor
                    e.currentTarget.style.color = c.themeColor
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
      </div>
    </div>
  )
}

export default CharacterDetail