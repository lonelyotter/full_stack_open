interface coursePart {
  name: string;
  exerciseCount: number;
}

interface contentProps {
  courseParts: coursePart[];
}

const Content = (props: contentProps) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
