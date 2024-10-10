import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { Editor } from '@tinymce/tinymce-react';
import DOMPurify from 'dompurify';
import '../pages/page-styles/blogs.css';

// Configura el elemento de la aplicación para react-modal
Modal.setAppElement('#root');

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(3); // Número inicial de blogs visibles
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Funcion para obtener los blogs de la base de datos
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

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 && !loading) {
        setLoading(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Funcion para cargar mas blogs
  useEffect(() => {
    if (!loading) return;
    if (visibleBlogs >= blogs.length) return;

    const loadMoreBlogs = () => {
      setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 3);
      setLoading(false);
    };

    loadMoreBlogs();
  }, [loading, visibleBlogs, blogs.length]);

  // Funcion para navegar a la pagina del blog
  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  // Funcion para abrir el modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Funcion para cerrar el modal
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

  // Funcion para subir la imagen a cloudinary
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

  // Funcion para guardar el blog en la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImageToCloudinary();
    if (!imageUrl) {
      console.error('Failed to upload image');
      return;
    }

    const author_id = 33;
    const date = new Date().toISOString();
    const blogData = { ...newBlog, image: imageUrl, author_id, date };

    const token = localStorage.getItem('token');

    axios.post('https://vikingsdb.up.railway.app/blog/', blogData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setBlogs([...blogs, response.data]);
      closeModal();
      setNewBlog({ title: '', content: '', image: '' });
      setImageFile(null);
    })
    .catch(error => {
      console.error('Error creating blog:', error);
    });
  };

  return (
    <div className="blog-list-page">
      <div className="blog-list">
      {isLoggedIn && (
        <button onClick={openModal} className="create-blog-button">Crear Blog</button>
      )}
        {blogs.slice(0, visibleBlogs).map(blog => (
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
              <Editor
                apiKey="8hyhnh1u0q899xxtr0m8zplw4s64u66kswnewdj3smav0kj1"
                value={newBlog.content}
                onEditorChange={handleContentChange}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar: `undo redo | styles | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help`
                }}
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