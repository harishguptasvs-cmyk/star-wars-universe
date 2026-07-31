import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import StarField from "./components/StarField"
import Home from "./pages/Home"
import Characters from "./pages/Characters/Characters"
import CharacterDetail from "./pages/Characters/CharacterDetail"
import Planets from "./pages/Planets/Planets"
import PlanetDetail from "./pages/Planets/PlanetDetail"
import GalaxyMap from "./pages/GalaxyMap/GalaxyMap"
import LightsaberBuilder from "./pages/LightsaberBuilder/LightsaberBuilder"
import Classifier from "./pages/Classifier/Classifier"
import Quiz from "./pages/Quiz/Quiz"
import OpeningCrawl from "./components/OpeningCrawl"

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Avoid synchronous state setting within useEffect in React 19
    const hasSeen = sessionStorage.getItem("hasSeenIntro")
    return !hasSeen
  })
  const [isFading, setIsFading] = useState(false)

  const handleFinishIntro = () => {
    setIsFading(true)
    setTimeout(() => {
      setShowIntro(false)
      setIsFading(false)
      sessionStorage.setItem("hasSeenIntro", "true")
    }, 1000) // 1 second smooth fade transition
  }

  return (
    <BrowserRouter>
      {showIntro && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 100000,
          opacity: isFading ? 0 : 1,
          transition: "opacity 1s ease",
          pointerEvents: isFading ? "none" : "auto"
        }}>
          <OpeningCrawl onFinished={handleFinishIntro} />
        </div>
      )}

      <div
        style={{
          minHeight: "100vh",
          background: "#020408",
          position: "relative",
        }}
      >
        <StarField />
        <Navbar />
        <main
          style={{
            paddingTop: "70px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:name" element={<CharacterDetail />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/planets/:name" element={<PlanetDetail />} />
            <Route path="/galaxy" element={<GalaxyMap />} />
            <Route path="/lightsaber" element={<LightsaberBuilder />} />
            <Route path="/classifier" element={<Classifier />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
