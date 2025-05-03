import { db } from '../firebase/config';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore';

const projectsCollection = collection(db, 'projects');

export const projectService = {
  // Get all projects
  async getProjects() {
    try {
      const q = query(projectsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  },

  // Get projects by user ID
  async getProjectsByUserId(userId) {
    try {
      const snapshot = await db
        .collection('projects')
        .where('userId', '==', userId)
        .get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Add a new project
  async addProject(projectData) {
    try {
      const docRef = await db.collection('projects').add(projectData);
      return {
        id: docRef.id,
        ...projectData
      };
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  },

  // Update an existing project
  async updateProject(projectId, projectData) {
    try {
      await db.collection('projects').doc(projectId).update(projectData);
      return {
        id: projectId,
        ...projectData
      };
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete a project
  async deleteProject(projectId) {
    try {
      await db.collection('projects').doc(projectId).delete();
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }
}; 