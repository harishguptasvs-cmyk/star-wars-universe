import { useState } from "react"

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  style = {},
  disabled = false,
}) => {
  const [hovered, setHovered] = useState(false)

  const variants = {
    primary: {
      background: hovered
        ? "rgba(255,215,0,0.2)"
        : "rgba(255,215,0,0.1)",
      border: "2px solid #FFD700",
      color: "#FFD700",
    },
    secondary: {
      background: hovered
        ? "rgba(255,255,255,0.08)"
        : "transparent",
      border: "1px solid rgba(255,255,255,0.2)",
      color: "#ccc",
    },
    danger: {
      background: hovered
        ? "rgba(239,83,80,0.2)"
        : "rgba(239,83,80,0.1)",
      border: "2px solid #EF5350",
      color: "#EF5350",
    },
    success: {
      background: hovered
        ? "rgba(102,187,106,0.2)"
        : "rgba(102,187,106,0.1)",
      border: "2px solid #66BB6A",
      color: "#66BB6A",
    },
  }

  const sizes = {
    sm: { padding: "6px 16px", fontSize: 12 },
    md: { padding: "10px 24px", fontSize: 14 },
    lg: { padding: "14px 40px", fontSize: 16 },
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 700,
        letterSpacing: 1,
        transition: "all 0.2s ease",
        transform: hovered && !disabled ? "translateY(-1px)" : "none",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "Trebuchet MS, sans-serif",
        ...style,
      }}
    >
      {children}
    </button>
  )
}

export default Button