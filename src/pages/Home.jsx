import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Button from "../components/Button"

const features = [
  {
    path: "/characters",
    icon: "👤",
    title: "Characters",
    subtitle: "50 Legendary Heroes",
    desc: "Explore the galaxy's most iconic warriors, Jedi, Sith, and legends.",
    color: "#4FC3F7",
    border: "rgba(79,195,247,0.3)",
  },
  {
    path: "/planets",
    icon: "🌍",
    title: "Planets",
    subtitle: "20 Living Worlds",
    desc: "Journey through iconic planets from frozen Hoth to volcanic Mustafar.",
    color: "#66BB6A",
    border: "rgba(102,187,106,0.3)",
  },
  {
    path: "/galaxy",
    icon: "🗺️",
    title: "Galaxy Map",
    subtitle: "Interactive Universe",
    desc: "Navigate the galaxy and discover every world in the Star Wars universe.",
    color: "#FFD700",
    border: "rgba(255,215,0,0.3)",
  },
  {
    path: "/lightsaber",
    icon: "⚔️",
    title: "Lightsaber Builder",
    subtitle: "Build Your Identity",
    desc: "Let the Force choose your crystal and build your unique lightsaber.",
    color: "#AB47BC",
    border: "rgba(171,71,188,0.3)",
  },
  {
    path: "/classifier",
    icon: "🔮",
    title: "Jedi or Sith?",
    subtitle: "Discover Your Destiny",
    desc: "Answer the call of the Force and discover which path awaits you.",
    color: "#EF5350",
    border: "rgba(239,83,80,0.3)",
  },
  {
    path: "/quiz",
    icon: "🧠",
    title: "Galaxy Quiz",
    subtitle: "Test Your Knowledge",
    desc: "How well do you know the galaxy? Prove your Star Wars mastery.",
    color: "#FDD835",
    border: "rgba(253,216,53,0.3)",
  },
]

const Home = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleReplay = () => {
    sessionStorage.removeItem("hasSeenIntro")
    window.location.reload()
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 60,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}
      >
        

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(40px, 10vw, 88px)",
            fontWeight: 900,
            letterSpacing: 12,
            color: "#FFD700",
            textTransform: "uppercase",
            fontStyle: "italic",
            margin: "0 0 8px",
            textShadow:
              "0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.3)",
            lineHeight: 1,
          }}
        >
          STAR WARS
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 13,
            color: "#666",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          A GALAXY FAR, FAR AWAY
        </p>

        {/* Divider */}
        <div
          style={{
            width: 240,
            height: 1,
            background:
              "linear-gradient(to right, transparent, #FFD700, transparent)",
            margin: "0 auto 24px",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: 16,
            color: "#999",
            maxWidth: 540,
            margin: "0 auto 36px",
            lineHeight: 1.9,
            letterSpacing: 0.5,
          }}
        >
          Explore the complete Star Wars universe. Discover legendary characters,
          living worlds, build your lightsaber, and discover your destiny in the
          Force.
        </p>

        {/* CTA Buttons */}
        <div
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}
        >
          <Button onClick={() => navigate("/characters")} size="lg">
            ⚔️ EXPLORE UNIVERSE
          </Button>
          <Button
            onClick={() => navigate("/lightsaber")}
            variant="secondary"
            size="lg"
          >
            💎 BUILD LIGHTSABER
          </Button>
          <button
            onClick={handleReplay}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,232,31,0.4)",
              color: "#FFE81F",
              padding: "12px 24px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              fontFamily: "Trebuchet MS, sans-serif",
              transition: "all 0.3s",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            🎬 REPLAY INTRO
          </button>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 40,
         }}
      >
        <div
          style={{
            flex: 1,
            height: 1,
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <span
          style={{ color: "#444", fontSize: 11, letterSpacing: 4 }}
        >
          EXPLORE THE GALAXY
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: "rgba(255,255,255,0.06)",
          }}
        />
      </div>

      {/* Feature Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
          maxWidth: 900,
          width: "100%",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.3s",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={feature.path}
            onClick={() => navigate(feature.path)}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              background:
                hoveredCard === index
                  ? `rgba(${hexToRgb(feature.color)}, 0.06)`
                  : "rgba(255,255,255,0.02)",
              border: `1px solid ${
                hoveredCard === index ? feature.color : "rgba(255,255,255,0.08)"
              }`,
              borderRadius: 14,
              padding: 24,
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform:
                hoveredCard === index ? "translateY(-6px)" : "translateY(0)",
              boxShadow:
                hoveredCard === index
                  ? `0 12px 40px ${feature.color}25`
                  : "none",
            }}
          >
            {/* Icon */}
            <div
              style={{
                fontSize: 36,
                marginBottom: 14,
                filter:
                  hoveredCard === index
                    ? `drop-shadow(0 0 12px ${feature.color})`
                    : "none",
                transition: "filter 0.3s ease",
              }}
            >
              {feature.icon}
            </div>

            {/* Title */}
            <h3
              style={{
                color: hoveredCard === index ? feature.color : "#FFD700",
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 4,
                transition: "color 0.3s ease",
              }}
            >
              {feature.title}
            </h3>

            {/* Subtitle */}
            <p
              style={{
                color: feature.color,
                fontSize: 11,
                letterSpacing: 2,
                marginBottom: 10,
                opacity: 0.8,
              }}
            >
              {feature.subtitle}
            </p>

            {/* Description */}
            <p
              style={{
                color: "#666",
                fontSize: 13,
                lineHeight: 1.7,
              }}
            >
              {feature.desc}
            </p>

            {/* Arrow */}
            <div
              style={{
                marginTop: 16,
                color: feature.color,
                fontSize: 12,
                letterSpacing: 2,
                opacity: hoveredCard === index ? 1 : 0,
                transform:
                  hoveredCard === index
                    ? "translateX(0)"
                    : "translateX(-10px)",
                transition: "all 0.3s ease",
              }}
            >
              EXPLORE →
            </div>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <p
        style={{
          marginTop: 60,
          color: "#333",
          fontSize: 12,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        May the Force be with you
      </p>
    </div>
  )
}

// Helper to convert hex to rgb for rgba usage
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return "255,215,0"
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
}

export default Home
