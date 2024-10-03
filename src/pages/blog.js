import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../pages/page-styles/blogs.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://vikingsdb.up.railway.app/blog/')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <div key={blog.id} className="blog-item">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="blog-image" 
            onClick={() => handleBlogClick(blog.id)} 
          />
          <div className="blog-content">
            <h2 
              className="blog-title" 
              onClick={() => handleBlogClick(blog.id)}
            >
              {blog.title}
            </h2>
            <p className="blog-date">{new Date(blog.date).toLocaleDateString()}</p>
            <p className="blog-content-excerpt">
              {blog.content.split(' ').slice(0, 50).join(' ')}...
              <span className="read-more" onClick={() => handleBlogClick(blog.id)}> Leer más</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
