interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratingCalc = (averageExcerciseHours: number, target: number) => {
  if (averageExcerciseHours < target) {
    return { ratingValue: 1, ratingDescription: "You need to exercise more" };
  } else if (averageExcerciseHours === target) {
    return { ratingValue: 2, ratingDescription: "You are doing well, but you could do better" };
  } else {
    return { ratingValue: 3, ratingDescription: "You are doing great!" };
  }
};

export const calculateExercises = (target: number, dailyHours: number[]): Result => {
  const numberOfDays = dailyHours.length;
  const numberOfDaysWithExercise = dailyHours.filter(hours => hours > 0).length;
  const averageExcerciseHours = dailyHours.reduce((acc, currentValue) => acc + currentValue, 0) / numberOfDays;
  const targetReached = averageExcerciseHours >= target;
  const rating = ratingCalc(averageExcerciseHours, target);

  return {
    periodLength: numberOfDays,
    trainingDays: numberOfDaysWithExercise,
    success: targetReached,
    rating: rating.ratingValue,
    ratingDescription: rating.ratingDescription,
    target: target,
    average: averageExcerciseHours
  };
};

console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));