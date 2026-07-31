import { useState, useEffect } from "react"

const OpeningCrawl = ({ onFinished }) => {
  const [step, setStep] = useState(1) // 1: Fade black, 2: Far away text, 3: Logo zoom, 4: Crawl text

  useEffect(() => {
    // Step 1 is active on mount
    // Step 2: "A long time ago..." fades in after 1 second
    const timer2 = setTimeout(() => setStep(2), 1000)

    // Step 3: "STAR WARS" Logo blasts in after 6000ms
    const timer3 = setTimeout(() => setStep(3), 6000)

    // Step 4: Crawl text starts after 11000ms
    const timer4 = setTimeout(() => setStep(4), 11000)

    // Step 5: Automatically transition/finish crawl after 35 seconds of crawling
    const timer5 = setTimeout(() => {
      onFinished()
    }, 46000)

    return () => {
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [onFinished])

  return (
    <div style={styles.container}>
      {/* SKIP BUTTON */}
      <button onClick={onFinished} style={styles.skipButton}>
        SKIP INTRO ⏭️
      </button>

      {/* STEP 2: Blue far-away text */}
      {step === 2 && (
        <div style={styles.blueText}>
          A long time ago in a galaxy far, far away....
        </div>
      )}

      {/* STEP 3: Star Wars Logo Blast */}
      {step === 3 && (
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>STAR WARS</h1>
        </div>
      )}

      {/* STEP 4: Yellow Crawl Text in 3D perspective */}
      {step === 4 && (
        <div style={styles.crawlContainer}>
          <div style={styles.crawlContent}>
            <p style={styles.episode}>Episode I</p>
            <h2 style={styles.crawlTitle}>THE STAR WARS UNIVERSE</h2>
            <p style={styles.crawlBody}>
              A long time ago, the galaxy was locked
              in an endless struggle between the
              light and dark sides of the Force.
            </p>
            <p style={styles.crawlBody}>
              Now, the complete archive of galactic
              history has been compiled for the first
              time in one place.
            </p>
            <p style={styles.crawlBody}>
              Characters, planets, lightsabers, and
              the ultimate test of your Force alignment
              await you in this interactive universe.
            </p>
            <p style={styles.crawlBody}>
              May the Force be with you....
            </p>
          </div>
        </div>
      )}

      {/* Dynamic Keyframes injected into DOM */}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes logoZoom {
          0% {
            transform: scale(3.5);
            opacity: 0;
            filter: brightness(2);
          }
          5% {
            opacity: 1;
          }
          100% {
            transform: scale(0.05);
            opacity: 0;
          }
        }
        @keyframes crawlScroll {
          0% {
            top: 100%;
            transform: rotateX(25deg) translateY(0);
          }
          100% {
            top: -150%;
            transform: rotateX(25deg) translateY(-1000px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

const styles = {
  container: {
    position: "fixed",
    inset: 0,
    background: "#000000",
    zIndex: 99999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', sans-serif",
  },
  skipButton: {
    position: "absolute",
    top: 24,
    right: 24,
    zIndex: 100000,
    background: "rgba(255,232,31,0.1)",
    border: "2px solid #FFE81F",
    color: "#FFE81F",
    padding: "10px 20px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 2,
    transition: "background 0.3s",
  },
  blueText: {
    color: "#4FC3F7",
    fontSize: "clamp(18px, 4vw, 28px)",
    textAlign: "center",
    maxWidth: 600,
    padding: "0 24px",
    lineHeight: 1.6,
    animation: "fadeInOut 4s ease-in-out forwards",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    color: "#FFE81F",
    fontSize: "clamp(60px, 15vw, 150px)",
    fontWeight: 900,
    letterSpacing: 8,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 1,
    transformOrigin: "center center",
    animation: "logoZoom 5s cubic-bezier(0.12, 0.85, 0.35, 1) forwards",
  },
  crawlContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    perspective: 350,
    perspectiveOrigin: "50% 100%",
    overflow: "hidden",
  },
  crawlContent: {
    position: "absolute",
    width: "80%",
    maxWidth: 800,
    left: "10%",
    textAlign: "justify",
    color: "#FFE81F",
    fontSize: "clamp(16px, 3.5vw, 26px)",
    fontWeight: "bold",
    lineHeight: 1.8,
    transformOrigin: "50% 100%",
    animation: "crawlScroll 35s linear forwards",
  },
  episode: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: "1.2em",
    marginBottom: "0.2em",
    letterSpacing: 1.5,
  },
  crawlTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: "1.8em",
    fontWeight: 900,
    marginBottom: "1em",
    letterSpacing: 2,
  },
  crawlBody: {
    marginBottom: "1.5em",
    textShadow: "0 0 2px rgba(255, 232, 31, 0.5)",
  }
}

export default OpeningCrawl
