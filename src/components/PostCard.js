import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react'
import moment from 'moment'


function PostCard({ post }) {
  const { id, username, body, likeCount, commentCount, createdAt, comments } = post

  const LikePost = () => {
    console.log(`Like Post ${id}`)
  }

  const commentOnPost = () => {
    console.log(`Show comment ${comments[0].body}`)
  }
  return (

    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={LikePost}>
          <Button color='teal' basic >
            <Icon name='heart' />
      </Button>
          <Label basic color='teal' pointing='left'>
            {likeCount}
      </Label>
        </Button>

        <Button as='div' labelPosition='left' onClick={commentOnPost} > 
          <Button color='blue' basic >
            <Icon name='comments' />
      </Button>
          <Label basic color='blue' pointing='left'>
            {commentCount}
      </Label>
        </Button>
      </Card.Content>
    </Card>

  )
}

export default PostCard
