// src/config/email.ts

// EmailJS configuration
export const emailConfig = {
  serviceId: 'your_service_id', // Replace with your EmailJS service ID
  templateId: 'your_template_id', // Replace with your EmailJS template ID
  userId: 'your_user_id', // Replace with your EmailJS public key
};

/**
 * Instructions to set up EmailJS:
 * 
 * 1. Create an account at https://www.emailjs.com/
 * 2. Create a new service (Gmail, Outlook, etc.)
 * 3. Create a new email template with variables:
 *    - from_name (Sender's name)
 *    - reply_to (Sender's email)
 *    - subject
 *    - message
 * 4. Get your service ID, template ID, and user ID
 * 5. Replace the placeholder values in this file
 * 
 * Important: 
 * - Make sure your template matches the variable names
 * - Consider using environment variables for these values in production
 */
