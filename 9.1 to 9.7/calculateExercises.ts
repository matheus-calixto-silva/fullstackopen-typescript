import isNumber from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface exerciseValues {
  target: number;
  dailyHours: number[];
}

const parseExerciseArguments = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const dailyHours: unknown[] = args.slice(3);

  if ((isNumber(args[2])) && dailyHours.every((num: unknown) => isNumber(num))) {
    const verifiedDailyHours = dailyHours.map((hours: string) => Number(hours));
    return {
      target: Number(args[2]),
      dailyHours: verifiedDailyHours
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

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

try {
  const { target, dailyHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, dailyHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
} 