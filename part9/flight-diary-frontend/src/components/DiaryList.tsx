import { Diary } from "../types";

const DiaryList = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => {
        return (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <div>weather: {diary.weather}</div>
            <div>visibility: {diary.visibility}</div>
            <div>{diary.comment}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DiaryList;
