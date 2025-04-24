import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProjectContentDisplay.module.css'; // Create this CSS module

function ProjectContentDisplay({ project }) {
  if (!project) return null;

  const { type, content, title, longDescription } = project;

  if (type === 'pdf') {
    return (
      <object data={content} type="application/pdf" width="100%" height="600px" className={styles.pdfObject}>
        <p>
          It appears you don't have a PDF plugin for this browser. You can{' '}
          <a href={content} download={`${title}.pdf`}> {/* Add download attribute */}
            download the PDF file.
          </a>
        </p>
      </object>
    );
  }

  if (type === 'image') {
    return <img src={content} alt={title} className={styles.imageContent} />; // Use a specific class
  }

  // Default to long description if type is 'description' or not specified/matched
  return <p className={styles.descriptionContent}>{longDescription}</p>;
}

ProjectContentDisplay.propTypes = {
  project: PropTypes.shape({
    type: PropTypes.oneOf(['pdf', 'image', 'description']).isRequired, // Make type required or handle default
    content: PropTypes.string, // Content might not be needed for description type
    title: PropTypes.string.isRequired,
    longDescription: PropTypes.string, // Make optional or required based on needs
  }).isRequired,
};

export default ProjectContentDisplay;