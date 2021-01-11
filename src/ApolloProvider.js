import React from 'react'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'

import App from './App'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
