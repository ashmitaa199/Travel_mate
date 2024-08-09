import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('An error occurred while fetching posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto my-4 p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.post_id} className="mb-4">
            <img src={post.image} alt="Post" className="w-full h-64 object-cover rounded-lg mb-2" />
            <p>{post.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayPosts;
