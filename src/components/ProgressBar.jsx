const ProgressBar = ({
  current,
  total,
  color = "#FFD700",
  showText = true,
  height = 4,
}) => {
  const percentage = (current / total) * 100

  return (
    <div style={{ width: "100%" }}>
      {showText && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span style={{ color: color, fontSize: 12, letterSpacing: 2 }}>
            QUESTION {current} OF {total}
          </span>
          <span style={{ color: "#666", fontSize: 12 }}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      {/* Track */}
      <div
        style={{
          width: "100%",
          height: height,
          background: "rgba(255,255,255,0.08)",
          borderRadius: height,
          overflow: "hidden",
        }}
      >
        {/* Fill */}
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            background: `linear-gradient(to right, ${color}88, ${color})`,
            borderRadius: height,
            transition: "width 0.4s ease",
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>

      {/* Step dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: i < current ? color : "rgba(255,255,255,0.15)",
              transition: "background 0.3s ease",
              boxShadow: i < current ? `0 0 6px ${color}` : "none",
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ProgressBar