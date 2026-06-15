import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const navItems = [
  { path: "/", label: "Home", icon: "🌌" },
  { path: "/characters", label: "Characters", icon: "👤" },
  { path: "/planets", label: "Planets", icon: "🌍" },
  { path: "/galaxy", label: "Galaxy Map", icon: "🗺️" },
  { path: "/lightsaber", label: "Lightsaber", icon: "⚔️" },
  { path: "/classifier", label: "Jedi or Sith", icon: "🔮" },
  { path: "/quiz", label: "Quiz", icon: "🧠" },
]

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(2,4,8,0.95)",
        borderBottom: "1px solid rgba(255,215,0,0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Desktop Nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 24px",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          style={{
            color: "#FFD700",
            fontWeight: 900,
            fontSize: 18,
            letterSpacing: 3,
            fontStyle: "italic",
            cursor: "pointer",
            marginRight: 16,
            textShadow: "0 0 20px rgba(255,215,0,0.5)",
          }}
        >
          ⭐ STAR WARS
        </div>

        {/* Nav Items */}
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                background: isActive
                  ? "rgba(255,215,0,0.15)"
                  : "transparent",
                border: `1px solid ${
                  isActive ? "#FFD700" : "rgba(255,255,255,0.1)"
                }`,
                color: isActive ? "#FFD700" : "#888",
                padding: "6px 12px",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1,
                transition: "all 0.2s ease",
                fontFamily: "Trebuchet MS, sans-serif",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.background = "rgba(255,215,0,0.08)"
                  e.target.style.borderColor = "rgba(255,215,0,0.4)"
                  e.target.style.color = "#FFD700"
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.background = "transparent"
                  e.target.style.borderColor = "rgba(255,255,255,0.1)"
                  e.target.style.color = "#888"
                }
              }}
            >
              {item.icon} {item.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar