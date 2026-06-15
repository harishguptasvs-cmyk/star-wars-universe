import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { planets } from "../../data/planets"
import PlanetOrb from "../../components/PlanetOrb"

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

const Planets = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [factionFilter, setFactionFilter] = useState("All")
  const [hoveredId, setHoveredId] = useState(null)

  const factions = [
    "All", "Jedi", "Sith", "Empire",
    "Rebel Alliance", "Mandalorians", "Neutral",
  ]

  const filtered = planets.filter((p) => {
    const matchesFaction =
      factionFilter === "All" ||
      p.faction.toLowerCase().includes(factionFilter.toLowerCase())
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.climate.toLowerCase().includes(search.toLowerCase()) ||
      p.species.toLowerCase().includes(search.toLowerCase())
    return matchesFaction && matchesSearch
  })

  return (
    <div style={{ padding: "30px 24px", maxWidth: 1200, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ color: "#666", fontSize: 12, letterSpacing: 4, marginBottom: 6 }}>
          GALACTIC ATLAS
        </p>
        <h1 style={{
          color: "#FFD700",
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 900, letterSpacing: 6,
          textTransform: "uppercase", fontStyle: "italic",
          marginBottom: 8,
          textShadow: "0 0 30px rgba(255,215,0,0.4)",
        }}>
          🌍 Planets
        </h1>
        <div style={{
          width: 120, height: 2,
          background: "linear-gradient(to right, #FFD700, transparent)",
          marginBottom: 8,
        }} />
        <p style={{ color: "#555", fontSize: 13 }}>
          {filtered.length} of {planets.length} worlds discovered
        </p>
      </div>

      {/* Search + Filters */}
      <div style={{
        display: "flex", gap: 12,
        marginBottom: 32, flexWrap: "wrap", alignItems: "center",
      }}>
        <input
          placeholder="🔍  Search planets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,215,0,0.2)",
            borderRadius: 8, padding: "10px 16px",
            color: "white", fontSize: 14,
            outline: "none", width: "240px",
            fontFamily: "Trebuchet MS, sans-serif",
          }}
        />
        {factions.map((f) => (
          <button
            key={f}
            onClick={() => setFactionFilter(f)}
            style={{
              background: factionFilter === f
                ? "rgba(255,215,0,0.15)" : "transparent",
              border: `1px solid ${factionFilter === f
                ? "#FFD700" : "rgba(255,255,255,0.1)"}`,
              color: factionFilter === f ? "#FFD700" : "#666",
              padding: "7px 16px", borderRadius: 20,
              cursor: "pointer", fontSize: 12,
              fontWeight: 600, letterSpacing: 1,
              transition: "all 0.2s",
              fontFamily: "Trebuchet MS, sans-serif",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Planet Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#444" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔭</div>
          <p style={{ fontSize: 16, letterSpacing: 2 }}>
            No planets found in this region...
          </p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}>
          {filtered.map((planet) => (
            <div
              key={planet.id}
              onClick={() =>
                navigate(`/planets/${planet.name.replace(/\s+/g, "-").toLowerCase()}`)
              }
              onMouseEnter={() => setHoveredId(planet.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: hoveredId === planet.id
                  ? `rgba(${hexToRgb(planet.themeColor)}, 0.07)`
                  : "rgba(255,255,255,0.02)",
                border: `1px solid ${hoveredId === planet.id
                  ? planet.themeColor : "rgba(255,255,255,0.07)"}`,
                borderRadius: 14, padding: "24px 20px",
                cursor: "pointer", transition: "all 0.3s ease",
                transform: hoveredId === planet.id
                  ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hoveredId === planet.id
                  ? `0 12px 40px ${planet.themeColor}25` : "none",
              }}
            >
              {/* Planet Orb */}
              <div style={{ padding: "8px 0 16px" }}>
                <PlanetOrb planet={planet} size={100} />
              </div>

              {/* Name */}
              <h3 style={{
                color: hoveredId === planet.id ? planet.themeColor : "#FFD700",
                fontSize: 15, fontWeight: 800,
                textAlign: "center", letterSpacing: 1,
                marginBottom: 6, transition: "color 0.3s",
              }}>
                {planet.name}
              </h3>

              {/* Climate */}
              <p style={{
                color: planet.themeColor, fontSize: 11,
                textAlign: "center", letterSpacing: 2,
                marginBottom: 12, opacity: 0.8,
              }}>
                {planet.climate}
              </p>

              {/* Danger Level */}
              <div style={{ marginBottom: 12 }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}>
                  <span style={{ color: "#555", fontSize: 10, letterSpacing: 1 }}>
                    DANGER LEVEL
                  </span>
                  <span style={{
                    color: getDangerColor(planet.dangerLevel),
                    fontSize: 10, fontWeight: 700,
                  }}>
                    {planet.dangerLevel}/10
                  </span>
                </div>
                <div style={{
                  width: "100%", height: 3,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 2, overflow: "hidden",
                }}>
                  <div style={{
                    width: `${planet.dangerLevel * 10}%`,
                    height: "100%",
                    background: getDangerColor(planet.dangerLevel),
                    borderRadius: 2,
                    boxShadow: `0 0 6px ${getDangerColor(planet.dangerLevel)}`,
                    transition: "width 0.5s ease",
                  }} />
                </div>
              </div>

              {/* Faction */}
              <p style={{
                color: "#444", fontSize: 11,
                textAlign: "center", marginBottom: 10,
              }}>
                {planet.faction}
              </p>

              {/* Species */}
              <p style={{ color: "#383838", fontSize: 11, textAlign: "center" }}>
                {planet.species.split(",")[0]}
              </p>

              {/* Hover Arrow */}
              <div style={{
                textAlign: "center", marginTop: 14,
                color: planet.themeColor, fontSize: 11, letterSpacing: 2,
                opacity: hoveredId === planet.id ? 1 : 0,
                transform: hoveredId === planet.id
                  ? "translateY(0)" : "translateY(6px)",
                transition: "all 0.3s",
              }}>
                VISIT PLANET →
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Planets