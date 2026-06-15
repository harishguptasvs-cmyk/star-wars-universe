import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { characters } from "../../data/characters"
import StarWarsImage from "../../components/StarWarsImage"
import { getCharacterImage } from "../../utils/getCharacterImage"

const hexToRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "255,215,0"
}

const Characters = () => {
  const navigate = useNavigate()
  const [sideFilter, setSideFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [hoveredId, setHoveredId] = useState(null)

  const filtered = characters.filter((c) => {
    const matchesSide = sideFilter === "All" || c.side === sideFilter
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.era.toLowerCase().includes(search.toLowerCase()) ||
      c.species.toLowerCase().includes(search.toLowerCase())
    return matchesSide && matchesSearch
  })

  const sideColors = {
    Jedi: "#4FC3F7",
    Sith: "#EF5350",
    Neutral: "#B0BEC5",
  }

  return (
    <div style={{ padding: "30px 24px", maxWidth: 1200, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ color: "#666", fontSize: 12, letterSpacing: 4, marginBottom: 6 }}>
          GALACTIC DATABANK
        </p>
        <h1 style={{
          color: "#FFD700",
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 900, letterSpacing: 6,
          textTransform: "uppercase", fontStyle: "italic",
          marginBottom: 8,
          textShadow: "0 0 30px rgba(255,215,0,0.4)",
        }}>
          👤 Characters
        </h1>
        <div style={{
          width: 120, height: 2,
          background: "linear-gradient(to right, #FFD700, transparent)",
          marginBottom: 8,
        }} />
        <p style={{ color: "#555", fontSize: 13 }}>
          {filtered.length} of {characters.length} legends found
        </p>
      </div>

      {/* Search + Filters */}
      <div style={{
        display: "flex", gap: 12, marginBottom: 32,
        flexWrap: "wrap", alignItems: "center",
      }}>
        <input
          placeholder="🔍  Search characters..."
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

        {["All", "Jedi", "Sith", "Neutral"].map((s) => (
          <button
            key={s}
            onClick={() => setSideFilter(s)}
            style={{
              background: sideFilter === s
                ? `rgba(${s === "Jedi" ? "79,195,247" : s === "Sith" ? "239,83,80" : s === "Neutral" ? "176,190,197" : "255,215,0"}, 0.15)`
                : "transparent",
              border: `1px solid ${sideFilter === s
                ? (sideColors[s] || "#FFD700")
                : "rgba(255,255,255,0.1)"}`,
              color: sideFilter === s
                ? (sideColors[s] || "#FFD700")
                : "#666",
              padding: "8px 20px", borderRadius: 20,
              cursor: "pointer", fontSize: 13, fontWeight: 600,
              letterSpacing: 1, transition: "all 0.2s",
              fontFamily: "Trebuchet MS, sans-serif",
            }}
          >
            {s === "Jedi" ? "✨" : s === "Sith" ? "😈" : s === "Neutral" ? "⚪" : "🌌"} {s}
          </button>
        ))}
      </div>

      {/* Character Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#444" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔭</div>
          <p style={{ fontSize: 16, letterSpacing: 2 }}>
            No characters found in the galaxy...
          </p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}>
          {filtered.map((char) => (
            <div
              key={char.id}
              onClick={() =>
                navigate(`/characters/${char.name.replace(/\s+/g, "-").toLowerCase()}`)
              }
              onMouseEnter={() => setHoveredId(char.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: hoveredId === char.id
                  ? `rgba(${hexToRgb(char.themeColor)}, 0.07)`
                  : "rgba(255,255,255,0.02)",
                border: `1px solid ${hoveredId === char.id
                  ? char.themeColor
                  : "rgba(255,255,255,0.07)"}`,
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer", transition: "all 0.3s ease",
                transform: hoveredId === char.id
                  ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hoveredId === char.id
                  ? `0 12px 40px ${char.themeColor}25`
                  : "none",
              }}
            >
              {/* Character Image */}
              <StarWarsImage
                src={getCharacterImage(char.id)}
                alt={char.name}
                fallbackIcon={char.icon}
                fallbackColor={char.themeColor}
                height={200}
                borderRadius={0}
                objectPosition="top center"
              />

              <div style={{ padding: "14px 16px" }}>
                {/* Name */}
                <h3 style={{
                  color: hoveredId === char.id ? char.themeColor : "#FFD700",
                  fontSize: 14, fontWeight: 800,
                  textAlign: "center", letterSpacing: 1,
                  marginBottom: 8, transition: "color 0.3s",
                }}>
                  {char.name}
                </h3>

                {/* Side Badge */}
                <div style={{ textAlign: "center", marginBottom: 8 }}>
                  <span style={{
                    background: `rgba(${hexToRgb(sideColors[char.side] || "#B0BEC5")}, 0.12)`,
                    border: `1px solid ${sideColors[char.side] || "#B0BEC5"}`,
                    color: sideColors[char.side] || "#B0BEC5",
                    padding: "3px 12px", borderRadius: 20,
                    fontSize: 11, fontWeight: 600,
                  }}>
                    {char.side}
                  </span>
                </div>

                {/* Era */}
                <p style={{
                  color: "#555", fontSize: 11,
                  textAlign: "center", letterSpacing: 1,
                }}>
                  {char.era}
                </p>

                {/* Hover Arrow */}
                <div style={{
                  textAlign: "center", marginTop: 10,
                  color: char.themeColor, fontSize: 11, letterSpacing: 2,
                  opacity: hoveredId === char.id ? 1 : 0,
                  transform: hoveredId === char.id
                    ? "translateY(0)" : "translateY(6px)",
                  transition: "all 0.3s",
                }}>
                  VIEW PROFILE →
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Characters