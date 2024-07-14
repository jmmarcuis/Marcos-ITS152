import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetails, Post } from '../services/PostService';

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        if (id) {
          const postDetails = await getPostDetails(parseInt(id));
          setPost(postDetails);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  if (isLoading) {
    return <div className="loading">Loading post details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!post) {
    return <div className="not-found">Post not found</div>;
  }

  return (
    <div className="post-detail-container">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">
        By {post.firstName} {post.lastName} ({post.userName})
        <br />
        Posted on: {new Date(post.dateCreated).toLocaleDateString()}
      </p>
      <div className="post-body">{post.body}</div>
    </div>
  );
};

export default PostDetailPage;
