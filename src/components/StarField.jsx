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

const SLOW_STARS = makeStars(100, 0.4, 1.2, 0.15)
const MED_STARS = makeStars(60, 1, 2, 0.25)
const FAST_STARS = makeStars(30, 1.5, 3, 0.4)

const SHIP_CONFIGS = [
  { w: 48, h: 10, body: "#b0b8d0", trail: "#4FC3F7", glow: "rgba(79,195,247,0.8)" },
  { w: 36, h: 12, body: "#888899", trail: "#EF5350", glow: "rgba(239,83,80,0.8)" },
  { w: 60, h: 9,  body: "#d0cc88", trail: "#FFD700", glow: "rgba(255,215,0,0.8)" },
  { w: 40, h: 8,  body: "#90c890", trail: "#66BB6A", glow: "rgba(102,187,106,0.8)" },
]

let shipCounter = 0

const StarField = () => {
  const [ships, setShips] = useState([])

  useEffect(() => {
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
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        background: "#020408",
      }}
    >
      <style>{`
        @keyframes moveSlow {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes moveMedium {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes moveFast {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
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
        @keyframes twinkle {
          from { opacity: 0.2; }
          to   { opacity: 1; }
        }
        @keyframes enginePulse {
          0%, 100% { transform: scaleX(0.7); opacity: 0.5; }
          50%      { transform: scaleX(1.2); opacity: 1; }
        }
      `}</style>

      {/* ── Nebula Backgrounds ── */}
      <div style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse at 20% 50%, rgba(10,15,40,1) 0%, rgba(2,4,8,1) 60%)" }} />
      <div style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse at 80% 20%, rgba(20,40,100,0.35) 0%, transparent 55%)" }} />
      <div style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse at 10% 80%, rgba(60,20,80,0.3) 0%, transparent 50%)" }} />
      <div style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse at 90% 90%, rgba(80,10,10,0.2) 0%, transparent 45%)" }} />
      <div style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse at 50% 50%, rgba(10,30,60,0.4) 0%, transparent 70%)" }} />
      <div style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse at 50% 0%, rgba(255,200,0,0.06) 0%, transparent 50%)" }} />

      {/* ── Slow Stars Layer ── */}
      <div style={{ position:"absolute", inset:0, animation:"moveSlow 80s linear infinite" }}>
        <div style={{ position:"relative", width:"200%", height:"100%" }}>
          {SLOW_STARS.map(s => (
            <div key={s.id} style={{
              position:"absolute", left:`${s.x}%`, top:`${s.y}%`,
              width:`${s.size}px`, height:`${s.size}px`,
              borderRadius:"50%", background:"white",
              opacity: s.opacity,
              animation:`twinkle ${s.twinkle}s ease-in-out ${s.twinkleDelay}s infinite alternate`,
            }} />
          ))}
        </div>
      </div>

      {/* ── Medium Stars Layer ── */}
      <div style={{ position:"absolute", inset:0, animation:"moveMedium 40s linear infinite" }}>
        <div style={{ position:"relative", width:"200%", height:"100%" }}>
          {MED_STARS.map(s => (
            <div key={s.id} style={{
              position:"absolute", left:`${s.x}%`, top:`${s.y}%`,
              width:`${s.size}px`, height:`${s.size}px`,
              borderRadius:"50%",
              background: s.size > 1.5
                ? "radial-gradient(circle, white, rgba(180,200,255,0.8))"
                : "white",
              opacity: s.opacity,
              animation:`twinkle ${s.twinkle}s ease-in-out ${s.twinkleDelay}s infinite alternate`,
              boxShadow: s.size > 1.5
                ? `0 0 ${s.size * 2}px rgba(180,200,255,0.5)`
                : "none",
            }} />
          ))}
        </div>
      </div>

      {/* ── Fast Stars Layer ── */}
      <div style={{ position:"absolute", inset:0, animation:"moveFast 20s linear infinite" }}>
        <div style={{ position:"relative", width:"200%", height:"100%" }}>
          {FAST_STARS.map(s => (
            <div key={s.id} style={{
              position:"absolute", left:`${s.x}%`, top:`${s.y}%`,
              width:`${s.size}px`, height:`${s.size}px`,
              borderRadius:"50%",
              background:"radial-gradient(circle, white, rgba(200,220,255,0.9))",
              opacity: s.opacity,
              animation:`twinkle ${s.twinkle}s ease-in-out ${s.twinkleDelay}s infinite alternate`,
              boxShadow:`0 0 ${s.size * 2}px rgba(200,220,255,0.6)`,
            }} />
          ))}
        </div>
      </div>

      {/* ── Spaceships ── */}
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

      {/* ── Vignette ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)",
      }} />

      {/* ── Bottom Fade ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "180px",
        background: "linear-gradient(to top, rgba(2,4,8,0.9), transparent)",
      }} />
    </div>
  )
}

export default StarField