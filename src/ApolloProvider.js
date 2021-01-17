import React from 'react'
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client'
import {setContext} from 'apollo-link-context'

import data from './APIKey'
import App from './App'

const httpLink = createHttpLink({
  uri: data.apiUrl,
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
