import React, { useContext, useEffect, useState, useRef } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import moment from 'moment'
import { Grid, Image, Card, Button, Icon, Label, Form } from 'semantic-ui-react'

import { AuthContext } from './../context/auth'
import LikeButton from './../components/LikeButton'
import DeleteButton from './../components/DeleteButton'
import { FETCH_POST_QUERY } from './../util/graphql/fetchPost'
import MyPopup from './../util/MyPopup'


function SinglePost(props) {
  const postId = props.match.params.postId
  const { user } = useContext(AuthContext)
  const commentInputRef = useRef(null)
  const [postData, setPostData] = useState(null)
  const [comment, setComment] = useState('')

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  })

  useEffect(() => {
    if (data) {
      setPostData(data.getPost);
    }
  }, [data])

  const [submitComment, { loading }] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('')
      commentInputRef.current.blur()
    },
    variables: {
      postId,
      body: comment
    }
  })

  let postEl
  if (!postData) {
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
      commentCount } = postData

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
                <MyPopup content="Comment on post">
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
                </MyPopup>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deleteButtonCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid >
                <Card.Content>
                  <p>Post a comment</p>
                  <Form className={loading ? 'loading' : ''}>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment..."
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentInputRef}
                      />

                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Sumbit
                    </button>

                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && comment.username === user.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid >
    )
  }

  function deleteButtonCallback() {
    props.history.push('/')
  }

  return postEl
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!){
    createComment(postId: $postId, body: $body){
      id
      comments {
        id username createdAt body
      }
      commentCount
    }
  }
`

export default SinglePost
