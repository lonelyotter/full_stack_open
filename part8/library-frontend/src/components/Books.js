import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

import BookList from "./BookList";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre ? selectedGenre : undefined },
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <strong>{selectedGenre || "all genres"}</strong>
      </p>

      <BookList books={books} />

      <div>
        {["database", "computer"].map((genre) => {
          return (
            <button key={genre} onClick={() => setSelectedGenre(genre)}>
              {genre}
            </button>
          );
        })}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
