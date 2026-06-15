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

const ComingSoon = ({ page }) => (
  <div
    style={{
      minHeight: "calc(100vh - 70px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFD700",
      fontSize: 24,
      letterSpacing: 4,
    }}
  >
    <div style={{ fontSize: 60, marginBottom: 20 }}>⚔️</div>
    <p>{page}</p>
    <p style={{ color: "#666", fontSize: 14, marginTop: 8 }}>
      Coming Soon...
    </p>
  </div>
)

function App() {
  return (
    <BrowserRouter>
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