import { useState, useEffect } from "react"

const BASE = "https://akabab.github.io/starwars-api"
let cache = null
let pending = null

export const useStarWarsImages = () => {
  const [imageMap, setImageMap] = useState(cache || {})
  const [loading, setLoading] = useState(!cache)

  useEffect(() => {
    if (cache) {
      return
    }

    if (!pending) {
      pending = fetch(`${BASE}/api/all.json`)
        .then((r) => r.json())
        .then((data) => {
          const map = {}
          data.forEach((c) => {
            const url = c.image?.startsWith("http")
              ? c.image
              : `${BASE}${c.image}`
            map[c.name.toLowerCase()] = url
          })
          cache = map
          return map
        })
        .catch(() => ({}))
    }

    pending
      .then((map) => {
        setImageMap(map)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { imageMap, loading }
}
