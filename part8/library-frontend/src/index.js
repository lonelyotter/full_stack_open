import ReactDOM from "react-dom/client";
import App from "./App";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  let token = localStorage.getItem("library-user-token");
  token = token ? JSON.parse(token) : null;
  token = token ? token.value : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
