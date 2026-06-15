import { useState } from "react"

const StarWarsImage = ({
  src,
  alt,
  fallbackIcon,
  fallbackColor = "#FFD700",
  height = 200,
  borderRadius = 8,
  objectPosition = "top center",
}) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (!src || error) {
    return (
      <div style={{
        height, borderRadius,
        display: "flex", alignItems: "center",
        justifyContent: "center",
        fontSize: height > 150 ? 64 : 44,
        background: `radial-gradient(ellipse at center, ${fallbackColor}15, rgba(2,4,8,0.5))`,
      }}>
        {fallbackIcon}
      </div>
    )
  }

  return (
    <div style={{
      position: "relative", height,
      overflow: "hidden", borderRadius,
      background: "rgba(255,255,255,0.02)",
    }}>
      {!loaded && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center",
          justifyContent: "center",
          fontSize: height > 150 ? 48 : 32,
        }}>
          {fallbackIcon}
        </div>
      )}

      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition,
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "50%",
        background: "linear-gradient(to top, rgba(2,4,8,1), transparent)",
        pointerEvents: "none",
      }} />
    </div>
  )
}

export default StarWarsImage