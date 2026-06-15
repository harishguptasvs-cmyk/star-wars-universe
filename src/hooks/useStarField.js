import { useState, useEffect } from "react"

export const useStarField = (count = 150) => {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 3,
    }))
    setStars(generated)
  }, [count])

  return stars
}