import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import searchBooks from "./pages/searchBooks";
import savedBooks from "./pages/savedBooks";
import Navbar from "./components/Navbar";

// import Apollo Provider
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink 
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attch the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers : {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// excutre the 'authLink middleware prior to making the request to the GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client = {client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path = "/" component={searchBooks}/>
            <Route exact path = "/saved" component={savedBooks}/>
            <Route render={() => <h1 className="display-2">Wrong page!</h1>}/>
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;