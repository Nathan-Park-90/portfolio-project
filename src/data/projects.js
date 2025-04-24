export const projects = [
    {
        id: 'project-1',
        title: 'My Awesome Project 1',
        shortDescription: 'A brief summary of project 1.',
        longDescription: 'A detailed explanation of project 1...',
        imageUrl: '/images/placeholder.jpg', // Use the placeholder image
        technologies: ['React', 'Node.js', 'CSS'],
        githubLink: 'https://github.com/your-username/project-1',
        liveDemoLink: 'https://your-project-1.com',
        type: 'image', // or 'pdf', or 'description'
        content: '/images/placeholder.jpg' //Path to pdf or image
    },
    {
        id: 'project-2',
        title: 'Another Cool Project',
        shortDescription: 'A short description of project 2.',
        longDescription: 'More details about project 2...',
        imageUrl: '/images/placeholder.jpg',
        technologies: ['JavaScript', 'HTML', 'CSS'],
        githubLink: 'https://github.com/your-username/project-2',
        liveDemoLink: null, // No live demo
        type: 'pdf',
        content: '/images/placeholder.jpg' //Path to pdf or image
    },
    {
        id: 'project-3',
        title: 'PDF Project Example',
        shortDescription: 'This project displays a PDF.',
        longDescription: 'This is a longer description of the PDF project.',
        imageUrl: '/images/placeholder.jpg', // Path to your image
        technologies: ['React', 'PDF'],
        githubLink: null,
        liveDemoLink: null,
        type: 'pdf', // Important: Set type to 'pdf'
        content: '/images/placeholder.jpg'// Example:  If you have example.pdf, put '/pdfs/example.pdf'
    },
];