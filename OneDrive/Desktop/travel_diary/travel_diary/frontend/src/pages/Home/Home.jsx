// Home.jsx
import React, { useState, useEffect } from 'react';
import './home.css';
import MainNavbar from '../../layouts/Main_Navbar/MainNavbar.jsx';
import Sidebar from '../../layouts/Sidebar/Sidebar.jsx';
import postIcon from '../../assets/icon/sent-stroke-rounded.svg';
import imageIcon from '../../assets/icon/image-02-stroke-rounded.svg';
import clipIcon from '../../assets/icon/attachment-02-stroke-rounded.svg';
import ForumPost from '../../components/Post/Post.jsx';

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [selectedImage, setSelectedImage] = useState(null);

  // fetching posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // to handel new post submissions
  const handlePostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('content', newPost.content);
      formData.append('username', user.username);
      if (selectedImage) formData.append('image', selectedImage);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newPostData = await response.json();
        setPosts((prevPosts) => [newPostData, ...prevPosts]);
        setNewPost({ title: '', content: '' });
        setSelectedImage(null);
      } else {
        console.error('Error posting the new post');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const handleDeletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  };

  return (
    <div>
      <MainNavbar />
      <Sidebar user={user}/>
      <div className="forum-container">
        <main className="forum-feed">
          <div className="forum-feed-container">
            {posts.length > 0 ? (
              posts.map((postDetails) => (
                <ForumPost
                  key={postDetails._id}
                  postDetails={postDetails}
                  onDelete={handleDeletePost}
                  onLike={(id, updatedLikes) => {
                    setPosts((prevPosts) =>
                      prevPosts.map((p) =>
                        p._id === id ? { ...p, likes: updatedLikes } : p
                      )
                    );
                  }}
                  currentUser={user}
                />
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
          <div className="forum-search-bar-forum">
            <input
              type="text"
              placeholder="Title..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Content..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <img className="forum-image-icon" src={imageIcon} alt="image icon" />
            </label>
            <img className="forum-clip-icon" src={clipIcon} alt="attachment icon" />
            <img
              className="forum-post-icon"
              src={postIcon}
              alt="post icon"
              onClick={handlePostSubmit}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
