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

const FETCH_POST_QUERY = gql`
  query ($postId: ID!){
    getPost(postId: $postId){
      id
      body
      username
      createdAt
      likeCount
      likes{
        username
      }
      commentCount
      comments{
        id
        username
        body
        createdAt
      }
    }
  }
`

export {FETCH_POSTS_QUERY, FETCH_POST_QUERY}