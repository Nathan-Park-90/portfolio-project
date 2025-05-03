import { storage } from '../firebase/config';

export const storageService = {
  // Upload an image file
  async uploadImage(file, userId) {
    try {
      // Create a unique filename
      const timestamp = Date.now();
      const filename = `${userId}/${timestamp}-${file.name}`;
      
      // Upload the file
      const storageRef = storage.ref();
      const fileRef = storageRef.child(filename);
      await fileRef.put(file);
      
      // Get the download URL
      const url = await fileRef.getDownloadURL();
      
      return {
        url,
        path: filename
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Delete an image
  async deleteImage(path) {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(path);
      await fileRef.delete();
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
}; 