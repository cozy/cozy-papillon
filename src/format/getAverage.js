export const GetAverage = (grades = [], type = "student", scale = 20) => {
  console.log(grades)
  if (!Array.isArray(grades) || grades.length === 0) return 0;

  const { weightedSum, totalWeight } = grades.reduce(
    (acc, grade) => {
      if (!grade || !grade.value) return acc;

      const outOf = Number(grade.value["outOf"] ?? scale);
      const raw = Number(grade.value[type]);
      if (!Number.isFinite(raw)) return acc;

      const coef = Number(grade.value["coef"] ?? 1);
      if (!Number.isFinite(coef) || coef <= 0) {
        return acc;
      }
      
      const normalized = (raw / outOf) * scale;

      acc.weightedSum += normalized * coef;
      acc.totalWeight += coef;
      return acc;
    },
    { weightedSum: 0, totalWeight: 0 }
  );

  if (totalWeight <= 0) return 0;

  return weightedSum / totalWeight;
};

export default GetAverage;