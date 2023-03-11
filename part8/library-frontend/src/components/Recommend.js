import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import BookList from "./BookList";

const Recommend = ({ show, token }) => {
  const favoriteGenre = token ? token.user.favoriteGenre : undefined;
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
  });

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <BookList books={books} />
    </div>
  );
};
export default Recommend;
