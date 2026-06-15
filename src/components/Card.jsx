import { useState } from "react"

const Card = ({
  children,
  onClick,
  style = {},
  glowColor = "#FFD700",
  hoverable = true,
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${
          hovered ? glowColor : "rgba(255,215,0,0.15)"
        }`,
        borderRadius: 12,
        padding: 20,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s ease",
        transform: hovered && hoverable ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 8px 30px ${glowColor}30`
          : "none",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default Card