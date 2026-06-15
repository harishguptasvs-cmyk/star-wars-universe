import { useState } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { selectCrystal } from "../../utils/crystalSelector"
import { personalityQuestions } from "../../data/quizQuestions"
import PersonalityQuiz from "./PersonalityQuiz"
import CrystalReveal from "./CrystalReveal"
import HiltSelector from "./HiltSelector"
import LightsaberDisplay from "./LightsaberDisplay"

const STEPS = ["intro", "quiz", "crystal", "hilt", "display"]

const LightsaberBuilder = () => {
  const [step, setStep] = useState("intro")
  const [answers, setAnswers] = useState([])
  const [crystal, setCrystal] = useState(null)
  const [hilt, setHilt] = useState(null)
  const [bladeColor, setBladeColor] = useState(null)
  const [savedSaber, setSavedSaber] = useLocalStorage("mySaber", null)

  const handleQuizComplete = (quizAnswers) => {
    const chosen = selectCrystal(quizAnswers, personalityQuestions)
    setAnswers(quizAnswers)
    setCrystal(chosen)
    setStep("crystal")
  }

  const handleCrystalAccept = () => setStep("hilt")

  const handleHiltComplete = (chosenHilt, chosenColor) => {
    setHilt(chosenHilt)
    setBladeColor(chosenColor)
    setStep("display")
    setSavedSaber({
      crystal,
      hilt: chosenHilt,
      bladeColor: chosenColor,
      date: new Date().toLocaleDateString(),
    })
  }

  const handleReset = () => {
    setStep("intro")
    setAnswers([])
    setCrystal(null)
    setHilt(null)
    setBladeColor(null)
  }

  return (
    <div style={{ minHeight: "calc(100vh - 70px)", position: "relative" }}>

      {/* Background Glow */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: crystal
          ? `radial-gradient(ellipse at 50% 30%, ${crystal.hex}12 0%, transparent 60%)`
          : "radial-gradient(ellipse at 50% 30%, rgba(171,71,188,0.08) 0%, transparent 60%)",
        transition: "background 1s ease",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* INTRO STEP */}
        {step === "intro" && (
          <IntroScreen
            savedSaber={savedSaber}
            onStart={() => setStep("quiz")}
            onViewSaved={() => {
              if (savedSaber) {
                setCrystal(savedSaber.crystal)
                setHilt(savedSaber.hilt)
                setBladeColor(savedSaber.bladeColor)
                setStep("display")
              }
            }}
          />
        )}

        {/* QUIZ STEP */}
        {step === "quiz" && (
          <PersonalityQuiz
            questions={personalityQuestions}
            onComplete={handleQuizComplete}
            onBack={() => setStep("intro")}
          />
        )}

        {/* CRYSTAL REVEAL STEP */}
        {step === "crystal" && crystal && (
          <CrystalReveal
            crystal={crystal}
            onAccept={handleCrystalAccept}
          />
        )}

        {/* HILT SELECTOR STEP */}
        {step === "hilt" && crystal && (
          <HiltSelector
            crystal={crystal}
            onComplete={handleHiltComplete}
            onBack={() => setStep("crystal")}
          />
        )}

        {/* DISPLAY STEP */}
        {step === "display" && crystal && hilt && bladeColor && (
          <LightsaberDisplay
            crystal={crystal}
            hilt={hilt}
            bladeColor={bladeColor}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  )
}

const IntroScreen = ({ savedSaber, onStart, onViewSaved }) => (
  <div style={{
    minHeight: "calc(100vh - 70px)",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "40px 24px", textAlign: "center",
  }}>
    <div style={{
      fontSize: 80, marginBottom: 24,
      animation: "float 4s ease-in-out infinite",
      filter: "drop-shadow(0 0 20px rgba(171,71,188,0.8))",
    }}>
      💎
    </div>

    <p style={{ color: "#666", fontSize: 12, letterSpacing: 4, marginBottom: 8 }}>
      JEDI WEAPON FORGE
    </p>

    <h1 style={{
      color: "#FFD700",
      fontSize: "clamp(28px, 6vw, 56px)",
      fontWeight: 900, letterSpacing: 6,
      textTransform: "uppercase", fontStyle: "italic",
      marginBottom: 8,
      textShadow: "0 0 40px rgba(255,215,0,0.5)",
    }}>
      Lightsaber Builder
    </h1>

    <div style={{
      width: 200, height: 1,
      background: "linear-gradient(to right, transparent, #FFD700, transparent)",
      margin: "16px auto 24px",
    }} />

    <p style={{
      color: "#888", fontSize: 15,
      maxWidth: 480, lineHeight: 1.9,
      marginBottom: 40,
    }}>
      Answer the call of the Force. The crystal does not belong to you —
      you belong to the crystal. Discover your destiny and forge
      your unique lightsaber.
    </p>

    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
      <button
        onClick={onStart}
        style={{
          background: "rgba(255,215,0,0.1)",
          border: "2px solid #FFD700",
          color: "#FFD700", padding: "14px 40px",
          borderRadius: 8, cursor: "pointer",
          fontSize: 16, fontWeight: 700,
          letterSpacing: 2,
          fontFamily: "Trebuchet MS, sans-serif",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => e.target.style.background = "rgba(255,215,0,0.2)"}
        onMouseLeave={(e) => e.target.style.background = "rgba(255,215,0,0.1)"}
      >
        ⚔️ BEGIN YOUR JOURNEY
      </button>

      {savedSaber && (
        <button
          onClick={onViewSaved}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#888", padding: "14px 40px",
            borderRadius: 8, cursor: "pointer",
            fontSize: 14, fontWeight: 600,
            letterSpacing: 1,
            fontFamily: "Trebuchet MS, sans-serif",
          }}
        >
          💾 View Saved Saber
        </button>
      )}
    </div>

    {/* How it works */}
    <div style={{
      display: "flex", gap: 24, marginTop: 60,
      flexWrap: "wrap", justifyContent: "center",
    }}>
      {[
        { step: "01", icon: "🧠", title: "Answer", desc: "10 questions about your personality" },
        { step: "02", icon: "💎", title: "Crystal", desc: "The Force chooses your crystal" },
        { step: "03", icon: "⚙️", title: "Forge", desc: "Choose your hilt and blade color" },
        { step: "04", icon: "⚔️", title: "Ignite", desc: "Your unique saber is revealed" },
      ].map((item) => (
        <div key={item.step} style={{
          textAlign: "center", maxWidth: 120,
        }}>
          <div style={{
            fontSize: 28, marginBottom: 8,
            filter: "drop-shadow(0 0 8px rgba(255,215,0,0.4))",
          }}>
            {item.icon}
          </div>
          <p style={{ color: "#FFD700", fontSize: 10, letterSpacing: 3, marginBottom: 4 }}>
            {item.step}
          </p>
          <p style={{ color: "#ccc", fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
            {item.title}
          </p>
          <p style={{ color: "#555", fontSize: 11, lineHeight: 1.6 }}>
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
)

export default LightsaberBuilder