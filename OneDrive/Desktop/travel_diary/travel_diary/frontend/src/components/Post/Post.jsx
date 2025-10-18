import React, { useState, useEffect } from 'react';
import '../../pages/Home/home.css';
import like from '../../assets/icon/Like1-Linear-32px.svg';
import dislike from '../../assets/icon/Dislike-Linear-32px.svg';
import comment from '../../assets/icon/bubble-chat-stroke-rounded.svg';
import share from '../../assets/icon/share-01-stroke-rounded.svg';
import deleteIcon from '../../assets/icon/delete-02-stroke-rounded.svg';

const ForumPost = ({ postDetails, onDelete, onLike, currentUser }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(postDetails.comments);
  const [likes, setLikes] = useState(postDetails.likes);

  const toggleComments = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postDetails._id}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: currentUser.username,
            content: newComment,
          }),
        });

        if (response.ok) {
          const updatedPost = await response.json();
          setComments(updatedPost.comments);
          setNewComment('');
        } else {
          console.error('Failed to add comment');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleLikePost = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postDetails._id}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
        onLike(postDetails._id, data.likes);
      } else {
        console.error('Failed to update likes');
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postDetails._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onDelete(postDetails._id);
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="forum_post">
      <div className="forum_post_details">
        <img src={postDetails.profilePic} alt="post_profile_pic" />
        <p>{postDetails.username}</p>
        <img className="delete-post-icon"
          src={deleteIcon} 
          alt="delete post"
          onClick={handleDeletePost}
          style={{ cursor: 'pointer', marginLeft: '8px' }} 
        />
      </div>
      <h4>{postDetails.title}</h4>
      <p>{postDetails.content}</p>
      {postDetails.image && (
        <img 
          src={`http://localhost:5000/${postDetails.image}`} 
          alt="Post image" 
        />
      )}
      <div className="forum_post_bottom">
        <div className="forum_post_bottom_like" onClick={handleLikePost}>
          <img src={like} alt="like" />
          <p>{postDetails.likes}</p>
        </div>
        <img src={dislike} alt="dislike" />
        <img src={comment} alt="comment" onClick={toggleComments} />
        <img src={share} alt="share" />
      </div>
      {isExpanded && (
        <div className="forum_comments_section">
          <h4>Comments:</h4>
          {comments.map((comment, index) => (
            <div className="forum_comments_section_inner" key={index}>
              <div key={index} className="forum_comment">
                <div className="forum_comment_user">
                  <strong>{comment.username}:</strong>
                  <p>{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="user_comment_container">
            <input
              type="text"
              placeholder="Add a comment..."
              className="forum_add_comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="comment_button" onClick={handleAddComment}>
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPost;
