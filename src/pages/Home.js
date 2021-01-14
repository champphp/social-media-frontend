import React, { useContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'

import PostCard from './../components/PostCard'
import { AuthContext } from './../context/auth'
import PostForm from './../components/PostForm'
import { FETCH_POSTS_QUERY } from './../util/graphql/fetchPost'

function Home() {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([]);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)
  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data])

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {
          user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )
        }
        {
          loading ? (
            <h1>Loading posts...</h1>
          ) : (
              <Transition.Group>
                {posts && posts.map(post => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
              </Transition.Group>
            )
        }
      </Grid.Row>
    </Grid>
  )
}

export default Home
