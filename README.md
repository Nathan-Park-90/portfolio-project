# Portfolio Project

A modern portfolio website built with React, Firebase, and Tailwind CSS.

## Features

- Responsive design
- Dark mode support
- Project management dashboard
- Image upload and storage
- Authentication with email/password and Google
- Real-time updates
- Modern UI with animations

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-project.git
cd portfolio-project
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

4. Start the development server:
```bash
npm start
```

## Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)

2. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password and Google sign-in

3. Set up Firestore:
   - Go to Firestore Database
   - Create a database in production mode
   - Set up security rules (see below)

4. Set up Storage:
   - Go to Storage
   - Create a storage bucket
   - Set up security rules (see below)

## Security Rules

### Firestore Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Technologies Used

- React
- Firebase (Authentication, Firestore, Storage)
- Tailwind CSS
- Framer Motion
- React Router
- React Icons

## License

This project is licensed under the MIT License - see the LICENSE file for details.