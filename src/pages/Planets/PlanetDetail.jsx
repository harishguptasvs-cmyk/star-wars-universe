import { useParams, useNavigate } from "react-router-dom"
import { planets } from "../../data/planets"
import { characters } from "../../data/characters"
import { planetImages } from "../../data/imageMap"
import StarWarsImage from "../../components/StarWarsImage"

const hexToRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "255,215,0"
}

const getDangerColor = (level) => {
  if (level >= 9) return "#EF5350"
  if (level >= 7) return "#FF9800"
  if (level >= 5) return "#FDD835"
  return "#66BB6A"
}

const getDangerLabel = (level) => {
  if (level >= 9) return "EXTREMELY DANGEROUS"
  if (level >= 7) return "DANGEROUS"
  if (level >= 5) return "MODERATE"
  if (level >= 3) return "RELATIVELY SAFE"
  return "SAFE"
}

const PlanetDetail = () => {
  const { name } = useParams()
  const navigate = useNavigate()

  const planet = planets.find(
    (p) => p.name.replace(/\s+/g, "-").toLowerCase() === name
  )

  if (!planet) {
    return (
      <div style={{
        minHeight: "calc(100vh - 70px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        color: "#666",
      }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🔭</div>
        <p style={{ fontSize: 18, letterSpacing: 2 }}>
          Planet not found in the galaxy...
        </p>
        <button
          onClick={() => navigate("/planets")}
          style={{
            marginTop: 24,
            background: "rgba(255,215,0,0.1)",
            border: "2px solid #FFD700",
            color: "#FFD700", padding: "12px 30px",
            borderRadius: 8, cursor: "pointer",
            fontSize: 14, fontFamily: "Trebuchet MS, sans-serif",
          }}
        >
          ← Back to Planets
        </button>
      </div>
    )
  }

  const relatedChars = characters.filter((c) =>
    planet.famousCharacters
      .split(",")
      .some((charName) =>
        c.name.toLowerCase().includes(charName.trim().toLowerCase())
      )
  )

  return (
    <div style={{ minHeight: "calc(100vh - 70px)", position: "relative" }}>

      {/* Atmospheric Glow */}
      <div style={{
        position: "fixed", inset: 0,
        zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 60% 20%, ${planet.themeColor}15 0%, transparent 60%)`,
      }} />

      <div style={{
        maxWidth: 960, margin: "0 auto",
        padding: "40px 24px",
        position: "relative", zIndex: 1,
      }}>

        {/* Back Button */}
        <button
          onClick={() => navigate("/planets")}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#888", padding: "8px 16px",
            borderRadius: 6, cursor: "pointer",
            fontSize: 13, marginBottom: 32,
            fontFamily: "Trebuchet MS, sans-serif",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = planet.themeColor
            e.target.style.color = planet.themeColor
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.15)"
            e.target.style.color = "#888"
          }}
        >
          ← Back to Planets
        </button>

        {/* Hero Section */}
        <div style={{
          display: "flex", gap: 40,
          marginBottom: 40, flexWrap: "wrap",
        }}>

          {/* Planet Icon Panel */}
          <div style={{
            background: `rgba(${hexToRgb(planet.themeColor)}, 0.08)`,
            border: `1px solid ${planet.themeColor}40`,
            borderRadius: 20, padding: "40px 32px",
            textAlign: "center", minWidth: 200,
            boxShadow: `0 0 60px ${planet.themeColor}15`,
            flex: "0 0 auto",
          }}>
            <StarWarsImage
  src={planetImages[planet.id]}
  alt={planet.name}
  fallbackIcon={planet.icon}
  height={200}
  borderRadius={12}
  objectPosition="center"
/>

            {/* Danger Badge */}
            <div style={{
              background: `rgba(${hexToRgb(getDangerColor(planet.dangerLevel))}, 0.15)`,
              border: `1px solid ${getDangerColor(planet.dangerLevel)}`,
              color: getDangerColor(planet.dangerLevel),
              padding: "6px 16px", borderRadius: 20,
              fontSize: 11, fontWeight: 700,
              letterSpacing: 1, marginBottom: 12,
            }}>
              ⚠️ {getDangerLabel(planet.dangerLevel)}
            </div>

            {/* Danger Bar */}
            <div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}>
                <span style={{ color: "#555", fontSize: 10 }}>DANGER</span>
                <span style={{
                  color: getDangerColor(planet.dangerLevel),
                  fontSize: 10, fontWeight: 700,
                }}>
                  {planet.dangerLevel}/10
                </span>
              </div>
              <div style={{
                width: "100%", height: 4,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 2, overflow: "hidden",
              }}>
                <div style={{
                  width: `${planet.dangerLevel * 10}%`,
                  height: "100%",
                  background: getDangerColor(planet.dangerLevel),
                  borderRadius: 2,
                  boxShadow: `0 0 8px ${getDangerColor(planet.dangerLevel)}`,
                }} />
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{
              color: planet.themeColor, fontSize: 12,
              letterSpacing: 4, marginBottom: 8, opacity: 0.8,
            }}>
              GALACTIC ATLAS — PLANET PROFILE
            </p>

            <h1 style={{
              color: "#FFD700",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 900, letterSpacing: 4,
              textTransform: "uppercase", fontStyle: "italic",
              marginBottom: 8,
              textShadow: `0 0 30px ${planet.themeColor}60`,
            }}>
              {planet.name}
            </h1>

            <div style={{
              width: 100, height: 2,
              background: `linear-gradient(to right, ${planet.themeColor}, transparent)`,
              marginBottom: 20,
            }} />

            <p style={{
              color: "#aaa", fontSize: 15,
              lineHeight: 1.9, marginBottom: 24, maxWidth: 480,
            }}>
              {planet.famousFor}
            </p>

            {/* Quick Stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 10,
            }}>
              {[
                { label: "CLIMATE", value: planet.climate },
                { label: "TERRAIN", value: planet.terrain },
                { label: "POPULATION", value: planet.population },
                { label: "FACTION", value: planet.faction },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8, padding: "10px 14px",
                }}>
                  <p style={{
                    color: planet.themeColor,
                    fontSize: 10, letterSpacing: 2, marginBottom: 4,
                  }}>
                    {stat.label}
                  </p>
                  <p style={{ color: "#ccc", fontSize: 13 }}>
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
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16, marginBottom: 32,
        }}>
          {[
            { label: "INHABITANTS", value: planet.species, icon: "👥" },
            { label: "MAJOR EVENTS", value: planet.majorEvents, icon: "⚔️" },
            { label: "FAMOUS FOR", value: planet.famousFor, icon: "🌟" },
            { label: "ATMOSPHERE", value: planet.ambientStyle, icon: "🌌" },
            { label: "APPEARANCES", value: planet.movies, icon: "🎬" },
            { label: "GOVERNMENT", value: planet.government, icon: "🏛️" },
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
                (e.currentTarget.style.borderColor = `${planet.themeColor}40`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
              }
            >
              <p style={{
                color: planet.themeColor,
                fontSize: 11, letterSpacing: 2, marginBottom: 8,
              }}>
                {item.icon} {item.label}
              </p>
              <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.6 }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Famous Characters */}
        {relatedChars.length > 0 && (
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24, marginBottom: 24,
          }}>
            <p style={{
              color: "#444", fontSize: 12,
              letterSpacing: 3, marginBottom: 20,
            }}>
              LEGENDARY FIGURES FROM THIS WORLD
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
        )}

        {/* Other Planets */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 24,
        }}>
          <p style={{
            color: "#444", fontSize: 12,
            letterSpacing: 3, marginBottom: 20,
          }}>
            OTHER WORLDS
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {planets
              .filter((p) => p.id !== planet.id)
              .slice(0, 6)
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() =>
                    navigate(`/planets/${p.name.replace(/\s+/g, "-").toLowerCase()}`)
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
                    e.currentTarget.style.borderColor = p.themeColor
                    e.currentTarget.style.color = p.themeColor
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                    e.currentTarget.style.color = "#888"
                  }}
                >
                  {p.icon} {p.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanetDetail