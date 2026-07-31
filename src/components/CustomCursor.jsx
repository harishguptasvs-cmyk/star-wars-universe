import { useState, useEffect } from "react"

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState([])
  const [ripples, setRipples] = useState([])
  const [hoverState, setHoverState] = useState("default") // "default" | "hover" | "sith"
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      )
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    if (isMobile) return

    // Hide standard cursor completely
    document.body.style.cursor = "none"

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Determine hovered element context
      const target = e.target
      if (!target) return

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.style.cursor === "pointer"

      if (isInteractive) {
        // Red color when hovering sith content
        const sithContext =
          target.innerText?.toLowerCase().includes("sith") ||
          target.className?.toLowerCase().includes("sith") ||
          target.closest(".sith-card") ||
          target.closest(".sith-glow")

        if (sithContext) {
          setHoverState("sith")
        } else {
          setHoverState("hover")
        }
      } else {
        setHoverState("default")
      }

      // Add a particle trail entry
      setTrail(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
        }
      ].slice(-15))
    }

    const handleClick = (e) => {
      setRipples(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: 0,
          opacity: 1,
        }
      ])
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    return () => {
      document.body.style.cursor = "auto"
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return

    // Tick the animations for particle fade and click ripple expansions
    const timer = setInterval(() => {
      setTrail(prev =>
        prev
          .map(t => ({ ...t, opacity: t.opacity - 0.08 }))
          .filter(t => t.opacity > 0)
      )
      setRipples(prev =>
        prev
          .map(r => ({ ...r, size: r.size + 10, opacity: r.opacity - 0.05 }))
          .filter(r => r.opacity > 0)
      )
    }, 30)

    return () => clearInterval(timer)
  }, [isMobile])

  if (isMobile) return null

  // Glowing lightsaber colors matching the hover states
  const colors = {
    default: "#4FC3F7", // Blue (Jedi)
    hover: "#FFE81F",   // Yellow (Interactive)
    sith: "#EF5350",    // Red (Sith)
  }

  const activeColor = colors[hoverState] || colors.default

  return (
    <div style={styles.container}>
      {/* Golden Particle Trail */}
      {trail.map(p => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: p.x,
            top: p.y,
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#FFE81F",
            boxShadow: "0 0 8px #FFE81F, 0 0 15px #FFE81F",
            opacity: p.opacity,
            transform: "translate(-50%, -50%) scale(" + p.opacity + ")",
            pointerEvents: "none",
            zIndex: 100002,
          }}
        />
      ))}

      {/* Force Ripples */}
      {ripples.map(r => (
        <div
          key={r.id}
          style={{
            position: "fixed",
            left: r.x,
            top: r.y,
            width: `${r.size}px`,
            height: `${r.size}px`,
            borderRadius: "50%",
            border: "2px solid #FFE81F",
            boxShadow: "0 0 12px #FFE81F, inset 0 0 12px #FFE81F",
            opacity: r.opacity,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 100001,
          }}
        />
      ))}

      {/* Lightsaber Cursor Hilt & Blade */}
      <div
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          pointerEvents: "none",
          transform: "translate(-50%, -100%) rotate(-15deg)",
          transformOrigin: "bottom center",
          zIndex: 100003,
        }}
      >
        {/* Glowing Laser Blade */}
        <div
          style={{
            width: "4px",
            height: "26px",
            background: "white",
            borderRadius: "2px",
            boxShadow: `0 0 6px ${activeColor}, 0 0 15px ${activeColor}`,
            margin: "0 auto",
          }}
        />
        {/* Metal Handle Hilt */}
        <div
          style={{
            width: "6px",
            height: "10px",
            background: "linear-gradient(to right, #757575, #e0e0e0, #424242)",
            borderRadius: "1px",
            margin: "-1px auto 0",
            borderBottom: "2px solid #111",
          }}
        />
      </div>
    </div>
  )
}

const styles = {
  container: {
    position: "fixed",
    inset: 0,
    zIndex: 100001,
    pointerEvents: "none",
  },
}

export default CustomCursor
