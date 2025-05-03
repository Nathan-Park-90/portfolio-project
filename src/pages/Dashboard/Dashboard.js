import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { projectService } from '../../services/projectService';
import { storageService } from '../../services/storageService';
import ProjectForm from './ProjectForm';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './Dashboard.module.css';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    project: null
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const userProjects = await projectService.getProjectsByUserId(currentUser.uid);
        setProjects(userProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        showNotification('Failed to load projects. Please try again later.', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchProjects();
    }
  }, [currentUser, showNotification]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
      showNotification('Failed to log out. Please try again.', 'error');
    }
  };

  const handleProjectSubmit = async (projectData) => {
    try {
      setLoading(true);
      if (editingProject) {
        // Update existing project
        const updatedProject = await projectService.updateProject(
          editingProject.id,
          { ...projectData, userId: currentUser.uid }
        );
        setProjects(projects.map(p => 
          p.id === editingProject.id ? updatedProject : p
        ));
        showNotification('Project updated successfully!', 'success');
      } else {
        // Add new project
        const newProject = await projectService.addProject({
          ...projectData,
          userId: currentUser.uid
        });
        setProjects([newProject, ...projects]);
        showNotification('Project added successfully!', 'success');
      }
      setEditingProject(null);
    } catch (err) {
      console.error('Error saving project:', err);
      showNotification('Failed to save project. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
  };

  const handleDeleteClick = (project) => {
    setDeleteDialog({
      isOpen: true,
      project
    });
  };

  const handleDeleteConfirm = async () => {
    const { project } = deleteDialog;
    try {
      setLoading(true);
      
      // Delete the project image if it exists
      if (project.imagePath) {
        await storageService.deleteImage(project.imagePath);
      }
      
      // Delete the project from Firestore
      await projectService.deleteProject(project.id);
      
      // Update the local state
      setProjects(projects.filter(p => p.id !== project.id));
      showNotification('Project deleted successfully!', 'success');
    } catch (err) {
      console.error('Error deleting project:', err);
      showNotification('Failed to delete project. Please try again.', 'error');
    } finally {
      setLoading(false);
      setDeleteDialog({ isOpen: false, project: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, project: null });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="dashboard"
    >
      <div className="dashboardHeader">
        <h1>Dashboard</h1>
        <div className="userInfo">
          <span>Welcome, {currentUser?.email}</span>
          <button onClick={handleLogout} className="logoutButton">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboardTabs">
        <button
          className={`tabButton ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`tabButton ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </button>
        <button
          className={`tabButton ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          Experience
        </button>
      </div>

      <div className="dashboardContent">
        {activeTab === 'projects' && (
          <div className="contentSection">
            <div className="sectionHeader">
              <h2>Manage Projects</h2>
              <button
                className="addButton"
                onClick={() => setEditingProject({})}
              >
                Add New Project
              </button>
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : editingProject !== null ? (
              <ProjectForm
                onSubmit={handleProjectSubmit}
                initialData={editingProject}
              />
            ) : (
              <div className="projectsList">
                {projects.length === 0 ? (
                  <div className="emptyState">
                    <p>No projects found. Add your first project!</p>
                  </div>
                ) : (
                  projects.map((project) => (
                    <div key={project.id} className="projectCard">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="projectImage"
                      />
                      <div className="projectInfo">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="projectActions">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="editButton"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(project)}
                            className="deleteButton"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
        {activeTab === 'skills' && (
          <div className="contentSection">
            <h2>Manage Skills</h2>
            {/* Skills management content will go here */}
          </div>
        )}
        {activeTab === 'experience' && (
          <div className="contentSection">
            <h2>Manage Experience</h2>
            {/* Experience management content will go here */}
          </div>
        )}
      </div>

      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </motion.div>
  );
};

export default Dashboard; 