import React from 'react'
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client'
import {setContext} from 'apollo-link-context'

import App from './App'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
})

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {Authorization: token ? `Bearer ${token}` : ''}
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      UnconventionalRootQuery: {
        // The RootQueryFragment can only match if the cache knows the __typename
        // of the root query object.
        queryType: true,
      },
    },
  })
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
