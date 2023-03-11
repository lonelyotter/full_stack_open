interface Result {
  days: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

interface ExerciseValues {
  daily_exercises: number[];
  target: number;
}

const parseExercisesArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (isNaN(Number(args[2]))) {
    throw new Error("Provided values were not numbers!");
  }

  const daily_exercises = args.slice(3).map((hour) => {
    if (isNaN(Number(hour))) {
      throw new Error("Provided values were not numbers!");
    }
    return Number(hour);
  });

  return {
    daily_exercises,
    target: Number(args[2]),
  };
};

export const calculateExercises = (
  daily_exercises: number[],
  target: number
): Result => {
  const days = daily_exercises.length;
  const trainingDays = daily_exercises.filter((hour) => hour > 0).length;
  const average = daily_exercises.reduce((a, b) => a + b, 0) / days;
  const success = average >= target;
  const rating = success ? 3 : average >= target / 2 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "Great job!"
      : rating === 2
      ? "Not too bad but could be better"
      : "You should try harder";

  return {
    days,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

try {
  const { daily_exercises, target } = parseExercisesArguments(process.argv);
  console.log(calculateExercises(daily_exercises, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
