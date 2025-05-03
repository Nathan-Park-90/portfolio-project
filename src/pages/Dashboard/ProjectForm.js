import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import './ProjectForm.module.css';

const ProjectForm = ({ onSubmit, initialData }) => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [technologies, setTechnologies] = useState(initialData?.technologies || []);
  const [newTech, setNewTech] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setTechnologies(initialData.technologies || []);
      setImagePreview(initialData.imageUrl || '');
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTech = (e) => {
    e.preventDefault();
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech('');
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setTechnologies(technologies.filter(tech => tech !== techToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let imageUrl = initialData?.imageUrl;
      let imagePath = initialData?.imagePath;

      if (imageFile) {
        // Upload new image
        const { url, path } = await storageService.uploadImage(imageFile, currentUser.uid);
        imageUrl = url;
        imagePath = path;

        // Delete old image if exists
        if (initialData?.imagePath) {
          await storageService.deleteImage(initialData.imagePath);
        }
      }

      const projectData = {
        title,
        description,
        technologies,
        imageUrl,
        imagePath
      };

      await onSubmit(projectData);
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="form"
      onSubmit={handleSubmit}
    >
      <div className="formGroup">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="technologies">Technologies</label>
        <div className="techTags">
          {technologies.map((tech) => (
            <div key={tech} className="techTag">
              {tech}
              <button
                type="button"
                className="removeTech"
                onClick={() => handleRemoveTech(tech)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddTech} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="Add technology"
          />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="formGroup">
        <label htmlFor="image">Project Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Project preview"
            className="imagePreview"
          />
        )}
      </div>

      <div className="formActions">
        <button
          type="button"
          className="cancelButton"
          onClick={() => onSubmit(null)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="submitButton"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </motion.form>
  );
};

export default ProjectForm; 