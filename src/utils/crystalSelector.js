import { crystals } from "../data/crystals"

export const selectCrystal = (answers, questions) => {
  const colorScores = {}

  answers.forEach((answerIndex, questionIndex) => {
    const question = questions[questionIndex]
    const mappedColor = question.crystalMapping[answerIndex]
    colorScores[mappedColor] = (colorScores[mappedColor] || 0) + 1
  })

  const sortedColors = Object.entries(colorScores).sort((a, b) => b[1] - a[1])
  const topColor = sortedColors[0][0]

  const found = crystals.find((c) => c.color === topColor)
  return found || crystals[0]
}

export const getCrystalByColor = (color) => {
  return crystals.find((c) => c.color === color) || crystals[0]
}

export const getRarityRank = (rarity) => {
  const ranks = {
    Common: 1,
    Rare: 2,
    Epic: 3,
    Legendary: 4,
    Mythic: 5,
  }
  return ranks[rarity] || 1
}

export const getRarityColor = (rarity) => {
  const colors = {
    Common: "#B0BEC5",
    Rare: "#4FC3F7",
    Epic: "#AB47BC",
    Legendary: "#FDD835",
    Mythic: "#FF9800",
  }
  return colors[rarity] || "#B0BEC5"
}