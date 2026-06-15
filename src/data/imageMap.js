const C = (id) =>
  `https://images.weserv.nl/?url=starwars-visualguide.com/assets/img/characters/${id}.jpg&w=400&h=500&fit=cover&a=top`

const P = (id) =>
  `https://images.weserv.nl/?url=starwars-visualguide.com/assets/img/planets/${id}.jpg&w=400&h=300&fit=cover`

export const characterImages = {
  1:  C(1),   // Luke Skywalker
  2:  C(4),   // Darth Vader
  3:  C(20),  // Yoda
  4:  C(10),  // Obi-Wan Kenobi
  5:  C(84),  // Rey Skywalker
  6:  C(43),  // Darth Maul
  8:  C(14),  // Han Solo
  11: C(49),  // Mace Windu
  12: C(21),  // Emperor Palpatine
  13: C(5),   // Princess Leia
  14: C(32),  // Qui-Gon Jinn
  15: C(65),  // Count Dooku
  17: C(22),  // Boba Fett
  18: C(11),  // Anakin Skywalker
  19: C(88),  // Padmé Amidala
  20: C(13),  // Chewbacca
  26: C(85),  // Poe Dameron
  27: C(83),  // Finn
  30: C(28),  // Mon Mothma
  31: C(25),  // Lando Calrissian
  32: C(27),  // Admiral Ackbar
  34: C(67),  // Jango Fett
  45: C(3),   // R2-D2
  46: C(2),   // C-3PO
  47: C(56),  // Plo Koon
  48: C(51),  // Kit Fisto
}

export const planetImages = {
  1:  P(1),   // Tatooine
  2:  P(9),   // Coruscant
  3:  P(8),   // Naboo
  4:  P(4),   // Hoth
  5:  P(5),   // Dagobah
  6:  P(7),   // Endor
  7:  P(36),  // Mustafar
  8:  P(2),   // Alderaan
  10: P(10),  // Kamino
  11: P(14),  // Kashyyyk
  12: P(11),  // Geonosis
  14: P(22),  // Corellia
  19: P(6),   // Bespin
}