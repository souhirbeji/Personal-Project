import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutButton from './LogoutButton';
const CreateIdeas = () => {
  const [idea, setIdea] = useState('');
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null); // Assume user is authenticated
  const [likedPosts, setLikedPosts] = useState([]); 

    useEffect(() => {
      // Fetch user information (replace with your authentication logic)
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:7000/user');
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
  
      fetchUser();
    }, []);
  useEffect(() => {
    // Fetch posts when the component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:7000/ideas');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Make a POST request to create a new post
      await axios.post('http://localhost:7000/ideas', { text: idea });
  
      // Clear the input field
      setIdea('');
  
      // Fetch updated posts after creating a new one
      await fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  

  const handleDelete = async (postId) => {
    try {
      // Make a DELETE request to delete a post
      await axios.delete(`http://localhost:7000/ideas/${postId}`);
      // Fetch updated posts after deleting one
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  const handleLike = (postId) => {
    // Check if the post is already liked by the user
    if (!likedPosts.includes(postId)) {
      // If not liked, add the post ID to the likedPosts state
      setLikedPosts([...likedPosts, postId]);
    }
  };
  return (
    <div>
      <LogoutButton/>
      <form onSubmit={handleSubmit}>
        <label htmlFor="idea">Your Idea:</label>
        <input
          type="text"
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        <button type="submit">Submit Idea</button>
      </form>

      <div>
        <h2>Posts:</h2>
        <table>
          <thead>
            <tr>
              <th>Idea</th>
              <th>Posted by</th>
              <th>Action</th>
              <th>Likes</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.text}</td>
                <td>{post.user ? post.user.name : 'Unknown User'}</td>  
                <td>
                  {(
                    <button onClick={() => handleLike(post._id)}>Like</button>
                    
                  )}
                  {(<button onClick={() => handleDelete(post._id)}>Delete</button>)}
                </td>
                <td>
                  {likedPosts.includes(post._id) ? <span>1</span> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CreateIdeas;