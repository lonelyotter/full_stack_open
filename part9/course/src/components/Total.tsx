interface coursePart {
  name: string;
  exerciseCount: number;
}

interface totalProps {
  courseParts: coursePart[];
}

const Total = (props: totalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
