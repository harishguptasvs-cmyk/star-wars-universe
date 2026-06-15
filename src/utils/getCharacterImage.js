import { characterImages } from "../data/imageMap"

export const getCharacterImage = (characterId) => {
  return characterImages[characterId] || null
}