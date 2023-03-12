import { useState, useEffect } from "react";
import { Diary } from "./types";
import { getAllDiaries, createDiary } from "./services/diaryService";
import DiaryList from "./components/DiaryList";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newWeather, setNewWeather] = useState("");
  const [newVisibility, setNewVisibility] = useState("");
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment,
    };
    try {
      const returnedDiary = await createDiary(newDiary);
      setDiaries(diaries.concat(returnedDiary));
      setNewDate("");
      setNewWeather("");
      setNewVisibility("");
      setNewComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input type={"date"} onChange={(e) => setNewDate(e.target.value)} />
        </div>
        <div>
          visibility great
          <input
            type="radio"
            name="visibility"
            onChange={() => {
              setNewVisibility("great");
            }}
          />
          good
          <input
            type="radio"
            name="visibility"
            onChange={() => {
              setNewVisibility("good");
            }}
          />
          ok
          <input
            type="radio"
            name="visibility"
            onChange={() => {
              setNewVisibility("ok");
            }}
          />
          bad
          <input
            type="radio"
            name="visibility"
            onChange={() => {
              setNewVisibility("bad");
            }}
          />
        </div>
        <div>
          weather sunny
          <input
            type="radio"
            name="weather"
            onChange={() => {
              setNewWeather("sunny");
            }}
          />
          rainy
          <input
            type="radio"
            name="weather"
            onChange={() => {
              setNewWeather("rainy");
            }}
          />
          cloudy
          <input
            type="radio"
            name="weather"
            onChange={() => {
              setNewWeather("cloudy");
            }}
          />
          stormy
          <input
            type="radio"
            name="weather"
            onChange={() => {
              setNewWeather("stormy");
            }}
          />
          windy
          <input
            type="radio"
            name="weather"
            onChange={() => {
              setNewWeather("windy");
            }}
          />
        </div>
        <div>
          comment
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
