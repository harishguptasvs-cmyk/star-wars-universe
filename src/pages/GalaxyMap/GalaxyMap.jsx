import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { planets } from "../../data/planets"

const GalaxyMap = () => {
  const navigate = useNavigate()
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const [hoveredPlanet, setHoveredPlanet] = useState(null)

  const getDangerColor = (level) => {
    if (level >= 9) return "#EF5350"
    if (level >= 7) return "#FF9800"
    if (level >= 5) return "#FDD835"
    return "#66BB6A"
  }

  return (
    <div style={{ padding: "30px 24px", maxWidth: 1200, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ color: "#666", fontSize: 12, letterSpacing: 4, marginBottom: 6 }}>
          GALACTIC COMMAND CENTER
        </p>
        <h1 style={{
          color: "#FFD700",
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 900, letterSpacing: 6,
          textTransform: "uppercase", fontStyle: "italic",
          marginBottom: 8,
          textShadow: "0 0 30px rgba(255,215,0,0.4)",
        }}>
          🗺️ Galaxy Map
        </h1>
        <div style={{
          width: 120, height: 2,
          background: "linear-gradient(to right, #FFD700, transparent)",
          marginBottom: 8,
        }} />
        <p style={{ color: "#555", fontSize: 13 }}>
          {planets.length} worlds charted — Click any planet to explore
        </p>
      </div>

      {/* Legend */}
      <div style={{
        display: "flex", gap: 20, marginBottom: 20,
        flexWrap: "wrap",
      }}>
        {[
          { color: "#EF5350", label: "Extreme Danger (9-10)" },
          { color: "#FF9800", label: "Dangerous (7-8)" },
          { color: "#FDD835", label: "Moderate (5-6)" },
          { color: "#66BB6A", label: "Safe (1-4)" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: item.color,
              boxShadow: `0 0 6px ${item.color}`,
            }} />
            <span style={{ color: "#555", fontSize: 11, letterSpacing: 1 }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Map + Detail Layout */}
      <div style={{
        display: "flex", gap: 20,
        alignItems: "flex-start", flexWrap: "wrap",
      }}>

        {/* Galaxy Map */}
        <div style={{
          flex: 1, minWidth: 300,
          position: "relative",
          background: "rgba(255,255,255,0.01)",
          border: "1px solid rgba(255,215,0,0.15)",
          borderRadius: 16, overflow: "hidden",
          minHeight: 500,
        }}>

          {/* Map Background Glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 50%, rgba(20,40,100,0.3) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Grid Lines */}
          <svg
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              opacity: 0.08,
            }}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <line
                key={`h${i}`}
                x1="0" y1={`${i * 10}%`}
                x2="100%" y2={`${i * 10}%`}
                stroke="#4FC3F7" strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 10 }, (_, i) => (
              <line
                key={`v${i}`}
                x1={`${i * 10}%`} y1="0"
                x2={`${i * 10}%`} y2="100%"
                stroke="#4FC3F7" strokeWidth="0.5"
              />
            ))}
          </svg>

          {/* Galaxy Core */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 80, height: 80,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,215,0,0.15), transparent)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }} />

          {/* Region Labels */}
          {[
            { label: "OUTER RIM", x: "8%", y: "8%" },
            { label: "MID RIM", x: "65%", y: "12%" },
            { label: "CORE WORLDS", x: "42%", y: "38%" },
            { label: "WILD SPACE", x: "80%", y: "78%" },
          ].map((region) => (
            <div
              key={region.label}
              style={{
                position: "absolute",
                left: region.x, top: region.y,
                color: "rgba(255,215,0,0.15)",
                fontSize: 9, letterSpacing: 3,
                fontWeight: 700, pointerEvents: "none",
                textTransform: "uppercase",
              }}
            >
              {region.label}
            </div>
          ))}

          {/* Planet Dots */}
          <div style={{ position: "relative", width: "100%", paddingBottom: "65%" }}>
            {planets.map((planet) => {
              const isSelected = selectedPlanet?.id === planet.id
              const isHovered = hoveredPlanet?.id === planet.id
              const dangerColor = getDangerColor(planet.dangerLevel)

              return (
                <div
                  key={planet.id}
                  onClick={() => setSelectedPlanet(
                    selectedPlanet?.id === planet.id ? null : planet
                  )}
                  onMouseEnter={() => setHoveredPlanet(planet)}
                  onMouseLeave={() => setHoveredPlanet(null)}
                  style={{
                    position: "absolute",
                    left: `${planet.coords.x}%`,
                    top: `${planet.coords.y}%`,
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                    zIndex: isSelected || isHovered ? 10 : 1,
                  }}
                >
                  {/* Outer Ring — Selected */}
                  {isSelected && (
                    <div style={{
                      position: "absolute",
                      top: "50%", left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 40, height: 40,
                      borderRadius: "50%",
                      border: `1px solid ${dangerColor}`,
                      opacity: 0.5,
                      animation: "pulse 1.5s ease-in-out infinite",
                    }} />
                  )}

                  {/* Glow Ring */}
                  <div style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: isSelected ? 28 : isHovered ? 24 : 18,
                    height: isSelected ? 28 : isHovered ? 24 : 18,
                    borderRadius: "50%",
                    background: `${dangerColor}20`,
                    border: `1px solid ${dangerColor}50`,
                    transition: "all 0.2s ease",
                  }} />

                  {/* Planet Core Dot */}
                  <div style={{
                    width: isSelected ? 14 : isHovered ? 12 : 9,
                    height: isSelected ? 14 : isHovered ? 12 : 9,
                    borderRadius: "50%",
                    background: dangerColor,
                    boxShadow: `0 0 ${isSelected ? 16 : isHovered ? 12 : 6}px ${dangerColor}`,
                    transition: "all 0.2s ease",
                    position: "relative",
                    zIndex: 2,
                  }} />

                  {/* Planet Name Label */}
                  <div style={{
                    position: "absolute",
                    top: "100%", left: "50%",
                    transform: "translateX(-50%)",
                    marginTop: 6,
                    whiteSpace: "nowrap",
                    fontSize: isSelected || isHovered ? 11 : 9,
                    color: isSelected
                      ? "#FFD700"
                      : isHovered
                        ? planet.themeColor
                        : "rgba(255,255,255,0.5)",
                    fontWeight: isSelected ? 800 : 600,
                    letterSpacing: 1,
                    textShadow: "0 0 8px rgba(0,0,0,1)",
                    transition: "all 0.2s ease",
                    pointerEvents: "none",
                  }}>
                    {planet.icon} {planet.name}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Map Footer */}
          <div style={{
            position: "absolute", bottom: 12, left: 16,
            color: "rgba(255,215,0,0.2)",
            fontSize: 9, letterSpacing: 3,
          }}>
            STAR WARS GALAXY — CLASSIFIED
          </div>

          {/* Coordinates */}
          {hoveredPlanet && (
            <div style={{
              position: "absolute", bottom: 12, right: 16,
              color: "rgba(255,215,0,0.4)",
              fontSize: 9, letterSpacing: 2, fontFamily: "monospace",
            }}>
              X:{hoveredPlanet.coords.x} Y:{hoveredPlanet.coords.y}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div style={{
          width: 300, flexShrink: 0,
          minHeight: 500,
        }}>
          {selectedPlanet ? (
            <div style={{
              background: `rgba(${hexToRgb(selectedPlanet.themeColor)}, 0.05)`,
              border: `1px solid ${selectedPlanet.themeColor}40`,
              borderRadius: 16, padding: 24,
              animation: "slideIn 0.3s ease",
            }}>

              {/* Planet Icon */}
              <div style={{
                fontSize: 64, textAlign: "center", marginBottom: 16,
                filter: `drop-shadow(0 0 20px ${selectedPlanet.themeColor})`,
                animation: "float 4s ease-in-out infinite",
              }}>
                {selectedPlanet.icon}
              </div>

              {/* Planet Name */}
              <h2 style={{
                color: "#FFD700", fontSize: 22,
                fontWeight: 900, textAlign: "center",
                letterSpacing: 2, marginBottom: 4,
                textTransform: "uppercase", fontStyle: "italic",
              }}>
                {selectedPlanet.name}
              </h2>

              {/* Climate */}
              <p style={{
                color: selectedPlanet.themeColor,
                fontSize: 11, textAlign: "center",
                letterSpacing: 3, marginBottom: 16, opacity: 0.8,
              }}>
                {selectedPlanet.climate}
              </p>

              {/* Danger Bar */}
              <div style={{ marginBottom: 16 }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  marginBottom: 4,
                }}>
                  <span style={{ color: "#555", fontSize: 10, letterSpacing: 1 }}>
                    DANGER LEVEL
                  </span>
                  <span style={{
                    color: getDangerColor(selectedPlanet.dangerLevel),
                    fontSize: 10, fontWeight: 700,
                  }}>
                    {selectedPlanet.dangerLevel}/10
                  </span>
                </div>
                <div style={{
                  width: "100%", height: 4,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 2, overflow: "hidden",
                }}>
                  <div style={{
                    width: `${selectedPlanet.dangerLevel * 10}%`,
                    height: "100%",
                    background: getDangerColor(selectedPlanet.dangerLevel),
                    borderRadius: 2,
                    boxShadow: `0 0 8px ${getDangerColor(selectedPlanet.dangerLevel)}`,
                  }} />
                </div>
              </div>

              {/* Info Rows */}
              {[
                { label: "FACTION", value: selectedPlanet.faction },
                { label: "CLIMATE", value: selectedPlanet.climate },
                { label: "SPECIES", value: selectedPlanet.species.split(",")[0] },
                { label: "POPULATION", value: selectedPlanet.population },
              ].map((item) => (
                <div key={item.label} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>
                  <span style={{ color: "#555", fontSize: 11, letterSpacing: 1 }}>
                    {item.label}
                  </span>
                  <span style={{ color: "#aaa", fontSize: 11, maxWidth: 140, textAlign: "right" }}>
                    {item.value}
                  </span>
                </div>
              ))}

              {/* Famous For */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 8, padding: 12, margin: "16px 0",
              }}>
                <p style={{
                  color: selectedPlanet.themeColor,
                  fontSize: 10, letterSpacing: 2, marginBottom: 6,
                }}>
                  🌟 FAMOUS FOR
                </p>
                <p style={{ color: "#888", fontSize: 12, lineHeight: 1.7 }}>
                  {selectedPlanet.famousFor}
                </p>
              </div>

              {/* Appearances */}
              <p style={{
                color: "#444", fontSize: 11,
                textAlign: "center", marginBottom: 16,
              }}>
                🎬 {selectedPlanet.movies}
              </p>

              {/* Visit Button */}
              <button
                onClick={() =>
                  navigate(`/planets/${selectedPlanet.name.replace(/\s+/g, "-").toLowerCase()}`)
                }
                style={{
                  width: "100%",
                  background: `rgba(${hexToRgb(selectedPlanet.themeColor)}, 0.1)`,
                  border: `1px solid ${selectedPlanet.themeColor}`,
                  color: selectedPlanet.themeColor,
                  padding: "12px", borderRadius: 8,
                  cursor: "pointer", fontSize: 13,
                  fontWeight: 700, letterSpacing: 2,
                  fontFamily: "Trebuchet MS, sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = `rgba(${hexToRgb(selectedPlanet.themeColor)}, 0.2)`
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = `rgba(${hexToRgb(selectedPlanet.themeColor)}, 0.1)`
                }}
              >
                VISIT PLANET →
              </button>

              {/* Close */}
              <button
                onClick={() => setSelectedPlanet(null)}
                style={{
                  width: "100%", marginTop: 8,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#555", padding: "10px",
                  borderRadius: 8, cursor: "pointer",
                  fontSize: 12, fontFamily: "Trebuchet MS, sans-serif",
                }}
              >
                ✕ Close
              </button>
            </div>
          ) : (
            <div style={{
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16, padding: 32,
              textAlign: "center", minHeight: 300,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                fontSize: 48, marginBottom: 16,
                opacity: 0.3,
                animation: "float 4s ease-in-out infinite",
              }}>
                🗺️
              </div>
              <p style={{
                color: "#333", fontSize: 13,
                lineHeight: 1.8, letterSpacing: 1,
              }}>
                Select a planet on the map to view its galactic profile
              </p>
              <div style={{
                marginTop: 24, display: "flex",
                flexWrap: "wrap", gap: 8,
                justifyContent: "center",
              }}>
                {planets.slice(0, 6).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlanet(p)}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8, padding: "6px 12px",
                      cursor: "pointer", color: "#555",
                      fontSize: 11, transition: "all 0.2s",
                      fontFamily: "Trebuchet MS, sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = p.themeColor
                      e.target.style.color = p.themeColor
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)"
                      e.target.style.color = "#555"
                    }}
                  >
                    {p.icon} {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Planet List Bottom */}
      <div style={{
        marginTop: 32,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: 24,
      }}>
        <p style={{
          color: "#333", fontSize: 11,
          letterSpacing: 3, marginBottom: 16,
        }}>
          ALL CHARTED WORLDS
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {planets.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlanet(p)}
              style={{
                background: selectedPlanet?.id === p.id
                  ? `rgba(${hexToRgb(p.themeColor)}, 0.15)`
                  : "rgba(255,255,255,0.02)",
                border: `1px solid ${selectedPlanet?.id === p.id
                  ? p.themeColor
                  : "rgba(255,255,255,0.07)"}`,
                borderRadius: 8, padding: "6px 14px",
                cursor: "pointer",
                color: selectedPlanet?.id === p.id ? p.themeColor : "#555",
                fontSize: 12, transition: "all 0.2s",
                fontFamily: "Trebuchet MS, sans-serif",
                display: "flex", alignItems: "center", gap: 6,
              }}
              onMouseEnter={(e) => {
                if (selectedPlanet?.id !== p.id) {
                  e.currentTarget.style.borderColor = p.themeColor
                  e.currentTarget.style.color = p.themeColor
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPlanet?.id !== p.id) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"
                  e.currentTarget.style.color = "#555"
                }
              }}
            >
              {p.icon} {p.name}
            </button>
          ))}
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

export default GalaxyMap