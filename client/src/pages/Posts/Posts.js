import React from "react";
import Post from "../../components/Post/Post";
import { useQuery, gql } from "@apollo/client";

 // define what info you wanna get
// this query will make accessible: [posts and posts.user] values 
const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;

// getting the values using useQuery 
export default function Posts() {
  const { error, loading, data } = useQuery(GET_POSTS);

  if (error) return <div>Error Page</div>;

  if (loading) return <div>Spinner...</div>;

  const { posts } = data;

  return (
    <div>
      {posts.map((post) => {
        return (
          <Post
            title={post.title}
            content={post.content}
            date={post.createdAt}
            id={post.id}
            user={post.user.name}
          />
        );
      })}
    </div>
  );
}
