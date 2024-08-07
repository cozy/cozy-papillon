const colors = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A1',
  '#A133FF',
  '#33FFF3',
  '#FF8C33',
  '#8CFF33',
  '#338CFF',
  '#FF3380',
  '#8033FF',
  '#33FF80',
  '#FFC733',
  '#C733FF',
  '#33FFB8',
  '#FF3333',
  '#33FF33',
  '#3333FF',
  '#FF33E6',
  '#E633FF',
  '#33FF66',
  '#FF66CC',
  '#66FF33',
  '#66CCFF',
  '#FF9966',
  '#66FF99',
  '#9966FF',
  '#FF6633',
  '#33FF99',
  '#6699FF'
]

function seedRandom(seed) {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
  }
  return function () {
    h = (Math.imul(31, h) + 1) | 0
    return ((h ^ (h >>> 15)) >>> 0) / 4294967296
  }
}

function getRandomItemFromList(list, seed) {
  if (list.length === 0) return null
  const random = seedRandom(seed)
  const randomIndex = Math.floor(random() * list.length)
  return list[randomIndex]
}

export const subjectColor = subject => {
  return getRandomItemFromList(colors, subject)
}
