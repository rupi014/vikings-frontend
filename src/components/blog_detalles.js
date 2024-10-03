import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../components/styles/blog_detalles.css';

const BlogDetalles = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`https://vikingsdb.up.railway.app/blog/${id}`)
      .then(response => {
        setBlog(response.data);
      })
      .catch(error => {
        console.error('Error fetching blog details:', error);
      });
  }, [id]);

  if (!blog) return <div>Cargando...</div>;

  return (
    <div className="blog-detalles-page">
        <div className="blog-detalles">
      <h1 className="blog-detalles-title">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="blog-detalles-image" />
      <p className="blog-detalles-content">{blog.content}</p>
    </div>
    </div>
  );
};

export default BlogDetalles;