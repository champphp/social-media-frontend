import React, { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import moment from 'moment'
import { Grid, Image, Card, Button, Icon, Label } from 'semantic-ui-react'

import { AuthContext } from './../context/auth'
import LikeButton from './../components/LikeButton'
import DeleteButton from './../components/DeleteButton'


function SinglePost(props) {
  const postId = props.match.params.postId
  const { user } = useContext(AuthContext)

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  })

  let postEl
  if (!data) {
    postEl = <p>Loading post...</p>
  } else {
    const {
      id,
      username,
      body,
      createdAt,
      comments,
      likes,
      likeCount,
      commentCount } = data.getPost

    postEl = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated='right'
              size='small'
              src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
            />
          </Grid.Column>

          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log('comments')}
                >
                  <Button color='blue' basic >
                    <Icon name='comments' />
                  </Button>
                  <Label basic color='blue' pointing='left'>
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deleteButtonCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid >
    )
  }

  function deleteButtonCallback () {
    props.history.push('/')
  }

  return postEl
}

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

export default SinglePost
