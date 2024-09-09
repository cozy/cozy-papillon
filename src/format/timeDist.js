export const timeDist = (timeStart, timeEnd) => {
  // return time difference like "1h 30 min" or "30 min"
  const timeDiff = timeEnd - timeStart
  const hours = Math.floor(timeDiff / 3600000)
  const minutes = Math.floor((timeDiff % 3600000) / 60000)
  return hours ? `${hours}h ${minutes}min` : `${minutes}min`
}
