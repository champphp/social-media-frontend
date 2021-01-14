import { gql } from '@apollo/client'

const FETCH_POSTS_QUERY = gql`
  query {
  getPosts {
    id
    body
    username
    createdAt
    comments{
      id
      username
      body
    }
    likes{
      id
      username
    }
    likeCount
    commentCount
  }
}
`

export {FETCH_POSTS_QUERY}