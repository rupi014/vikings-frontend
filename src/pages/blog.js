import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css'; // Importa los estilos de Quill
import '../pages/page-styles/blogs.css';

// Configura el elemento de la aplicación para react-modal
Modal.setAppElement('#root');

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleContentChange = (content) => {
    setNewBlog({ ...newBlog, content });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'ml_default'); // Reemplaza con tu upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/doo3lslbw/image/upload`, // Reemplaza con tu cloud name
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImageToCloudinary();
    if (!imageUrl) {
      console.error('Failed to upload image');
      return;
    }

    const author_id = 33; // Reemplaza esto con el ID del usuario logeado
    const date = new Date().toISOString();
    const blogData = { ...newBlog, image: imageUrl, author_id, date };

    const token = localStorage.getItem('token'); // Obtén el token de autenticación

    axios.post('https://vikingsdb.up.railway.app/blog/', blogData, {
      headers: {
        'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
      }
    })
    .then(response => {
      setBlogs([...blogs, response.data]);
      closeModal();
      // Restablecer el estado del nuevo blog y la imagen
      setNewBlog({ title: '', content: '', image: '' });
      setImageFile(null);
    })
    .catch(error => {
      console.error('Error creating blog:', error);
    });
  };

  return (
    <div className="blog-list-page">
      {isLoggedIn && (
        <button onClick={openModal} className="create-blog-button">Crear Blog</button>
      )}
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
              <p className="blog-content-excerpt"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content.split(' ').slice(0, 50).join(' ') + '...') }}
              />
              <span className="read-more" onClick={() => handleBlogClick(blog.id)}> Leer más</span>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Crear Blog"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Crear Blog</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Título:
            <input type="text" name="title" value={newBlog.title} onChange={handleInputChange} required />
          </label>
          <label>
            Contenido:
            <div className="editor">
              <ReactQuill 
                value={newBlog.content} 
                onChange={handleContentChange} 

              />
            </div>
          </label>
          <label>
            Imagen:
            <input type="file" name="image" onChange={handleImageChange} required />
          </label>
          <button type="submit">Guardar</button>
          <button type="button" onClick={closeModal}>Cancelar</button>
        </form>
      </Modal>
    </div>
  );
};

export default BlogList;