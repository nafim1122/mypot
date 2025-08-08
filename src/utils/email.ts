import emailjs from '@emailjs/browser';
import { emailConfig } from '@/config/email';

interface EmailParams {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

interface EmailResult {
  success: boolean;
  message: string;
}

export const sendEmail = async (
  params: EmailParams,
  serviceId: string = emailConfig.serviceId,
  templateId: string = emailConfig.templateId,
  userId: string = emailConfig.userId
): Promise<EmailResult> => {
  try {
    const templateParams = {
      from_name: params.name,
      reply_to: params.email,
      to_name: 'Portfolio Owner',
      message: params.message,
      subject: params.subject || 'New Message from Portfolio',
    };

    await emailjs.send(serviceId, templateId, templateParams, userId);
    
    return {
      success: true,
      message: 'Your message has been sent successfully!',
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again later.',
    };
  }
};
