import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Label } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'


function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [user, likes])

  const likeButtonEl = (
    user ? (
      liked ? (
        <Button color='teal' >
          <Icon name='heart' />
        </Button>
      ) : (
          <Button color='teal' basic >
            <Icon name='heart' />
          </Button>
        )
    ) : (
        <Button as={Link} to='/login' color='teal' basic >
          <Icon name='heart' />
        </Button>
      )
  )

  const [LikePost, {loading}] = useMutation(LIKE_POST_MUTATION, {
    variables:{postId: id}
  })

  return (
    <Button 
      as='div' 
      labelPosition='right' 
      onClick={LikePost} 
      className={loading ? 'loading' : ''} 
    >
      {likeButtonEl}
      <Label basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!){
    likePost(postId: $postId){
      id
      likes{
        id
        username
      }
      likeCount
    }
  }
`

export default LikeButton
