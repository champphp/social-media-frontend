import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'

import { useForm } from './../util/hooks'
import { FETCH_POSTS_QUERY } from './../util/graphql/fetchPost'

function PostForm() {

  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: ''
  })

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      let newData = [...data.getPosts]
      newData = [result.data.createPost, ...newData]
      proxy.writeQuery({ 
        query: FETCH_POSTS_QUERY, 
        data: {getPosts : newData}
      })
      values.body = ''
    },
    onError(err) {
    },
  })

  function createPostCallback() {
    createPost()
  }

  return (
    <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder='Hi create post'
            name='body'
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Sumbit
        </Button>
        </Form.Field>
      </Form>
      {
        error && (
          <div className="ui error message" style={{ marginBottom: 20 }}>
            <ul className="list">
              <li>{error.message}</li>
            </ul>
          </div>
        )
      }
    </div>

  )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!){
    createPost(body: $body) {
      id 
      body 
      createdAt 
      username
      likes{
        id 
        username 
        createdAt
      }
      likeCount
      comments{
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`

export default PostForm
