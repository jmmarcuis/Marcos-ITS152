import React, { useState, useEffect } from 'react';
import { listPosts, Post } from '../services/PostService';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, getToken } from '../services/TokenService';

const ListPostPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!getToken()) {
      navigate('/login');
    } else {
      fetchPosts();
    }
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await listPosts();
      setPosts(fetchedPosts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  if (isLoading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="post-list-container">
      <h1 className="post-list-title">Blog Posts</h1>
      <div className="username-display">Logged in as: {getToken()}</div>
      {posts.length === 0 ? (
        <p className="no-posts">No posts available.</p>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-item">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-author">
                By {post.firstName} {post.lastName} ({post.userName})
              </p>
              <p className="post-date">
                Posted on: {new Date(post.dateCreated).toLocaleDateString()}
              </p>
              <Link to={`/post/${post.id}`} className="read-more">
                Read more
              </Link>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <Link to="/add-post" className="add-post-button">
        Add New Post
      </Link>
    </div>
  );
};

export default ListPostPage;
