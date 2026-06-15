export const classifierQuestions = [
  {
    id: 1,
    question: "You find credits on the ground with no owner. You...",
    options: [
      "Report it to the authorities immediately",
      "Keep it — finder's keeper",
      "Donate it to those in need",
      "Use it to gain more power",
    ],
    scores: [10, -5, 8, -10],
  },
  {
    id: 2,
    question: "A friend betrays you. You...",
    options: [
      "Forgive and try to understand why",
      "Never trust them again but move on",
      "Seek justice through proper means",
      "Make them pay no matter what",
    ],
    scores: [10, 0, 5, -10],
  },
  {
    id: 3,
    question: "Your emotion when achieving victory is...",
    options: [
      "Humble gratitude",
      "Calm satisfaction",
      "Relief that others are safe",
      "Hunger for more power",
    ],
    scores: [10, 5, 8, -10],
  },
  {
    id: 4,
    question: "The Force calls you toward...",
    options: [
      "Balance and harmony",
      "Knowledge and wisdom",
      "Protecting the weak",
      "Unlimited power",
    ],
    scores: [5, 8, 10, -10],
  },
  {
    id: 5,
    question: "When the galaxy is in chaos, you...",
    options: [
      "Stand and fight for peace",
      "Analyze and find the best solution",
      "Shield the innocent from harm",
      "Seize the opportunity for control",
    ],
    scores: [8, 7, 10, -10],
  },
  {
    id: 6,
    question: "What does strength mean to you?",
    options: [
      "Courage to do what is right",
      "Wisdom to know the truth",
      "Power to protect others",
      "Domination over enemies",
    ],
    scores: [8, 7, 10, -10],
  },
]

export const determineDestiny = (answers) => {
  let totalScore = 0

  answers.forEach((answerIndex, questionIndex) => {
    const question = classifierQuestions[questionIndex]
    totalScore += question.scores[answerIndex]
  })

  const maxScore = classifierQuestions.length * 10

  if (totalScore >= maxScore * 0.6) {
    return {
      side: "Jedi",
      title: "Jedi Knight",
      color: "#4FC3F7",
      icon: "✨",
      desc: "The light side of the Force flows through you. Compassion, wisdom, and justice define your path. The galaxy is safer because of you.",
      bgColor: "rgba(79,195,247,0.1)",
      border: "#4FC3F7",
      titles: [
        "Guardian of the Republic",
        "Keeper of Ancient Wisdom",
        "Sentinel of Balance",
        "Protector of the Innocent",
      ],
    }
  } else if (totalScore >= 0) {
    return {
      side: "Grey Jedi",
      title: "Grey Jedi",
      color: "#AB47BC",
      icon: "⚖️",
      desc: "You walk the fine line between light and dark. Neither fully Jedi nor Sith, you are unique in the Force. Your path is your own.",
      bgColor: "rgba(171,71,188,0.1)",
      border: "#AB47BC",
      titles: [
        "Wanderer of the Force",
        "Shadow of Balance",
        "The Unbound One",
        "Force Wanderer",
      ],
    }
  } else {
    return {
      side: "Sith",
      title: "Sith Lord",
      color: "#EF5350",
      icon: "😈",
      desc: "The dark side flows through you. Power and ambition drive your every move. The galaxy will kneel before your strength.",
      bgColor: "rgba(239,83,80,0.1)",
      border: "#EF5350",
      titles: [
        "Shadow of the Sith",
        "Dark Lord of Power",
        "Conqueror of Worlds",
        "Master of the Dark Side",
      ],
    }
  }
}