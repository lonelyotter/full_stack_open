import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useQuery, useMutation, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import Navigation from "./components/Navigation";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { BOOK_ADDED, ALL_BOOKS } from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(
        `New book added: ${addedBook.title} by ${addedBook.author.name}`
      );
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("login");
  };

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(JSON.parse(token));
    }
  }, []);

  return (
    <div>
      <Navigation setPage={setPage} logout={logout} token={token} />
      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} token={token} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
