import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !description) {
      setError('Please provide both an image and a description.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    try {
      await axios.post('https://travel-mate-backend-9h6l.onrender.com/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear the form
      setImage(null);
      setDescription('');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('An error occurred while creating the post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-4 p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Post</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            rows="4"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
