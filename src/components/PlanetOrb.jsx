const PlanetOrb = ({ planet, size = 120 }) => (
  <div style={{
    position: "relative",
    width: size, height: size,
    margin: "0 auto",
  }}>
    {/* Outer atmosphere */}
    <div style={{
      position: "absolute",
      inset: -8,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${planet.themeColor}15, transparent)`,
      filter: "blur(8px)",
    }} />

    {/* Planet body */}
    <div style={{
      width: size, height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle at 35% 30%,
        ${planet.themeColor}ee,
        ${planet.themeColor}88 40%,
        ${planet.themeColor}44 70%,
        #020408 100%)`,
      boxShadow: `
        0 0 30px ${planet.themeColor}40,
        0 0 60px ${planet.themeColor}20,
        inset -20px -20px 40px rgba(0,0,0,0.6),
        inset 5px 5px 20px rgba(255,255,255,0.1)
      `,
      animation: "float 5s ease-in-out infinite",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Surface lines */}
      <div style={{
        position: "absolute",
        top: "30%", left: "-10%", right: "-10%",
        height: "12%",
        background: `rgba(0,0,0,0.2)`,
        transform: "rotate(-10deg)",
        borderRadius: "50%",
      }} />
      <div style={{
        position: "absolute",
        top: "55%", left: "-10%", right: "-10%",
        height: "8%",
        background: `rgba(0,0,0,0.15)`,
        transform: "rotate(-8deg)",
        borderRadius: "50%",
      }} />
      {/* Highlight */}
      <div style={{
        position: "absolute",
        top: "15%", left: "20%",
        width: "25%", height: "20%",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.15)",
        filter: "blur(4px)",
      }} />
    </div>

    {/* Planet icon */}
    <div style={{
      position: "absolute",
      bottom: -4, right: -4,
      fontSize: size > 100 ? 24 : 18,
      filter: `drop-shadow(0 0 8px ${planet.themeColor})`,
    }}>
      {planet.icon}
    </div>
  </div>
)

export default PlanetOrb