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
  hours: number[];
  target: number;
}

const parseExercisesArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (isNaN(Number(args[2]))) {
    throw new Error("Provided values were not numbers!");
  }

  const hours = args.slice(3).map((hour) => {
    if (isNaN(Number(hour))) {
      throw new Error("Provided values were not numbers!");
    }
    return Number(hour);
  });

  return {
    hours,
    target: Number(args[2]),
  };
};

const calculateExercises = (hours: number[], target: number): Result => {
  const days = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / days;
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
  const { hours, target } = parseExercisesArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
