// App.js
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import HandleAuth from './components/Handle';
import CategoryPage from './components/CategoryPage'; // Import the new CategoryPage component

// Create an http link
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', 
});

// Create an auth link
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Create the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/handle-auth" element={<HandleAuth />} />
            <Route path="/category/:category" element={<CategoryPage />} /> {/* Add this new route */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;