import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactPage.module.css';
import Button from '../../components/Button/Button';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null); // Clear previous errors

        // Basic validation (you can add more robust validation)
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitError('Please fill in all fields.');
            setIsSubmitting(false);
            return;
        }
         // Simulate sending data (replace with actual API call)
        try {
          //This is where you would connect to your backend
            // Example using fetch (replace with your API endpoint):
            // const response = await fetch('/api/contact', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify(formData),
            // });

            // if (!response.ok) {
            //   throw new Error('Network response was not ok');
            // }

            // Simulate success after a delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSubmitSuccess(true);
            setFormData({ name: '', email: '', message: '' }); // Clear form
        } catch (error) {
            setSubmitError('Something went wrong. Please try again later.');
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1>Contact Me</h1>

            {submitSuccess ? (
                <p className={styles.successMessage}>Thank you for your message! I'll get back to you soon.</p>
            ) : (
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                    {submitError && <p className={styles.errorMessage}>{submitError}</p>}

                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className={styles.textareaField}
                        />
                    </div>

                    <Button type="submit" text={isSubmitting ? 'Sending...' : 'Send Message'} disabled={isSubmitting} />
                </form>
            )}
        </motion.div>
    );
}

export default ContactPage;