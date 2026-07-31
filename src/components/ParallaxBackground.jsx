import { useState, useEffect } from "react"

const makeStars = (count, minSize, maxSize, minOp) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: minSize + Math.random() * (maxSize - minSize),
    opacity: minOp + Math.random() * (0.8 - minOp),
    twinkle: 2 + Math.random() * 3,
    twinkleDelay: Math.random() * 4,
  }))

const SLOW_STARS = makeStars(80, 0.4, 1.2, 0.15)
const MED_STARS = makeStars(50, 1, 2, 0.25)
const FAST_STARS = makeStars(25, 1.5, 3, 0.4)

const SHIP_CONFIGS = [
  { w: 48, h: 10, body: "#b0b8d0", trail: "#4FC3F7", glow: "rgba(79,195,247,0.8)" },
  { w: 36, h: 12, body: "#888899", trail: "#EF5350", glow: "rgba(239,83,80,0.8)" },
  { w: 60, h: 9,  body: "#d0cc88", trail: "#FFD700", glow: "rgba(255,215,0,0.8)" },
  { w: 40, h: 8,  body: "#90c890", trail: "#66BB6A", glow: "rgba(102,187,106,0.8)" },
]

let shipCounter = 0

const ParallaxBackground = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [ships, setShips] = useState([])

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

    const handleMouseMove = (e) => {
      if (isMobile) return
      // Center coordinates of viewport
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      // Calculate distance relative to center
      setCoords({
        x: (e.clientX - centerX) / centerX,
        y: (e.clientY - centerY) / centerY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Independent Flying Spaceships
    const spawnShip = () => {
      const ltr = Math.random() > 0.4
      const type = Math.floor(Math.random() * 4)
      setShips(prev => [
        ...prev,
        {
          id: shipCounter++,
          y: 3 + Math.random() * 88,
          ltr,
          duration: 8 + Math.random() * 12,
          type,
          scale: 0.5 + Math.random() * 0.9,
          delay: Math.random() * 1,
        },
      ].slice(-7))
    }

    spawnShip()
    spawnShip()
    const interval = setInterval(spawnShip, 4000)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(interval)
    }
  }, [isMobile])

  const getTransformStyle = (speed) => {
    if (isMobile) return {}
    // Subtle shift opposite to mouse direction
    const tx = -coords.x * speed * 40
    const ty = -coords.y * speed * 40
    return {
      transform: `translate3d(${tx}px, ${ty}px, 0)`,
      transition: "transform 0.2s cubic-bezier(0.1, 0.8, 0.25, 1)",
    }
  }

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes rotateSymbol {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          from { opacity: 0.2; }
          to   { opacity: 1; }
        }
        @keyframes flyLtr {
          0%   { left: -15%; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { left: 115%; opacity: 0; }
        }
        @keyframes flyRtl {
          0%   { left: 115%; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { left: -15%; opacity: 0; }
        }
        @keyframes enginePulse {
          0%, 100% { transform: scaleX(0.7); opacity: 0.5; }
          50%      { transform: scaleX(1.2); opacity: 1; }
        }
      `}</style>

      {/* Nebula Backgrounds */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 50%, rgba(10,15,40,1) 0%, rgba(2,4,8,1) 60%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 20%, rgba(20,40,100,0.35) 0%, transparent 55%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 10% 80%, rgba(60,20,80,0.3) 0%, transparent 50%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(10,30,60,0.4) 0%, transparent 70%)" }} />

      {/* LAYER 1: Stars (moves slowest — 0.01x speed) */}
      <div style={{ ...styles.layer, ...getTransformStyle(0.01) }}>
        {/* Slow Stars */}
        {SLOW_STARS.map(s => (
          <div key={s.id} style={{
            position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`, borderRadius: "50%",
            background: "white", opacity: s.opacity,
            animation: `twinkle ${s.twinkle}s ease-in-out ${s.twinkleDelay}s infinite alternate`,
          }} />
        ))}
        {/* Medium Stars */}
        {MED_STARS.map(s => (
          <div key={s.id} style={{
            position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`, borderRadius: "50%",
            background: "white", opacity: s.opacity,
            animation: `twinkle ${s.twinkle}s ease-in-out ${s.twinkleDelay}s infinite alternate`,
          }} />
        ))}
        {/* Fast Stars */}
        {FAST_STARS.map(s => (
          <div key={s.id} style={{
            position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`, borderRadius: "50%",
            background: "white", opacity: s.opacity,
            animation: `twinkle ${s.twinkle}s ease-in-out ${s.twinkleDelay}s infinite alternate`,
          }} />
        ))}
      </div>

      {/* LAYER 2: Deep Space Elements (moves 0.02x speed) */}
      <div style={{ ...styles.layer, ...getTransformStyle(0.02) }}>
        {/* Large Death Star circle silhouette — top right area */}
        <div style={styles.deathStar} />
      </div>

      {/* LAYER 3: Symbols (moves 0.04x speed) */}
      <div style={{ ...styles.layer, ...getTransformStyle(0.04) }}>
        {/* Jedi Order symbol — left side glowing blue */}
        <svg style={{ ...styles.symbol, left: "12%", top: "25%", color: "#00E5FF", filter: "drop-shadow(0 0 8px #00E5FF)" }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M50,15 L50,85 M30,50 L70,50 M35,35 L65,65 M35,65 L65,35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>

        {/* Galactic Empire symbol — right side glowing white */}
        <svg style={{ ...styles.symbol, right: "12%", top: "35%", color: "#FFFFFF", filter: "drop-shadow(0 0 8px #FFFFFF)" }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22" stroke="currentColor" strokeWidth="3" />
        </svg>

        {/* Rebel Alliance symbol — bottom center glowing red */}
        <svg style={{ ...styles.symbol, left: "48%", bottom: "12%", color: "#FF1744", filter: "drop-shadow(0 0 8px #FF1744)" }} viewBox="0 0 100 100">
          <path d="M50,10 C42,40 15,45 15,75 C15,88 50,88 50,88 C50,88 85,88 85,75 C85,45 58,40 50,10 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M50,30 L50,75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* LAYER 4: Character Silhouettes (moves 0.06x speed) */}
      <div style={{ ...styles.layer, ...getTransformStyle(0.06) }}>
        {/* Darth Vader silhouette — far right side */}
        <div style={{ ...styles.silhouette, right: "5%", top: "35%", filter: "drop-shadow(0 0 12px #EF5350)" }}>
          <svg width="110" height="200" viewBox="0 0 100 200" fill="#0c0e14">
            <path d="M50,15 C40,15 35,25 35,35 C35,45 42,48 42,55 C30,60 15,75 10,120 L5,200 L95,200 L90,120 C85,75 70,60 58,55 C58,48 65,45 65,35 C65,25 60,15 50,15 Z" />
          </svg>
        </div>

        {/* Yoda silhouette — far left side */}
        <div style={{ ...styles.silhouette, left: "6%", bottom: "18%", filter: "drop-shadow(0 0 12px #66BB6A)" }}>
          <svg width="90" height="130" viewBox="0 0 100 150" fill="#080b0e">
            <path d="M50,40 C40,40 35,48 20,40 C30,55 35,55 40,58 C40,65 30,75 25,100 L20,150 L80,150 L75,100 C70,75 60,65 60,58 C65,55 70,55 80,40 C65,48 60,40 50,40 Z" />
          </svg>
        </div>

        {/* Luke Skywalker silhouette — center background */}
        <div style={{ ...styles.silhouette, left: "47%", top: "28%", filter: "drop-shadow(0 0 10px #4FC3F7)" }}>
          <svg width="100" height="180" viewBox="0 0 100 200" fill="#0a0c12">
            <path d="M50,20 C42,20 40,28 40,36 C40,44 45,46 45,52 C35,58 25,70 20,110 L15,200 L85,200 L80,110 C75,70 65,58 55,52 C55,46 60,44 60,36 C60,28 58,20 50,20 Z" />
          </svg>
        </div>
      </div>

      {/* LAYER 5: Lightsabers (moves 0.08x speed) */}
      <div style={{ ...styles.layer, ...getTransformStyle(0.08) }}>
        <div style={styles.crossingSabers}>
          {/* Blue Saber */}
          <div style={{
            position: "absolute", width: "180px", height: "4px", borderRadius: "2px",
            background: "white", boxShadow: "0 0 12px #00E5FF, 0 0 25px #00E5FF",
            transform: "rotate(40deg)", left: "10px", top: "50px", opacity: 0.5,
          }} />
          {/* Red Saber */}
          <div style={{
            position: "absolute", width: "180px", height: "4px", borderRadius: "2px",
            background: "white", boxShadow: "0 0 12px #FF1744, 0 0 25px #FF1744",
            transform: "rotate(-40deg)", left: "10px", top: "50px", opacity: 0.5,
          }} />
        </div>
      </div>

      {/* LAYER 6: Spaceships (moves independently — existing) */}
      <div style={styles.layer}>
        {ships.map(ship => {
          const cfg = SHIP_CONFIGS[ship.type % 4]
          const w = cfg.w * ship.scale
          const h = cfg.h * ship.scale

          return (
            <div
              key={ship.id}
              style={{
                position: "absolute",
                top: `${ship.y}%`,
                left: ship.ltr ? "-15%" : "115%",
                animation: `${ship.ltr ? "flyLtr" : "flyRtl"} ${ship.duration}s linear ${ship.delay}s forwards`,
                display: "flex",
                alignItems: "center",
                transform: ship.ltr ? "none" : "scaleX(-1)",
              }}
            >
              {/* Engine Trail */}
              <div style={{
                width: `${w * 0.9}px`,
                height: `${h * 0.25}px`,
                background: `linear-gradient(to right, transparent, ${cfg.trail})`,
                opacity: 0.8,
                borderRadius: "4px",
                animation: "enginePulse 0.4s ease-in-out infinite",
                filter: `blur(2px)`,
                boxShadow: `0 0 8px ${cfg.trail}`,
              }} />

              {/* Ship Body */}
              <div style={{
                position: "relative",
                width: `${w}px`,
                height: `${h}px`,
                background: `linear-gradient(135deg, ${cfg.body}, rgba(255,255,255,0.15))`,
                clipPath: "polygon(0% 50%, 15% 0%, 90% 0%, 100% 50%, 90% 100%, 15% 100%)",
                filter: `drop-shadow(0 0 ${h * 0.4}px ${cfg.trail})`,
              }} />

              {/* Engine Glow Dot */}
              <div style={{
                position: "absolute",
                left: `${w * 0.06}px`,
                width: `${h * 0.5}px`,
                height: `${h * 0.5}px`,
                borderRadius: "50%",
                background: cfg.trail,
                opacity: 0.9,
                filter: `blur(${h * 0.25}px)`,
                animation: "enginePulse 0.4s ease-in-out infinite",
              }} />
            </div>
          )
        })}
      </div>

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
      }} />

      {/* Bottom Fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "180px",
        background: "linear-gradient(to top, rgba(2,4,8,0.95), transparent)",
      }} />
    </div>
  )
}

const styles = {
  container: {
    position: "fixed",
    inset: 0,
    zIndex: 0,
    background: "#020408",
    overflow: "hidden",
    pointerEvents: "none",
  },
  layer: {
    position: "absolute",
    inset: "-40px",
    width: "calc(100% + 80px)",
    height: "calc(100% + 80px)",
    pointerEvents: "none",
  },
  deathStar: {
    position: "absolute",
    top: "12%",
    right: "12%",
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    background: "radial-gradient(circle at 35% 35%, #181d28 0%, #05060a 80%)",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "inset -15px -15px 30px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.02)",
    opacity: 0.15,
  },
  symbol: {
    position: "absolute",
    width: "75px",
    height: "75px",
    opacity: 0.12,
    animation: "rotateSymbol 70s linear infinite",
  },
  silhouette: {
    position: "absolute",
    opacity: 0.15,
  },
  crossingSabers: {
    position: "absolute",
    left: "44%",
    bottom: "22%",
    width: "200px",
    height: "120px",
    opacity: 0.12,
  },
}

export default ParallaxBackground
